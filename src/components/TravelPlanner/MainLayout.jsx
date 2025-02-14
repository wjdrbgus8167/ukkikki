import React, { useContext, useState } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import DateSidebar from "./DateSidebar";
import MapDisplay from "./MapDisplay";
import ScheduleByDate from "./ScheduleByDate";
import PlaceSelection from "./PlaceSelection";
import DetailForm from "./DetailForm";
import { CreateTravelProposal } from "../../apis/agency";
import { 
  StyledMainLayout,
  StyledDateSidebar,
  StyledMapDisplay,
  StyleScheduleByDate,
  StyleMapContainer,
  StylePlaceSelection,
  DetailFormWrapper, 
  ContentArea,
} from "./style/MainLayoutStyle";

// 간단한 고유 ID 생성 함수 (필요에 따라 uuid 라이브러리 사용 가능)
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const MainLayout = () => {
  const { proposal, selectedDayId } = useContext(ProposalDetailContext);
  
  const [ proposalData, setProposalData ] = useState({
    name: '',
    startDate: '',
    endDate: '',
    airline:'',
    departureAirportCode: '',
    departureAirportName: '',
    arrivalAirportCode: '',
    arrivalAirportName: '',
    startDateBoardingTime: '',
    startDateArrivalTime: '',
    endDateBoardingTime: '',
    endDateArrivalTime: '',
    deposit: 0,
    minPeople:0,
    guideIncluded: '',
    productIntroduction: '',
    refundPolicy: '',
    insuranceIncluded: '',
    proposalStatus: 'V',
  });

  // 날짜별 선택된 장소들을 저장하는 상태 (객체: key는 day id)
  const [selectedPlacesByDay, setSelectedPlacesByDay] = useState({});
  console.log('ScheduleItems:', selectedPlacesByDay);
  
  
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
    // 고유 식별자가 없다면, generateUniqueId()를 이용해 생성합니다.
    const placeWithId = { 
      ...place, 
      placeId: place.placeId || generateUniqueId(), 
      dayNumber: selectedDayId
    };
    setSelectedPlacesByDay((prev) => ({
      ...prev,
      [selectedDayId]: [...(prev[selectedDayId] || []), placeWithId],
    }));
    setShowPlaceSelection(false);
  };

  // 현재 선택된 날짜의 장소 목록
  const currentDayPlaces = selectedPlacesByDay[selectedDayId] || [];

  // 장소 삭제 
  const handleDeletePlace = (placeId) => {
    console.log("삭제하려는 id:", placeId);
    console.log("현재 장소 목록:", currentDayPlaces);
    const updatedPlaces = currentDayPlaces.filter(place => place.placeId !== placeId);
    console.log("삭제 후 장소 목록:", updatedPlaces);
    setSelectedPlacesByDay(prev => ({
      ...prev,
      [selectedDayId]: updatedPlaces
    }));
  };

  const handleSetTime = (placeId, startTime, endTime) => {
    setSelectedPlacesByDay((prev) => {
      const updatedPlaces = (prev[selectedDayId] || []).map((place) => {
        if (place.placeId === placeId) {
          return { ...place, startTime, endTime }; // 장소에 startTime과 endTime 추가
        }
        return place;
      });
      return { ...prev, [selectedDayId]: updatedPlaces };
    });
  };

  const handleDaySelectFromSidebar = () => {
    if (showDetailForm) {
      setShowDetailForm(false);
    }
  };

  const handleSubmitProposal = async () => {
    // 1. 모든 day의 장소들을 평탄화하고, 각 객체에서 placeId를 제거
    const scheduleItems = Object.values(selectedPlacesByDay)
      .flat()
      .map(({ placeId, ...rest }) => rest);
  
    // 2. 최종 payload 구성
    const payload = {
      ...proposalData,
      scheduleItems,
    };
  
    console.log("POST할 데이터:", payload);
  
    try {
      // 여행계획 제안서를 전송할 때 travelPlanId와 payload를 함께 전달
      const data = await CreateTravelProposal(proposal.data.travelPlan.travelPlanId, payload);
      console.log("제출 성공:", data);
    } catch (error) {
      console.error("제출 오류:", error);
    }
  };

  return (
    <StyledMainLayout>
      {/* 사이드바 */}
      <StyledDateSidebar>
        <DateSidebar 
        onToggleDetailForm={toggleDetailForm} 
        onDaySelect={handleDaySelectFromSidebar}
        onSubmit={handleSubmitProposal}
        />
      </StyledDateSidebar>

      {/* 사이드바를 제외한 나머지 영역 */}
      <ContentArea>
        {showDetailForm ? (
          // 상세 내용 버튼을 누르면면 기존의 일정/지도 영역은 감추고 DetailForm을 채움
          <DetailFormWrapper>
            <DetailForm proposalData={proposalData} setProposalData={setProposalData}/>
          </DetailFormWrapper>
        ) : (
          <>
            <StyleScheduleByDate>
              <ScheduleByDate 
                onTogglePlaceSelection={togglePlaceSelection} 
                selectedPlaces={currentDayPlaces}
                onDeletePlace={handleDeletePlace}
                onAddTime={handleSetTime}
              />
            </StyleScheduleByDate>
            <StyledMapDisplay>
              <StyleMapContainer>
                <MapDisplay 
              
                  arrivalCity={arrivalCity.name}
                  selectedPlaces={currentDayPlaces}
                  day={selectedDayId}
                />
                {showPlaceSelection && (
                  <StylePlaceSelection show="true">
                    <PlaceSelection onSelectPlace={handleSelectPlace} />
                  </StylePlaceSelection>
                )}
              </StyleMapContainer>
            </StyledMapDisplay>
          </>
        )}
      </ContentArea>
    </StyledMainLayout>
  );
};

export default MainLayout;
