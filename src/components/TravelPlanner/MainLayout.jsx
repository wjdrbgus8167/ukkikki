import React, { useContext, useState } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import DateSidebar from "./DateSideBar";
import MapDisplay from "./MapDisplay";
import ScheduleByDate from "./ScheduleByDate";
import PlaceSelection from "./PlaceSelection";
import { LoadScript } from "@react-google-maps/api";
import { 
  StyledMainLayout,
  StyledDateSidebar,
  StyledMapDisplay,
  StyleScheduleByDate,
  StyleMapContainer,
  StylePlaceSelection,
  StyledOverlayButton
} from "./style/MainLayoutStyle";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MainLayout = () => {
  const { proposal } = useContext(ProposalDetailContext);
  const [selectedPlaces, setSeletedPlaces] = useState([]);
  const [showPlaceSelection, setShowPlaceSelection] = useState(false);

  if (!proposal) {
    return <div>로딩중...</div>;
  }

  const { arrivalCity } = proposal.data.travelPlan;

  // "장소 추가" 버튼을 클릭하면 PlaceSelection 표시 여부를 토글하는 함수
  const togglePlaceSelection = () => {
    setShowPlaceSelection((prev) => !prev);
  };

  return (
    <StyledMainLayout>
      {/* 사이드바 영역 */}
      <StyledDateSidebar>
        <DateSidebar />
      </StyledDateSidebar>

      {/* 일자별 스케줄 영역 */}
      <StyleScheduleByDate>
        {/* togglePlaceSelection 함수를 prop으로 전달 */}
        <ScheduleByDate onTogglePlaceSelection={togglePlaceSelection} />
      </StyleScheduleByDate>

      {/* 지도 영역 */}
      <StyledMapDisplay>
        <StyleMapContainer>
          {/* 지도 컴포넌트 */}
          <MapDisplay 
            arrivalCity={arrivalCity.name}
            seletedPlaces={selectedPlaces}
          />
          {/* showPlaceSelection이 true일 경우에만 PlaceSelection 렌더링 */}
          {showPlaceSelection && (
            <StylePlaceSelection>
              <PlaceSelection />
            </StylePlaceSelection>
          )}
          <StyledOverlayButton>
            |||
          </StyledOverlayButton>
        </StyleMapContainer>
      </StyledMapDisplay>
    </StyledMainLayout>
  );
};

export default MainLayout;
