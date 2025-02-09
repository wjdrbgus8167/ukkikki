import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../assets/package_sample.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { publicRequest } from '../../hooks/requestMethod';
const packages = [
  { id: 1, title: '파리 로맨틱 투어', image: img },
  { id: 2, title: '뉴욕 시티 브레이크', image: img },
  { id: 3, title: '도쿄 문화 탐방', image: img },
  { id: 4, title: '발리 휴양 여행', image: img },
];

// 화살표 커스터마이징 컴포넌트 (카드 바깥 배치)
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-brown text-white p-3 rounded-full shadow-lg focus:outline-none"
    onClick={onClick}
  >
    &#9664;
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-brown text-white p-3 rounded-full shadow-lg focus:outline-none"
    onClick={onClick}
  >
    &#9654;
  </button>
);
const TravelPackageCarousel = () => {
  const navigate = useNavigate(); // ✅ useNavigate 훅 사용

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // 태블릿 이하에서는 1개씩만 표시
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleViewDetails = async () => {
    try {
      const response = await publicRequest.get('/travel-plans', {
        headers: {
          Accept: 'application/json', // ✅ JSON 응답을 기대함
        },
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('🚨 API 응답이 올바르지 않습니다.');
      }

      console.log('✅ 여행방 데이터:', response.data);

      // ✅ API 응답 데이터를 `state`로 전달하면서 `search-room`으로 이동
      navigate('/search-room', { state: { rooms: response.data } });
    } catch (error) {
      console.error('🚨 여행방 전체 조회 실패:', error);
      alert('🚨 여행방 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="relative w-full">
      {/* ✅ 배경 레이어 (opacity 적용) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D9] via-[#C5C3B1] to-[#412B2B] opacity-50"></div>

      {/* ✅ 컨텐츠 영역 */}
      <div className="relative flex flex-col items-center justify-between w-full px-8 py-16 md:flex-row">
        {/* 왼쪽 텍스트 */}
        <div className="w-full pl-16 text-center md:w-1/3 md:text-left text-brown">
          <h2 className="text-3xl font-bold leading-snug">
            색다른 여행을 떠날
            <br /> 우랑이를 모집합니다
          </h2>
          <button
            className="px-6 py-3 mt-6 text-lg font-semibold text-white rounded-full shadow-md bg-brown "
            onClick={handleViewDetails} // ✅ API 호출 후 이동
          >
            자세히 알아보기 →
          </button>
        </div>

        {/* 오른쪽 캐러셀 */}
        <div className="w-full mt-10 md:w-2/3 md:mt-0">
          <Slider {...settings}>
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-4">
                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {pkg.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCarousel;
