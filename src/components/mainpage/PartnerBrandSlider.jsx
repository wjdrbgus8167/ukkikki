import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../../assets/brand_example.png';
const brands = [
  { id: 1, name: 'Brand A', logo: logo },
  { id: 2, name: 'Brand B', logo: logo },
  { id: 3, name: 'Brand C', logo: logo },
  { id: 4, name: 'Brand D', logo: logo },
];

const PartnerBrandSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // 태블릿 크기 이하
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="partner-slider px-6 py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">제휴 브랜드</h2>
      <Slider {...settings}>
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex justify-center items-center p-4 w-40 h-40 rounded-lg"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnerBrandSlider;
