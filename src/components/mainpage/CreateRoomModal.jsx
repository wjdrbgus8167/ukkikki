import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 애니메이션 라이브러리 추가

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

const CreateRoomModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    title: '',
    minPeople: '',
    maxPeople: '',
    selectedThemes: [], // ✅ 여러 개 선택 가능하도록 변경
    adults: 0,
    teens: 0,
    kids: 0,
  });

  // ✅ 1단계 입력 핸들러
  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // ✅ 1단계 → 2단계 이동
  const handleNextStep = () => {
    if (!roomData.title || !roomData.minPeople || !roomData.maxPeople) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    setStep(2);
  };

  // ✅ 2단계 → 1단계 이동
  const handlePreviousStep = () => {
    setStep(1);
  };

  // ✅ 인원 조절
  const handleCountChange = (type, value) => {
    setRoomData((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value), // 0 이하로 내려가지 않도록 제한
    }));
  };

  // ✅ 총 인원 계산
  const totalPeople = roomData.adults + roomData.teens + roomData.kids;

  // ✅ 테마 선택 (여러 개 선택 가능)
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

  // ✅ 모달 닫기
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

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose} // 바깥 클릭 시 모달 닫기
        />
        {/* ✅ 모달 컨텐츠 */}
        <motion.div
          className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-lg z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* ✅ 모달 헤더 */}
          <div className="flex justify-between items-center mb-5 border-b-2 pb-2">
          <h1 className="text-xl font-semibold border-gray-300 pb-2">
  {step === 1 ? '방 만들기 - 기본 정보' : '방 만들기 - 인원 설정'}
</h1>

            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          {/* ✅ 1단계: 방 제목, 최소/최대 인원, 테마 선택 */}
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

              <div className="mb-5 flex space-x-4">
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
                        maxPeople: Math.max(value, prev.maxPeople), // 최소 인원이 증가하면 최대 인원도 조정
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
                className="w-full bg-dark-green text-white py-3 rounded-lg transition"
              >
                다음 단계
              </button>
            </div>
          )}
          {/* ✅ 2단계: 성인/청소년/유아 인원 조절 */}
          {step === 2 && (
            <div>
              {['adults', 'teens', 'kids'].map((type, index) => (
                <div
                  key={index}
                  className="mb-5 flex justify-between items-center"
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
                      className="px-3 py-2 border rounded-lg bg-gray-200 text-lg"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 border rounded-lg bg-white text-lg">
                      {roomData[type]}
                    </span>
                    <button
                      onClick={() => handleCountChange(type, 1)}
                      className="px-3 py-2 border rounded-lg bg-gray-200 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="mb-5 text-center text-xl font-bold">
                총 인원: {totalPeople}명
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                >
                  이전
                </button>
                <button
                  onClick={handleModalClose}
                  className="bg-dark-green text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
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
