import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

// 화살표 커스터마이징 컴포넌트
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
  const navigate = useNavigate();
  const [travelPlans, setTravelPlans] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  // ✅ 여행지 이미지 가져오기 (axios 사용)
  useEffect(() => {
    const fetchImages = async () => {
      console.log('📌 [디버깅] 이미지 요청 시작');

      const imageRequests = travelPlans.map(async (plan) => {
        const cityName = plan.arrivalCity?.name;
        console.log(`🔎 [도시] 검색 대상: ${cityName}`);

        if (!cityName) {
          console.warn(`⚠️ [경고] 도착 도시 정보 없음 -> ${plan}`);
          return null;
        }

        if (imageUrls[cityName]) {
          console.log(`✅ [스킵] 이미 불러온 이미지: ${cityName}`);
          return null;
        }
        try {
          // ✅ S3 버킷에서 해당 도시에 맞는 이미지 URL 생성
          const s3Url = `https://ukkikki-bucket.s3.ap-northeast-2.amazonaws.com/city/tokyo.jpg`;
          
          // ✅ 이미지가 존재하는지 확인
          const response = await axios.head(s3Url);
          if (response.status === 200) {
            console.log(`🎉 [응답] S3 이미지 URL 사용: ${s3Url}`);
            return { [cityName]: s3Url };
          }
        } catch (error) {
          console.warn(`⚠️ [경고] S3에서 이미지 없음, 기본 이미지 사용: ${cityName}`);
          return { [cityName]: 'https://via.placeholder.com/400' }; // 기본 이미지
        }
      });

      const results = await Promise.all(imageRequests);
      console.log('🔄 [결과] 모든 요청 완료:', results);

      const newImageUrls = results.reduce((acc, result) => {
        return result ? { ...acc, ...result } : acc;
      }, {});

      console.log('🌟 [최종 상태 업데이트] 새로운 이미지 목록:', newImageUrls);

      if (Object.keys(newImageUrls).length > 0) {
        setImageUrls((prev) => {
          console.log('📌 [이전 상태] 기존 이미지 목록:', prev);
          return { ...prev, ...newImageUrls };
        });
      }
    };

    if (travelPlans.length > 0) fetchImages();
  }, [travelPlans, apiKey]);

  // ✅ API 호출하여 여행방 데이터를 가져오기
  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const response = await publicRequest.get('/api/v1/travel-plans');
        if (response.status === 200 && response.data?.data?.travelPlans) {
          setTravelPlans(response.data.data.travelPlans);
        } else {
          console.error('🚨 여행방 데이터 형식 오류:', response.data);
        }
      } catch (error) {
        console.error('🚨 여행방 전체 조회 실패:', error);
      }
    };
    fetchTravelPlans();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleViewDetails = async () => {
    try {
      const response = await publicRequest.get('/api/v1/travel-plans');
      console.log(
        'response.data.data.travelPlans',
        response.data.data.travelPlans,
      );
      if (!response.data || !Array.isArray(response.data.data.travelPlans)) {
        throw new Error('🚨 API 응답이 올바르지 않습니다.');
      }

      navigate('/search-room', {
        state: { rooms: { travelPlans: response.data.data.travelPlans } },
      });
    } catch (error) {
      console.error('🚨 여행방 전체 조회 실패:', error);
      Swal.fire(
        '알림',
        '🚨 여행방 데이터를 불러오는 중 오류가 발생했습니다.',
        'error',
      );
    }
  };

  return (
    <div className="relative w-full">
      {/* ✅ 배경 레이어 */}
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
            className="px-6 py-3 mt-6 text-lg font-semibold text-white rounded-full shadow-md bg-brown"
            onClick={handleViewDetails}
          >
            자세히 알아보기 →
          </button>
        </div>

        {/* 오른쪽 캐러셀 */}
        <div className="w-full mt-10 md:w-2/3 md:mt-0">
          <div data-aos="fade-left" data-aos-delay="300">
            <Slider {...settings}>
              {travelPlans.map((plan) => {
                const cityName = plan.arrivalCity?.name;
                const imageUrl =
                  imageUrls[cityName] || 'https://via.placeholder.com/400';

                return (
                  <div key={plan.travelPlanId} className="p-4">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                      {/* ✅ Unsplash에서 가져온 이미지 사용 */}
                      <img
                        src={imageUrl}
                        alt={plan.name}
                        className="object-cover w-full h-48"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {plan.departureCity?.name} → {plan.arrivalCity?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCarousel;
