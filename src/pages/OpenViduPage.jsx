import React, { Component } from 'react';
import Header from '../components/layout/Header';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from '../components/userVideo/UserVideoComponent';

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
                    
                        if (event.stream.typeOfVideo === 'SCREEN') {
                            // 화면 공유 스트림 추가
                            this.setState((prevState) => ({
                                screenSubscribers: [
                                    ...prevState.screenSubscribers.filter(sub => sub.stream.streamId !== event.stream.streamId),
                                    subscriber
                                ],
                                subscribers: [
                                    ...prevState.subscribers.filter(sub => sub.stream.streamId !== event.stream.streamId),
                                    subscriber
                                ]
                            }));
                        } else {
                            // 일반 카메라 스트림 추가
                            this.setState((prevState) => ({
                                regularSubscribers: [
                                    ...prevState.regularSubscribers.filter(sub => sub.stream.streamId !== event.stream.streamId),
                                    subscriber
                                ],
                                subscribers: [
                                    ...prevState.subscribers.filter(sub => sub.stream.streamId !== event.stream.streamId),
                                    subscriber
                                ]
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
        const { session, publisher, screenSharing, screenPublisher } = this.state;
    
        if (screenSharing) {
            // 🔹 화면 공유 중단
            try {
                if (screenPublisher) {
                    session.unpublish(screenPublisher);
                    console.log('✅ 화면 공유 중단 완료');
    
                    // 🔹 기존 카메라 스트림 다시 게시
                    session.publish(publisher);
                    console.log('🔄 카메라 스트림 재게시');
    
                    this.setState({
                        screenSharing: false,
                        screenPublisher: null,
                        mainStreamManager: publisher,
                        screenSubscribers: []
                    });
                }
            } catch (error) {
                console.error("🛑 화면 공유 중단 중 오류 발생:", error);
            }
        } else {
            // 🔹 화면 공유 시작
            try {
                // 🔍 이미 화면 공유 중이면 중단
                if (screenSharing || screenPublisher) {
                    console.warn('⚠️ 이미 화면 공유 중입니다.');
                    return;
                }
    
                // 🔹 카메라 스트림 언퍼블리시 (OpenVidu는 하나의 stream만 게시 가능)
                session.unpublish(publisher);
                console.log('⛔️ 카메라 스트림 언퍼블리시');
    
                const newScreenPublisher = await this.OV.initPublisherAsync(undefined, {
                    videoSource: "screen",
                    publishAudio: false,
                    publishVideo: true,
                    resolution: "1280x720",
                    frameRate: 30,
                    insertMode: "APPEND",
                    mirror: false
                });
    
                newScreenPublisher.once('accessAllowed', async () => {
                    await session.publish(newScreenPublisher);
                    console.log('🎉 화면 공유 시작 완료');
    
                    // 🔹 화면 공유 스트림 추가 (중복 방지)
                    this.setState((prevState) => {
                        const isDuplicate = prevState.screenSubscribers.some(
                            (sub) => sub.stream.streamId === newScreenPublisher.stream.streamId
                        );
    
                        if (isDuplicate) {
                            console.warn('⚠️ 이미 등록된 화면 공유 스트림입니다.');
                            return prevState;
                        }
    
                        return {
                            screenSharing: true,
                            screenPublisher: newScreenPublisher,
                            mainStreamManager: newScreenPublisher,
                            screenSubscribers: [...prevState.screenSubscribers, newScreenPublisher]
                        };
                    });
    
                    // 🔹 화면 공유 종료 이벤트 리스너
                    newScreenPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                        console.log('🛑 화면 공유 종료 이벤트 감지');
                        this.toggleScreenShare();
                    });
                });
    
                newScreenPublisher.once('accessDenied', () => {
                    console.warn('🚫 화면 공유 접근 거부');
                });
    
            } catch (error) {
                console.error("🚨 화면 공유 초기화 중 오류 발생:", error);
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
        const { mySessionId, myUserName, session, mainStreamManager, subscribers, screenSubscribers } = this.state;

        return (
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Header />
                <div className="flex flex-col items-center justify-center h-full">
                    {session === undefined ? (
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h1 className="text-2xl font-bold mb-4">화상회의 참여하기</h1>
                            <input className="w-full p-2 mb-2 border border-gray-300 rounded" type="text" value={myUserName} onChange={this.handleChangeUserName} placeholder="이름 입력" />
                            <input className="w-full p-2 mb-4 border border-gray-300 rounded" type="text" value={mySessionId} onChange={this.handleChangeSessionId} placeholder="세션 ID 입력" />
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2" onClick={() => this.joinSession(mySessionId)}>참여하기</button>
                            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={this.createSession}>세션 생성</button>
                        </div>
                    ) : (
                        <div className="w-full p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-bold">세션: {mySessionId}</h1>
                                <div>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={this.leaveSession}>나가기</button>
                                    <button className={`py-2 px-4 font-bold rounded ${this.state.screenSharing ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`} onClick={this.toggleScreenShare}>{this.state.screenSharing ? '화면 공유 중지' : '화면 공유 시작'}</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {mainStreamManager && (
                                    <div className="col-span-3">
                                        <UserVideoComponent streamManager={mainStreamManager} />
                                    </div>
                                )}
                                {subscribers.map((sub, i) => (
                                    <div key={i} className="border border-gray-300 rounded overflow-hidden">
                                        <UserVideoComponent streamManager={sub} />
                                    </div>
                                ))}
                                {screenSubscribers.map((sub, i) => (
                                    <div key={i} className="border border-green-300 rounded overflow-hidden">
                                        <UserVideoComponent streamManager={sub} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default OpenViduPage;