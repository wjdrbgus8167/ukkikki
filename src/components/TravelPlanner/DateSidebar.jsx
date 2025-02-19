import React, { useContext, useState, useMemo, useEffect } from "react";
import TravelPlanDetailContext from "../../contexts/TravelPlanDetailContext";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  SidebarContainer,
  ButtonList,
  ScheduleButton,
  DetailButton,
  SubmitButton,
} from "./style/DateSidebarStyle";

const DateSidebar = ({ onToggleDetailForm, onDaySelect, onSubmit }) => {
  // 두 컨텍스트 모두 가져옵니다.
  const travelPlanContext = useContext(TravelPlanDetailContext);
  const proposalDetailContext = useContext(ProposalDetailContext);
  const navigate = useNavigate();

  // 우선순위: 수정 페이지(ProposalDetailContext)가 있으면 그걸 사용하고, 그렇지 않으면 생성 페이지(TravelPlanDetailContext)를 사용
  const contextSelectedDayId =
    proposalDetailContext?.selectedDayId !== undefined
      ? proposalDetailContext.selectedDayId
      : travelPlanContext?.selectedDayId;
  const contextSetSelectedDay =
    proposalDetailContext?.setSelectedDay || travelPlanContext?.setSelectedDay;

  const [localSelectedDayId, setLocalSelectedDayId] = useState(1);
  const selectedDayId =
    contextSelectedDayId !== undefined ? contextSelectedDayId : localSelectedDayId;
  const setSelectedDay = contextSetSelectedDay || setLocalSelectedDayId;

  // 제안서 데이터: 수정 페이지면 ProposalDetailContext, 생성 페이지면 TravelPlanDetailContext 사용
  const proposal = proposalDetailContext?.proposal || travelPlanContext?.proposal;

  // travelPlan 계산: 생성 페이지(proposal.data.travelPlan)와 수정 페이지(proposal 자체) 구분
  const travelPlan =
    proposal && proposal.data && proposal.data.travelPlan
      ? proposal.data.travelPlan
      : proposal;

  // 여행 일정(날짜) 계산
  const travelDays = useMemo(() => {
    if (!proposal) return [];
    const { startDate, endDate } = travelPlan;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return Array.from({ length: diffDays }, (_, i) => ({
      id: i + 1,
      label: `${i + 1}일차`,
      date: new Date(start.getTime() + i * 86400000)
        .toISOString()
        .split("T")[0],
    }));
  }, [proposal, travelPlan]);

  // 제안서가 로드되었을 때, selectedDayId가 없다면 첫 번째 날을 기본값으로 설정
  useEffect(() => {
    if (proposal && (selectedDayId == null || selectedDayId === 0) && travelDays.length > 0) {
      setSelectedDay(travelDays[0].id);
    }
  }, [proposal, selectedDayId, travelDays, setSelectedDay]);

  if (!proposal) {
    return <div>Loading...</div>;
  }

  const handleDaySelect = (dayId) => {
    console.log("Day selected:", dayId);
    setSelectedDay(dayId);
    if (onDaySelect) onDaySelect(dayId);
  };

  const handleDetailClick = () => {
    if (onToggleDetailForm) onToggleDetailForm();
  };


  // 제출(수정/생성) 버튼 클릭 시
  const handleSubmitClick = async () => {
    if (onSubmit) {
      // 수정 페이지: proposal.proposalId가 존재하면 수정 플로우
      if (proposal.proposalId) {
        const response = await onSubmit(); // 수정 API 호출 및 결과 반환
        console.log("수정 API 응답:", response);
        if (response && response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "수정이 완료되었습니다.",
            confirmButtonText: "확인",
          }).then(() => {
            navigate(
              `/agency-proposal-detail/${travelPlan.travelPlanId || travelPlan.id}/${proposal.proposalId}`
            );
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "제출 오류",
            text: "수정에 실패했습니다.",
          });
        }
      } else {
        // 생성 페이지: proposal.proposalId가 없으면 생성 플로우
        Swal.fire({
          icon: "question",
          title: "제안을 보내시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "보내기",
          cancelButtonText: "취소",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await onSubmit(); // 생성 API 호출 및 결과 반환
            console.log("생성 API 응답:", response);
            // 응답 객체에서 제안서 데이터 추출 (API 함수에서 response.data를 반환한다고 가정)
            const createdProposal = response?.proposal || response?.data?.proposal;
            if (createdProposal && createdProposal.proposalId) {
              // 제안서 전달 완료 알림창 추가
              Swal.fire({
                icon: "success",
                title: "제안서를 전달했습니다.",
                confirmButtonText: "확인",
              }).then(() => {
                navigate(
                  `/agency-proposal-detail/${travelPlan.travelPlanId || travelPlan.id}/${createdProposal.proposalId}`
                );
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "제출 오류",
                text: "제안 제출에 실패했습니다.",
              });
            }
          }
        });
      }
    }
  };
  
  return (
    <SidebarContainer>
      <ButtonList>
        {travelDays.map((day) => (
          <ScheduleButton
            key={day.id}
            active={day.id === selectedDayId}
            onClick={() => handleDaySelect(day.id)}
          >
            {day.label}
          </ScheduleButton>
        ))}
        <DetailButton onClick={handleDetailClick} active={false}>
          상세내용
        </DetailButton>
      </ButtonList>
      <SubmitButton onClick={handleSubmitClick}>
        {proposal && proposal.proposalId ? "수정" : "제출"}
      </SubmitButton>
    </SidebarContainer>
  );
};

export default DateSidebar;
