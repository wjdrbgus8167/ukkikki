import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import DashBoard from '../../components/user-room/DashBoard';
import InteractiveSection from '../../components/user-room/InteractiveSection';
const UserRoom = () => {
  return (
    <div>
      <Header />
<DashBoard />
<InteractiveSection />
      <Footer />
    </div>
  );
};

export default UserRoom;
