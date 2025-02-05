import React, { useEffect } from 'react';
import logo from '../assets/kakaopay.png';
const KakaoPayTest = () => {
  useEffect(() => {
    const { IMP } = window;
    const merchantId = import.meta.env.VITE_APP_MPORT_MERCHANT_ID;

    IMP.init(merchantId);
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.request_pay(
      {
        pg: 'kakaopay.TC0ONETIME',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        name: '테스트 상품',
        amount: 100,
        buyer_email: 'test@test.com',
        buyer_name: '홍길동',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구',
        buyer_postcode: '12345',
      },
      (rsp) => {
        if (rsp.success) {
          console.log('결제 성공:', rsp);
          alert('✅ 결제가 완료되었습니다.');
        } else {
          console.log('결제 실패:', rsp);
          alert(`❌ 결제 실패: ${rsp.error_msg}`);
        }
      },
    );
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            예약금 결제
          </h1>
        </div>

        <p className="text-center text-gray-600 text-sm mb-6">
          결제를 위해 아래 버튼을 눌러주세요.
        </p>

        <button
          onClick={requestPay}
          className="
        w-full py-3 px-6 flex items-center justify-center gap-2
        bg-yellow-400 text-gray-800 font-semibold text-lg
        rounded-lg shadow-md border border-yellow-500
        hover:bg-yellow-500 transition-all duration-200
      "
        >
          {/* ✅ 로고를 왼쪽으로 정렬 */}
          <img src={logo} alt="KakaoPay Logo" className="w-20 " />
          카카오페이 결제하기
        </button>
      </div>
    </div>
  );
};

export default KakaoPayTest;
