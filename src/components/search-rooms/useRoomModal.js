// useRoomModal.js
import { useState } from "react";

function useRoomModal() {
  // 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 현재 스텝 (1 or 2)
  const [currentStep, setCurrentStep] = useState(1);
  // 선택된 카드 정보
  const [selectedCard, setSelectedCard] = useState(null);
  // 인원 정보
  const [people, setPeople] = useState({ adult: 0, child: 0, infant: 0 });

  // 모달 열기
  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
    setCurrentStep(1); // 1단계로 초기화
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
    setPeople({ adult: 0, child: 0, infant: 0 }); // 인원 초기화
    setCurrentStep(1);
  };

  // 단계 이동
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // 인원 조절
  const handlePeopleChange = (type, value) => {
    setPeople((prev) => ({
      ...prev,
      [type]: Math.max(0, value), // 0 이하가 되지 않도록 처리
    }));
  };
  const handleIncrement = (type) => {
    setPeople((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };
  const handleDecrement = (type) => {
    setPeople((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  // 방 만들기 완료 시 로직
  const handleComplete = () => {
    console.log("방 만들기 완료", people);
    // 필요한 추가 로직 (API 호출 등)이 있다면 여기에서 처리
    closeModal();
  };

  // 훅에서 외부로 노출하고 싶은 상태와 함수
  return {
    isModalOpen,
    currentStep,
    selectedCard,
    people,
    openModal,
    closeModal,
    nextStep,
    prevStep,
    handlePeopleChange,
    handleIncrement,
    handleDecrement,
    handleComplete,
  };
}

export default useRoomModal;
