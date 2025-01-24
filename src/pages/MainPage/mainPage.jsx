import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import HeroSection from '../../components/mainpage/HeroSection';
import PartnerBrandSlider from '../../components/mainpage/PartnerBrandSlider';
import TravelPackageCarousel from '../../components/mainpage/TravelPackageCarousel';
const Home = () => {
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
