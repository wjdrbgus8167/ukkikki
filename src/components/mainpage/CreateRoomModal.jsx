import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { publicRequest } from '../../hooks/requestMethod';

const themes = [
  '골프',
  '관광+휴양',
  '휴양',
  '관광',
  '럭셔리',
  '식도락',
  '축구',
  '현지문화체험',
  '해양스포츠',
  '온천',
  'SNS핫플',
  '성지순례',
  '기차여행',
];

const CreateRoomModal = ({ isOpen, onClose, travelData }) => {
  // travelData: { departureCityId, arrivalCityId, startDate, endDate }
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    title: '',
    minPeople: '',
    maxPeople: '',
    selectedThemes: [], // 사용자가 선택한 테마 (이름 배열)
    adults: 0,
    teens: 0,
    kids: 0,
  });
  const [keywordList, setKeywordList] = useState([]); // 전체 테마 키워드 목록

  // 모달 마운트 시 전체 키워드 조회
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await publicRequest.get(
          '/api/v1/travel-plans/keywords',
        );
        // API 응답에 전체 키워드가 response.data.data 안에 있다고 가정
        setKeywordList(response.data.data || []);
      } catch (error) {
        console.error('키워드 조회 실패:', error);
      }
    };

    fetchKeywords();
  }, []);

  // 1단계 입력 핸들러 (방 제목, 최소/최대 인원, 테마 선택)
  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // 1단계 → 2단계 이동
  const handleNextStep = () => {
    if (!roomData.title || !roomData.minPeople || !roomData.maxPeople) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    setStep(2);
  };

  // 2단계 → 1단계 이동
  const handlePreviousStep = () => {
    setStep(1);
  };

  // 인원 조절
  const handleCountChange = (type, value) => {
    setRoomData((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value), // 0 이하로 내려가지 않도록 제한
    }));
  };

  // 총 인원 계산
  const totalPeople = roomData.adults + roomData.teens + roomData.kids;

  // 테마 선택 (여러 개 선택 가능)
  const handleThemeToggle = (theme) => {
    setRoomData((prev) => {
      const isSelected = prev.selectedThemes.includes(theme);
      return {
        ...prev,
        selectedThemes: isSelected
          ? prev.selectedThemes.filter((t) => t !== theme)
          : [...prev.selectedThemes, theme],
      };
    });
  };

  // 모달 닫기 시 상태 초기화
  const handleModalClose = () => {
    setStep(1);
    setRoomData({
      title: '',
      minPeople: '',
      maxPeople: '',
      selectedThemes: [],
      adults: 0,
      teens: 0,
      kids: 0,
    });
    onClose();
  };

  // 방 만들기 완료 시: 선택된 테마를 keywordList에서 찾아 keywordId를 추출한 후 API 요청 전송
  const handleRoomCreation = async () => {
    // 선택한 테마 이름(roomData.selectedThemes)을 keywordList에서 찾아 { keywordId: ... } 형태로 변환
    const selectedKeywordObjects = roomData.selectedThemes
      .map((theme) => {
        // 예를 들어, 백엔드에서 키워드 객체는 { keywordId, name, ... } 형태라고 가정
        const keywordObj = keywordList.find((item) => item.name === theme);
        return keywordObj ? { keywordId: keywordObj.keywordId } : null;
      })
      .filter((item) => item !== null);

    const requestBody = {
      travelPlan: {
        departureCityId: travelData.departureCityId,
        arrivalCityId: travelData.arrivalCityId,
        name: roomData.title,
        startDate: travelData.startDate, // yyyy-MM-dd 형식이어야 함
        endDate: travelData.endDate,
        keywords: selectedKeywordObjects,
        minPeople: parseInt(roomData.minPeople, 10),
        maxPeople: parseInt(roomData.maxPeople, 10),
        planningStatus: 'IN_PROGRESS',
      },
    };

    try {
      const response = await publicRequest.post(
        '/api/v1/travel-plans',
        requestBody,
      );
      console.log('여행 플랜 생성 성공:', response.data);
      alert('여행 플랜이 성공적으로 생성되었습니다.');
      handleModalClose();
    } catch (error) {
      console.error('여행 플랜 생성 실패:', error);
      alert('여행 플랜 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose} // 바깥 클릭 시 모달 닫기
        />
        <motion.div
          className="relative z-10 w-full max-w-lg p-6 bg-white shadow-lg rounded-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between pb-2 mb-5 border-b-2">
            <h1 className="pb-2 text-xl font-semibold border-gray-300">
              {step === 1 ? '방 만들기 - 기본 정보' : '방 만들기 - 인원 설정'}
            </h1>
            <button
              onClick={handleModalClose}
              className="text-xl text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          {/* 1단계: 방 제목, 최소/최대 인원, 테마 선택 */}
          {step === 1 && (
            <div>
              <div className="mb-5">
                <label className="block text-sm font-medium">방 제목</label>
                <input
                  type="text"
                  name="title"
                  value={roomData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex mb-5 space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">최소 인원</label>
                  <input
                    type="number"
                    name="minPeople"
                    value={roomData.minPeople}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (value < 1) {
                        alert('최소 인원은 1명 이상이어야 합니다.');
                        return;
                      }
                      setRoomData((prev) => ({
                        ...prev,
                        minPeople: value,
                        maxPeople: Math.max(value, prev.maxPeople),
                      }));
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">최대 인원</label>
                  <input
                    type="number"
                    name="maxPeople"
                    value={roomData.maxPeople}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (value < roomData.minPeople) {
                        alert('최대 인원은 최소 인원 이상이어야 합니다.');
                        return;
                      }
                      setRoomData((prev) => ({
                        ...prev,
                        maxPeople: value,
                      }));
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium">테마 선택</label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleThemeToggle(theme)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        roomData.selectedThemes.includes(theme)
                          ? 'bg-dark-green text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full py-3 text-white transition rounded-lg bg-dark-green"
              >
                다음 단계
              </button>
            </div>
          )}
          {/* 2단계: 인원 조절 */}
          {step === 2 && (
            <div>
              {['adults', 'teens', 'kids'].map((type, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-5"
                >
                  <span className="text-lg font-semibold">
                    {type === 'adults'
                      ? '성인'
                      : type === 'teens'
                      ? '청소년'
                      : '유아'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCountChange(type, -1)}
                      className="px-3 py-2 text-lg bg-gray-200 border rounded-lg"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 text-lg bg-white border rounded-lg">
                      {roomData[type]}
                    </span>
                    <button
                      onClick={() => handleCountChange(type, 1)}
                      className="px-3 py-2 text-lg bg-gray-200 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="mb-5 text-xl font-bold text-center">
                총 인원: {totalPeople}명
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handlePreviousStep}
                  className="px-6 py-3 text-white transition bg-gray-400 rounded-lg hover:bg-gray-500"
                >
                  이전
                </button>
                <button
                  onClick={handleRoomCreation}
                  className="px-6 py-3 text-white transition rounded-lg bg-dark-green hover:bg-blue-600"
                >
                  방 만들기 완료
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    )
  );
};

export default CreateRoomModal;
