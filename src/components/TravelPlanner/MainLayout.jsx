import React, { useContext, useState } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import DateSidebar from "./DateSidebar";
import MapDisplay from "./MapDisplay";
import ScheduleByDate from "./ScheduleByDate";
import PlaceSelection from "./PlaceSelection";
import DetailForm from "./DetailForm"; // 상세 내용 페이지 import
import { 
  StyledMainLayout,
  StyledDateSidebar,
  StyledMapDisplay,
  StyleScheduleByDate,
  StyleMapContainer,
  StylePlaceSelection,
  DetailFormWrapper, 
} from "./style/MainLayoutStyle";

const MainLayout = () => {
  const { proposal, selectedDayId } = useContext(ProposalDetailContext);
  
  // 날짜별 선택된 장소들을 저장하는 상태 (객체: key는 day id)
  const [selectedPlacesByDay, setSelectedPlacesByDay] = useState({});
  const [showPlaceSelection, setShowPlaceSelection] = useState(false);
  // 상세 내용 페이지 표시 여부
  const [showDetailForm, setShowDetailForm] = useState(false);

  if (!proposal) {
    return <div>로딩중...</div>;
  }

  const { arrivalCity } = proposal.data.travelPlan;

  // "장소 추가" 버튼 토글 함수
  const togglePlaceSelection = () => {
    setShowPlaceSelection((prev) => !prev);
  };

  // 상세 내용 버튼 토글 함수
  const toggleDetailForm = () => {
    setShowDetailForm((prev) => !prev);
  };

  // 선택된 장소를 현재 날짜(selectedDayId)에 추가
  const handleSelectPlace = (place) => {
    setSelectedPlacesByDay((prev) => ({
      ...prev,
      [selectedDayId]: [...(prev[selectedDayId] || []), place],
    }));
    setShowPlaceSelection(false);
  };

  // 현재 선택된 날짜의 장소 목록
  const currentDayPlaces = selectedPlacesByDay[selectedDayId] || [];

  return (
    <StyledMainLayout>
      {/* 사이드바 영역 */}
      <StyledDateSidebar>
        {/* DateSidebar에 상세 내용 토글 함수를 prop으로 전달 */}
        <DateSidebar onToggleDetailForm={toggleDetailForm} />
      </StyledDateSidebar>

      {/* 일자별 스케줄 영역 */}
      <StyleScheduleByDate>
        <ScheduleByDate 
          onTogglePlaceSelection={togglePlaceSelection} 
          selectedPlaces={currentDayPlaces}
        />
      </StyleScheduleByDate>

      {/* 지도 영역 */}
      <StyledMapDisplay>
        <StyleMapContainer>
          <MapDisplay 
            arrivalCity={arrivalCity.name}
            seletedPlaces={currentDayPlaces}
          />
          {showPlaceSelection && (
            <StylePlaceSelection show="true">
              <PlaceSelection onSelectPlace={handleSelectPlace} />
            </StylePlaceSelection>
          )}
        </StyleMapContainer>
      </StyledMapDisplay>

      {/* 상세 내용 페이지: 다른 컴포넌트 위에 띄우도록 z-index 조정 */}
      {showDetailForm && (
        <DetailFormWrapper>
          <DetailForm />
        </DetailFormWrapper>
      )}
    </StyledMainLayout>
  );
};

export default MainLayout;
