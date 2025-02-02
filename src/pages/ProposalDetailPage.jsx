//여행사 디테일 페이지
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProposalContent from '../components/agencyDetail/ProposalContent.jsx'
import PlaceList from "../components/agencyDetail/PlaceList.jsx";
import { ProposalDetailProvider } from "../contexts/proposalDetailContext.jsx";

const ProposalDetail = ({jwtToken, travelPlanId}) => {

    return(
      <ProposalDetailProvider jwtToken={jwtToken} travelPlanId={travelPlanId}>
        <div>
            <Header />
                <ProposalContent />
                <PlaceList />
            <Footer />
        </div>
      </ProposalDetailProvider>
    );
};

export default ProposalDetail;