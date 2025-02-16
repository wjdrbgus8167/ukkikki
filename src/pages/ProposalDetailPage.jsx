import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProposalContent from "../components/agencyDetail/ProposalContent.jsx";
import PlaceList from "../components/agencyDetail/PlaceList.jsx";
import { ProposalDetailProvider } from "../contexts/ProposalDetailContext.jsx";
import UserLocationMap from "../components/agencyDetail/UserLocationMap.jsx";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { 
  ProposalDetailContainer,
  ContentContainer,
  ProposalContentWrapper,
  MapAndPlaceWrapper,
  MapWrapper,
  PlaceListWrapper,
  AcceptButton,
  ButtonPosition
} from "./style/ProposalDetailPageStyle.jsx"; // 스타일드 컴포넌트 import

const ProposalDetail = () => {
  const { travelPlanId } = useParams();
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);


  const onhandleCreatePlan = () => {
    navigate(`/travel-plans/${travelPlanId}/proposals`);
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    console.log('선택한 장소:', place);
  };

  return (
    <ProposalDetailProvider travelPlanId={travelPlanId}>
      <ProposalDetailContainer>
        <Header />
        <ContentContainer>
          <ProposalContentWrapper>
            <ProposalContent />
          </ProposalContentWrapper>
          <MapAndPlaceWrapper>
            <MapWrapper>
              <UserLocationMap 
                latitude={selectedPlace?.latitude} 
                longitude={selectedPlace?.longitude} 
              />
            </MapWrapper>
            <PlaceListWrapper>
              <PlaceList handlePlaceClick={handlePlaceClick} />
            </PlaceListWrapper>
          </MapAndPlaceWrapper>
        </ContentContainer>
        <ButtonPosition>
          <AcceptButton onClick={onhandleCreatePlan}>
            수락
          </AcceptButton>
        </ButtonPosition>
          <Footer />
      </ProposalDetailContainer>
    </ProposalDetailProvider>
  );
};

export default ProposalDetail;
