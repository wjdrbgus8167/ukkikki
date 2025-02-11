import styled from "styled-components";

export const AgencyRoomListPageContainer = styled.div`
  flex-direction: column;
  min-height: 100vh;
`;

// 메인 콘텐츠 영역 설정
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// 탭 버튼 그룹
export const TabButtonGroup = styled.div`
  display: flex;
  margin: 16px 0px;
  justify-content: center;
  gap: 16px;
`;

// 개별 버튼 스타일
export const TabButton = styled.button`
  padding: 8px 16px;
  font-weight: bold;
  border-bottom: ${(props) => (props.active ? "4px solid #412B2B" : "none")};
  cursor: pointer;
  transition: all 0.3s ease;

`;

// 선택된 탭 콘텐츠 영역
export const TabContent = styled.section`
  width: 100%;
  background-color: white;
  flex: 1;
  overflow: auto;
  margin-top: 16px;
`;

