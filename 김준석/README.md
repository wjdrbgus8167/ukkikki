# 1월 13일 월요일

# 프로젝트 기획안
## 문제 상황

- 여자 친구와 붓글씨 클래스를 가고 싶은 지방에 거주하는 27세 영준이.
    - 가장 가까운 클래스를 검색해보니 100km나 걸리는 절망적인 상황
    - 아 그냥 온라인으로 들을 순 없나?
    - 그런데 몰입도가 떨어지면 어떡하지?
    - 녹화 강의를 듣자니 질문을 곧바로 할 수도 없고..
- 지방에 거주하는 폴 댄스 강사 겸 플로리스트 27세 규현이.
    - 폴 댄스 학원을 차렸더니 지방이라 그런지 수강생이 저조
    - 플로리스트도 하고 있어 그 재능도 살리고 싶지만 폴 댄스 학원에서 꽃꽂이를 강의하기엔 애매한 상황
    - 적은 공간에서 둘 다를 강의할 순 없을까?

## 해결 방안

- 강사와 수강생을 연결하는 온라인 강의
- 수강생의 강의 몰입도를 높이기 위한 실시간 퀴즈, 설문 등의 장치

## 주요 기능

- 강사와 수강생을 연결하는 실시간 화상 클래스
    - 수강생 출석 확인 기능
    - 강사의 실시간 퀴즈 제시 및 수강생의 답안 제출
    - 실시간 설문조사
- 카테고리 별 강의 검색 기능
- 수강생의 수강 목록을 분석해 맞춤형 강의 추천
- 강의 다시보기 기능
- 클래스 후 후속 질의응답 게시판
- 수강생의 수요와 선호도를 강사에게 제공

---

# WebRTC란 무엇인가?

WebRTC(Web Real-Time Communication)는 웹 브라우저 및 모바일 애플리케이션에서 **플러그인 없이 실시간 음성, 영상 및 데이터 통신**을 가능하게 하는 기술입니다. Google에서 시작한 이 기술은 W3C와 IETF의 표준화 작업을 거쳐 현재 다양한 브라우저와 플랫폼에서 지원됩니다.

## **WebRTC의 주요 구성 요소**

1. **Peer-to-Peer 연결**
    - WebRTC는 브라우저 간 직접 연결(Peer-to-Peer)을 통해 낮은 지연 시간과 효율적인 데이터 전송을 제공합니다.
2. **미디어 스트림 처리**
    - 실시간으로 음성/영상 데이터를 캡처, 전송, 렌더링.
3. **데이터 채널**
    - 파일 공유 및 게임 등 다양한 응용 프로그램에서 사용 가능한 **텍스트/바이너리 데이터** 전송.
4. **NAT Traversal**
    - STUN(Traversal Using Relays around NAT) 및 TURN(Traversal Using Relays around NAT)을 사용해 방화벽 및 NAT(Network Address Translation)를 우회.

---

# WebRTC 서버에 적용 시 고려 사항

WebRTC는 Peer-to-Peer 연결을 지향하지만, 실질적으로 서버가 중재 역할을 해야 할 경우가 많습니다. 이를 고려해 다음 사항들을 설계해야 합니다:

## 1. **시그널링 (Signaling)**

- WebRTC는 연결을 설정하기 위해 **시그널링 프로토콜**이 필요합니다.
- **역할**:
    - 연결 초기화 (SDP(Session Description Protocol) 교환)
    - 네트워크 정보(IP/포트) 교환
    - ICE(Interactive Connectivity Establishment) 후보 교환
- **기술**:
    - WebSocket, HTTP, Socket.IO 등.

## 2. **STUN/TURN 서버**

- **STUN 서버**: 클라이언트가 공인 IP 주소를 확인하고 Peer-to-Peer 연결을 설정하는 데 사용.
- **TURN 서버**: NAT/방화벽으로 인해 직접 연결이 불가능할 경우 데이터를 중계.
- TURN 서버를 구축할 경우 성능 및 비용 고려 필요.

## 3. **확장성**

- 다수의 사용자가 동시에 접속할 경우, Peer-to-Peer만으로는 한계가 있습니다.
    - **SFU(Selective Forwarding Unit)**: 클라이언트가 전송한 데이터를 중계하며, 선택적으로 전달.
    - **MCU(Multipoint Control Unit)**: 데이터를 수집하고 처리한 후 클라이언트에 전달.
- 예: Jitsi, Mediasoup, Janus 등.

## 4. **보안**

- 모든 WebRTC 통신은 암호화가 기본.
    - DTLS-SRTP (Datagram Transport Layer Security - Secure Real-time Transport Protocol)를 사용.
- 시그널링 서버와 TURN 서버의 통신도 HTTPS 또는 WSS(WebSocket Secure)로 보호.
- 네트워크 방화벽 및 DoS/DDoS 공격 방지 대책 필요.

## 5. **브라우저 호환성**

- WebRTC는 다양한 브라우저에서 작동하지만, 일부 기능은 브라우저 간 동작 방식이 다를 수 있습니다.
- 크로스 브라우저 테스트 필요.

## 6. **네트워크 상태**

- 네트워크 대역폭 및 품질에 따라 동영상 해상도와 전송 속도 조정.
- WebRTC는 `RTCPeerConnection.getStats()`를 통해 네트워크 상태를 모니터링 가능.

## 7. **로그 및 디버깅**

- WebRTC 트래픽 및 연결 문제를 디버깅하기 위해 로그 시스템 구성.
- WebRTC-internals(크롬 개발자 도구) 활용.