import React, { Component } from 'react';
import Header from '../components/layout/Header';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from '../components/userVideo/UserVideoComponent';
import {
    Container,
    JoinDialog,
    SessionHeader,
    MainVideo,
    StreamContainer,
    StreamContainerText,
    Button
} from './style/OpenViduPageStyle';

const APPLICATION_SERVER_URL = 'https://i12c204.p.ssafy.io:9443/api/v1';

class OpenViduPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            screenPublisher: null,
            subscribers: [],
            regularSubscribers: [], // 일반 참가자 스트림을 저장
            screenSubscribers: [], // 화면 공유 스트림을 저장
            sessions: [],
            screenSharing: false,
        };

        this.createSession = this.createSession.bind(this);
        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.toggleScreenShare = this.toggleScreenShare.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    async joinSession(sessionId) {
        this.setState({
            mySessionId: sessionId,
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
        }, () => {
            // --- 1) OpenVidu (웹캠, 마이크 사용) 객체 생성
            this.OV = new OpenVidu();

            // --- 2) 세션 속성 초기화
            this.setState(
                {
                    session: this.OV.initSession(),
                },
                () => {
                    var mySession = this.state.session;

                    // 스트림 생성 이벤트 핸들러 수정
                    mySession.on('streamCreated', (event) => {
                        const subscriber = mySession.subscribe(event.stream, undefined);
                        
                        // 스트림 타입에 따라 분류
                        if (event.stream.typeOfVideo === 'SCREEN') {
                            this.setState(prevState => ({
                                screenSubscribers: [...prevState.screenSubscribers, subscriber],
                                subscribers: [...prevState.subscribers, subscriber]
                            }));
                        } else {
                            this.setState(prevState => ({
                                regularSubscribers: [...prevState.regularSubscribers, subscriber],
                                subscribers: [...prevState.subscribers, subscriber]
                            }));
                        }
                    });

                    mySession.on('streamDestroyed', (event) => {
                        const stream = event.stream;
                        if (stream.typeOfVideo === 'SCREEN') {
                            this.setState(prevState => ({
                                screenSubscribers: prevState.screenSubscribers.filter(sub => 
                                    sub.stream.streamId !== stream.streamId
                                ),
                                subscribers: prevState.subscribers.filter(sub => 
                                    sub.stream.streamId !== stream.streamId
                                )
                            }));
                        } else {
                            this.setState(prevState => ({
                                regularSubscribers: prevState.regularSubscribers.filter(sub => 
                                    sub.stream.streamId !== stream.streamId
                                ),
                                subscribers: prevState.subscribers.filter(sub => 
                                    sub.stream.streamId !== stream.streamId
                                )
                            }));
                        }
                    });

                    mySession.on('exception', (exception) => {
                        console.warn(exception);
                    });
                    
                    // --- 4) 사용자 토큰 검증 및 세션 연결

                    // 배포된 OpenVidu 서버에서 토큰 가져오기
                    this.getToken().then((token) => {

                        mySession.connect(token, { clientData: this.state.myUserName })
                            .then(async () => {

                                // --- 5) 자신의 카메라 스트림 가져오기

                                // undefined를 targetElement로 전달하여 퍼블리셔를 초기화합니다 (OpenVidu가 비디오 요소를 삽입하지 않도록 함).
                                let publisher = await this.OV.initPublisherAsync(undefined, {
                                    audioSource: undefined, // 오디오 소스. undefined이면 기본 마이크 사용
                                    videoSource: undefined, // 비디오 소스. undefined이면 기본 웹캠 사용
                                    publishAudio: true, // 오디오를 음소거하지 않고 시작할지 여부
                                    publishVideo: true, // 비디오를 활성화된 상태로 시작할지 여부
                                    resolution: '640x480', // 비디오 해상도
                                    frameRate: 30, // 비디오 프레임 속도
                                    insertMode: 'APPEND', // 비디오가 'video-container' 요소에 삽입되는 방식
                                    mirror: false, // 로컬 비디오를 미러링할지 여부
                                });
                                
                                // --- 6) 자신의 스트림 구독

                                mySession.publish(publisher);

                                // 현재 사용 중인 비디오 장치 가져오기
                                var devices = await this.OV.getDevices();
                                var videoDevices = devices.filter(device => device.kind === 'videoinput');
                                var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                                var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
                                
                                // 페이지의 메인 비디오에 웹캠이 표시되도록 설정
                                this.setState({
                                    currentVideoDevice: currentVideoDevice,
                                    mainStreamManager: publisher,
                                    publisher: publisher,
                                });
                            })
                            .catch((error) => {
                                console.log('세션에 연결하는 중 오류가 발생했습니다:', error.code, error.message);
                            });
                    });
                },
            );
        });
    }

    leaveSession() {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {
                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    var newPublisher = this.OV.initPublisher("screen-share-container", {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    await this.state.session.unpublish(this.state.mainStreamManager)
                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice[0],
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    async toggleScreenShare() {
        if (this.state.screenSharing) {
            // 화면 공유 중단
            this.state.session.unpublish(this.state.screenPublisher);
            this.setState({
                screenSharing: false,
                screenPublisher: null,
                mainStreamManager: this.state.publisher // 메인 화면을 원래 카메라로 복구
            });
        } else {
            try {
                const screenPublisher = await this.OV.initPublisherAsync("undefined", {
                    videoSource: "screen",
                    publishAudio: false,
                    publishVideo: true,
                    mirror: false
                });
    
                screenPublisher.once('accessAllowed', async () => {
                    await this.state.session.publish(screenPublisher);
                    this.setState({
                        screenSharing: true,
                        screenPublisher,
                        mainStreamManager: screenPublisher
                    });
                });
    
                screenPublisher.once('accessDenied', () => {
                    console.warn('❌ 화면 공유 접근이 거부되었습니다.');
                });
    
                screenPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                    this.toggleScreenShare();
                });
    
            } catch (error) {
                console.error("🚨 화면 공유 중 오류 발생:", error);
            }
        }
    }    

    async createSession(sessionId) {
        try {
            const response = await axios.post(APPLICATION_SERVER_URL + '/sessions', { customSessionId: sessionId }, {
                headers: { 'Content-Type': 'application/json', },
            });
            
            // sessions 배열 업데이트
            this.setState(prevState => ({
                sessions: [...prevState.sessions, response.data]
            }));
            
            return response.data;
        } catch (error) {
            console.error('세션 생성 중 오류 발생:', error);
        }
    }

    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + '/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;

        return (
            <Container>
                <Header />
                
                {this.state.session === undefined ? (
                    <div id="join">
                        <JoinDialog className="jumbotron vertical-center">
                            <h1> 화상회의 참여하기 </h1>
                            <form className="form-group" onSubmit={(e) => { e.preventDefault(); this.joinSession(this.state.mySessionId); }}>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <Button className="btn btn-lg btn-success" name="commit" type="submit" value="입장하기" />
                                </p>
                            </form>
                            <Button className="btn btn-lg btn-primary" onClick={this.createSession} value="세션 생성" />
                        </JoinDialog>
                        <div>
                            <h2>세션 목록</h2>
                            <ul>
                                {this.state.sessions.map((session, index) => (
                                    <li key={index}>
                                        {session.customSessionId}
                                        <Button className="btn btn-sm btn-success" onClick={() => this.joinSession(session.customSessionId)} value="입장하기" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">
                        <SessionHeader>
                            <h1 id="session-title">{mySessionId}</h1>
                            <Button
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                            <Button
                                className="btn btn-large btn-success"
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="Switch Camera"
                                disabled={this.state.screenSharing}
                            />
                            <Button
                                className={`btn btn-large ${this.state.screenSharing ? "btn-danger" : "btn-primary"}`}
                                type="button"
                                id="buttonToggleScreenShare"
                                onClick={() => this.toggleScreenShare()}
                                value={this.state.screenSharing ? "Stop Sharing" : "Start Sharing"}
                            />
                        </SessionHeader>

                        <div id="video-container" className="col-md-6">
                            {/* 카메라 스트림 표시 */}
                            {this.state.publisher && (
                                <StreamContainer 
                                    className="col-md-6 col-xs-6" 
                                    onClick={() => this.handleMainVideoStream(this.state.publisher)}
                                >
                                    <UserVideoComponent streamManager={this.state.publisher} />
                                </StreamContainer>
                            )}

                            {/* 일반 참가자 스트림 표시 */}
                            {this.state.regularSubscribers.map((sub, i) => (
                                <StreamContainer 
                                    key={sub.stream.streamId} 
                                    className="col-md-6 col-xs-6" 
                                    onClick={() => this.handleMainVideoStream(sub)}
                                >
                                    <StreamContainerText>{sub.stream.connection.connectionId}</StreamContainerText>
                                    <UserVideoComponent streamManager={sub} />
                                </StreamContainer>
                            ))}

                            {/* 화면 공유 스트림 표시 */}
                            {this.state.screenSubscribers.map((sub, i) => (
                                <StreamContainer 
                                    key={sub.stream.streamId} 
                                    className="col-md-6 col-xs-6" 
                                    onClick={() => this.handleMainVideoStream(sub)}
                                >
                                    <StreamContainerText>Screen Share: {sub.stream.connection.connectionId}</StreamContainerText>
                                    <UserVideoComponent streamManager={sub} />
                                </StreamContainer>
                            ))}
                        </div>
                    </div>
                ) : null}
            </Container>
        );
    }
}

export default OpenViduPage;