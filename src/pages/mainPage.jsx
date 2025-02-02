import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import HeroSection from '../components/mainpage/HeroSection';
import PartnerBrandSlider from '../components/mainpage/PartnerBrandSlider';
import TravelPackageCarousel from '../components/mainpage/TravelPackageCarousel';
import { useLoadingStore } from '../stores/loadingStore';
import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const { setLoading } = useLoadingStore(); // 전역 로딩 상태 변경 함수 가져오기

  useEffect(() => {
    setLoading(true); // 로딩 시작
    axios.get('/api/home').finally(() => {
      setLoading(false); // 데이터 로딩 완료 후 스피너 숨김
    });
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <TravelPackageCarousel />
      <PartnerBrandSlider />
      <Footer />
    </div>
  );
};

export default Home;
