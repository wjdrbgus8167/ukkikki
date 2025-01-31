// 여행사 목록 리스트 페이지

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AgencySideBar from "../components/agencyPlanList/AgencySideBar";
import UserProposals from "../components/agencyPlanList/UserProposals";
import { TravelPlanProvider } from "../contexts/TravelPlanContext";

const AgencyRoomList = () => {
  const jwtToken = "내 토큰 설정"

  return(
    <TravelPlanProvider jwtToken={jwtToken}>
      <div className="flex flex-col min-h-screen">
      
      <Header />

      <div className="main flex flex-1" >
          
          <aside className="w-1/4 bg-gray-100 p-4">
            <AgencySideBar />
          </aside>
          
          {/* CardList */}
          <section className="w-3/4 bg-white flex-1 overflow-auto">
            <UserProposals />
          </section>
        </div>

        
      <Footer/>
    </div>  
  </TravelPlanProvider>

  );
};

export default AgencyRoomList;