import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../assets/package_sample.png';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="relative w-full">
      {/* ✅ 배경 레이어 (opacity 적용) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D9] via-[#C5C3B1] to-[#412B2B] opacity-50"></div>

      {/* ✅ 컨텐츠 영역 */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full px-8 py-16">
        {/* 왼쪽 텍스트 */}
        <div className="w-full md:w-1/3 text-center md:text-left text-brown pl-16">
          <h2 className="text-3xl font-bold leading-snug">
            색다른 여행을 떠날
            <br /> 우랑이를 모집합니다
          </h2>
          <button
            className="mt-6 px-6 py-3 bg-brown text-white text-lg font-semibold rounded-full shadow-md "
            onClick={() => navigate('/search-room')}
          >
            자세히 알아보기 →
          </button>
        </div>

        {/* 오른쪽 캐러셀 */}
        <div className="w-full md:w-2/3 mt-10 md:mt-0">
          <Slider {...settings}>
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
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
