import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';

const ReservationDepositModal = ({ travelPlanId, proposalId, onClose }) => {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState([
    {
      koreanName: '',
      englishName: '',
      passportNumber: '',
      expirationDate: '',
      birthDate: '',
      phoneNumber: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleTravelerChange = (index, field, value) => {
    const newTravelers = [...travelers];
    newTravelers[index][field] = value;
    setTravelers(newTravelers);
  };

  const addTraveler = () => {
    setTravelers([
      ...travelers,
      {
        koreanName: '',
        englishName: '',
        passportNumber: '',
        expirationDate: '',
        birthDate: '',
        phoneNumber: '',
      },
    ]);
  };

  const removeTraveler = (index) => {
    setTravelers(travelers.filter((_, i) => i !== index));
  };

  const handleSubmitTravelers = async () => {
    // 간단한 유효성 검사
    for (let traveler of travelers) {
      if (
        !traveler.koreanName.trim() ||
        !traveler.englishName.trim() ||
        !traveler.passportNumber.trim() ||
        !traveler.expirationDate.trim() ||
        !traveler.birthDate.trim() ||
        !traveler.phoneNumber.trim()
      ) {
        Swal.fire('알림', '모든 여행자 정보를 입력해주세요.', 'warning');
        return;
      }
    }
    setLoading(true);
    try {
      const response = await publicRequest.post(
        `/api/v1/travel-plans/${travelPlanId}/proposals/${proposalId}/travelers`,
        travelers,
      );
      if (response.status === 200) {
        Swal.fire('성공', '여행자 등록이 완료되었습니다.', 'success');
        setStep(2); // 결제 단계로 이동
      }
    } catch (error) {
      console.error('여행자 등록 실패:', error);
      Swal.fire('오류', '여행자 등록에 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    // 실제 카카오 결제 컴포넌트를 연동하면 해당 컴포넌트 내부에서 결제 완료 후 호출하도록 구성합니다.
    Swal.fire('성공', '예약금 결제가 완료되었습니다.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">예약금 결제</h2>
        {step === 1 && (
          <div>
            <h3 className="mb-4 text-xl font-semibold">여행자 등록</h3>
            {travelers.map((traveler, index) => (
              <div key={index} className="p-4 mb-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">여행자 {index + 1}</span>
                  {travelers.length > 1 && (
                    <button
                      onClick={() => removeTraveler(index)}
                      className="text-red-500"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="한글 이름"
                  value={traveler.koreanName}
                  onChange={(e) =>
                    handleTravelerChange(index, 'koreanName', e.target.value)
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="영문 이름"
                  value={traveler.englishName}
                  onChange={(e) =>
                    handleTravelerChange(index, 'englishName', e.target.value)
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="여권번호"
                  value={traveler.passportNumber}
                  onChange={(e) =>
                    handleTravelerChange(
                      index,
                      'passportNumber',
                      e.target.value,
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="date"
                  placeholder="여권 만료일"
                  value={traveler.expirationDate}
                  onChange={(e) =>
                    handleTravelerChange(
                      index,
                      'expirationDate',
                      e.target.value,
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="date"
                  placeholder="생년월일"
                  value={traveler.birthDate}
                  onChange={(e) =>
                    handleTravelerChange(index, 'birthDate', e.target.value)
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="전화번호"
                  value={traveler.phoneNumber}
                  onChange={(e) =>
                    handleTravelerChange(index, 'phoneNumber', e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={addTraveler}
              className="px-4 py-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
            >
              여행자 추가
            </button>
            <div className="flex justify-end">
              <button
                onClick={handleSubmitTravelers}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? '등록 중...' : '등록 완료'}
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="mb-4 text-xl font-semibold">예약금 결제</h3>
            {/* 여기에 실제 카카오 결제 컴포넌트를 연동하세요. 아래는 예시 */}
            <div className="p-4 mb-4 border rounded">
              <p className="mb-2">카카오 결제 컴포넌트 (예시)</p>
              <button
                onClick={handlePaymentComplete}
                className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
              >
                결제 완료
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDepositModal;
