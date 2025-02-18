import React, { useContext, useState, useEffect } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import DateSidebar from "./DateSidebar";
import MapDisplay from "./MapDisplay";
import ScheduleByDate from "./ScheduleByDate";
import PlaceSelection from "./PlaceSelection";
import DetailForm from "./DetailForm";
import { CreateTravelProposal, UpdateTravelProposal } from "../../apis/agency";
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
import Swal from 'sweetalert2';

// 간단한 고유 ID 생성 함수
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const MainLayout = () => {
  const { proposal, selectedDayId } = useContext(ProposalDetailContext);
  // 날짜별 선택된 장소들을 저장
  const [selectedPlacesByDay, setSelectedPlacesByDay] = useState({});
  const [showPlaceSelection, setShowPlaceSelection] = useState(false);
  // 상세 내용 페이지 표시 여부
  const [showDetailForm, setShowDetailForm] = useState(false);
  
  const [proposalData, setProposalData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    airline: '',
    departureAirportCode: '',
    departureAirportName: '',
    arrivalAirportCode: '',
    arrivalAirportName: '',
    startDateBoardingTime: '',
    startDateArrivalTime: '',
    endDateBoardingTime: '',
    endDateArrivalTime: '',
    deposit: 0,
    minPeople: 0,
    guideIncluded: '',
    productIntroduction: '',
    refundPolicy: '',
    insuranceIncluded: '',
    proposalStatus: 'W',
  });
  
  // proposal 상태가 변경될 때마다 콘솔에 출력 (디버깅용)
  useEffect(() => {
    if (proposal) {
      console.log("최종 proposal 상태:", proposal);
    }
  }, [proposal]);

  useEffect(() => {
    if (proposal && proposal.proposalId) {
      // 응답 구조에 맞게 초기값 세팅
      setProposalData({
        name: proposal.name,
        startDate: proposal.startDate,
        endDate: proposal.endDate,
        airline: proposal.airline,
        departureAirportCode: proposal.departureAirportCode,
        departureAirportName: proposal.departureAirportName,
        arrivalAirportCode: proposal.arrivalAirportCode,
        arrivalAirportName: proposal.arrivalAirportName,
        startDateBoardingTime: proposal.startDateBoardingTime,
        startDateArrivalTime: proposal.startDateArrivalTime,
        endDateBoardingTime: proposal.endDateBoardingTime,
        endDateArrivalTime: proposal.endDateArrivalTime,
        deposit: proposal.deposit,
        minPeople: proposal.minPeople,
        guideIncluded: proposal.guideIncluded,
        productIntroduction: proposal.productInformation,
        refundPolicy: proposal.refundPolicy,
        insuranceIncluded: proposal.insuranceIncluded,
        proposalStatus: proposal.proposalStatus,
      });
    }
  }, [proposal]);

  if (!proposal) {
    return <div>로딩중...</div>;
  }

  const { arrivalCity } = proposal.data.travelPlan;

  // 장소 추가 버튼 토글 함수
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
    console.log("현재 장소 목록:", currentDayPlaces);
    const updatedPlaces = currentDayPlaces.filter(place => place.placeId !== placeId);
    console.log("삭제 후 장소 목록:", updatedPlaces);
    setSelectedPlacesByDay((prev) => ({
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
    const requireFields = {
      name: '여행 이름',
      startDate: '여행 시작일',
      endDate: '여행 종료일',
      airline: '항공사',
      departureAirportCode: '출발 공항 코드',
      departureAirportName: '출발 공항 이름',
      arrivalAirportCode: '도착 공항 코드',
      arrivalAirportName: '도착 공항 이름',
      startDateBoardingTime: '출발일 비행기 탑승 시간',
      startDateArrivalTime: '여행지 도착 시간',
      endDateBoardingTime: '도착일 비행기 탑승 시간',
      endDateArrivalTime: '한국 도착 시간',
      deposit: '예약금',
      minPeople: '최소인원',
      guideIncluded: '가이드 포함 여부',
      productIntroduction: '상품 소개',
      refundPolicy: '취소/환불 정책',
      insuranceIncluded: '여행자 보험 포함 여부',
    };

    const MissingFields = Object.keys(requireFields).filter((field) => {
      const value = proposalData[field];
      if (typeof value === 'string') {
        return value.trim() === "";
      }
      if (typeof value === 'number') {
        return value === 0;
      }
      return !value;
    });

    if (MissingFields.length > 0) {
      const MissingFielsNames = MissingFields.map((field) => requireFields[field]);
      Swal.fire({
        icon: 'warning',
        title: '필수 항목이 누락되었습니다.',
        text: `다음 항목을 채워주세요 => ${MissingFielsNames.join(",")}`,
        confirmButtonText: '확인',
        confirmButtonColor: '#412B2B',
      });
      return;
    }

    // 장소 데이터 가공
    const schedules = Object.values(selectedPlacesByDay)
      .flat()
      .map(({ placeId, dayNumber, ...rest }) => rest);
    console.log("POST 전송할 스케줄 데이터:", schedules);
    
    const invalidScheduleItem = schedules.find(item => {
      return (
        !item.startTime ||
        (typeof item.startTime === 'string' && item.startTime.trim() === "") ||
        !item.endTime ||
        (typeof item.endTime === 'string' && item.endTime.trim() === "")
      );
    });

    if (invalidScheduleItem) {
      Swal.fire({
        icon: 'warning',
        title: '모든 일정 항목에 시작 시간과 종료 시간을 입력해주세요,',
        confirmButtonText: '확인',
        confirmButtonColor: '#412B2B',
      });
      return;
    }
  
    const payload = {
      ...proposalData,
      schedules,
    };
  
    console.log("POST할 데이터:", payload);
  
    try {
      let data;
      if (proposal.data.proposalId) {
        data = await UpdateTravelProposal(
          proposal.data.travelPlan.travelPlanId,
          proposal.data.proposalId,
          payload
        );
        console.log("수정 성공:", data);
      } else {
        data = await CreateTravelProposal(proposal.data.travelPlan.travelPlanId, payload);
        console.log("제출 성공:", data);
      }
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
          <DetailFormWrapper>
            <DetailForm
              proposalData={proposalData} 
              setProposalData={setProposalData}
            />
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
