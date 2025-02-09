//여행사 디테일 페이지
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProposalContent from '../components/agencyDetail/ProposalContent.jsx'
import PlaceList from "../components/agencyDetail/PlaceList.jsx";
import { ProposalDetailProvider } from "../contexts/ProposalDetailContext.jsx";
import UserLocationMap from "../components/agencyDetail/UserLocationMap.jsx";

const ProposalDetail = (travelPlanId) => {

    return(
      <ProposalDetailProvider travelPlanId={travelPlanId}>
        <div>
            <Header />
             <div className=" p-10">
              <div className=" p-10">
              <ProposalContent />
              </div>
                <div className="flex gap-5  p-10">
                  <div className="flex-1 bg-gray-300">
                    <UserLocationMap />
                  </div>
                  <div className="w-1/3 ">
                    <PlaceList />
                  </div>
                </div>
             </div>
                
            <Footer />
        </div>
      </ProposalDetailProvider>
    );
};

export default ProposalDetail;