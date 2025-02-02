import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../assets/package_sample.png';

const packages = [
  { id: 1, title: '파리 로맨틱 투어', image: img },
  { id: 2, title: '뉴욕 시티 브레이크', image: img },
  { id: 3, title: '도쿄 문화 탐방', image: img },
  { id: 4, title: '발리 휴양 여행', image: img },
];

// 화살표 커스터마이징 컴포넌트
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 text-white p-3 rounded-full shadow-lg focus:outline-none"
    onClick={onClick}
  >
    &#9664; {/* 왼쪽 화살표 */}
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 text-white p-3 rounded-full shadow-lg focus:outline-none"
    onClick={onClick}
  >
    &#9654; {/* 오른쪽 화살표 */}
  </button>
);

const TravelPackageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // 사용자 정의 화살표 연결
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // 태블릿 크기 이하
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="travel-carousel px-6 py-8 my-16">
      <h2 className="text-xl font-bold text-gray-800 p-4">추천 여행 패키지</h2>
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
  );
};

export default TravelPackageCarousel;
