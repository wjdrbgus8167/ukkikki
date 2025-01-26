import React from "react";

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mb-4">
      <div className="relative w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-end text-sm text-gray-600 mt-2">
        단계 {step} / {totalSteps}
      </div>
    </div>
  );
};

function RoomModal({
  isOpen,
  onClose,
  step,
  totalSteps,
  onNext,
  onPrev,
  selectedCard,
  people,
  handlePeopleChange,
  onIncrement,
  onDecrement,
  onComplete,
}) {
  if (!isOpen) return null;

  // 오버레이 클릭 핸들러
  const handleOverlayClick = (e) => {
    // 만약 클릭 대상이 overlay(div) 자신이라면 모달 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // 클릭 이벤트를 배경(오버레이) div에 등록
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      {/* 자식 컨테이너에서 이벤트 버블링 막기 */}
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1단계: 방 정보 확인 */}
        {step === 1 && selectedCard && (
          <div>
            <h2 className="text-xl font-bold mb-4">방 정보 확인</h2>
            <p className="mb-2">
              <strong>방 이름:</strong> {selectedCard.title}
            </p>
            <p className="mb-2">
              <strong>나라:</strong> {selectedCard.country}
            </p>
            <p className="mb-2">
              <strong>여행 날짜:</strong> {selectedCard.date}
            </p>

            {/* 진행바 + 버튼 영역 */}
            <div className="mt-6">
              <ProgressBar step={step} totalSteps={totalSteps} />
              <div className="flex justify-between space-x-2">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={onClose}
                >
                  닫기
                </button>
                <button
                  className="px-4 py-2 bg-brown text-white rounded-md"
                  onClick={onNext}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2단계: 인원 입력 */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">인원 입력</h2>
            <div className="space-y-4">
              {["adult", "child", "infant"].map((type) => (
                <div key={type} className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium capitalize">
                    {type === "adult"
                      ? "성인"
                      : type === "child"
                      ? "아동"
                      : "유아"}
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={() => onDecrement(type)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={people[type]}
                      onChange={(e) =>
                        handlePeopleChange(type, Number(e.target.value))
                      }
                      className="
                        w-20 p-2 border border-gray-300 rounded-md text-center
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                      "
                      min={0}
                    />
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={() => onIncrement(type)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <ProgressBar step={step} totalSteps={totalSteps} />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={onPrev}
                >
                  이전
                </button>
                <button
                  className="px-4 py-2 bg-brown text-white rounded-md"
                  onClick={onComplete}
                >
                  방 만들기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomModal;
