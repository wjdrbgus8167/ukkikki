import styled from "styled-components";

// 페이지 전체 컨테이너
export const ProposalDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// 페이지 내용 컨테이너
export const ContentContainer = styled.div`
  padding: 2.5rem; /* p-10 */
  flex-grow: 1; /* 페이지가 전체 높이를 차지하도록 함 */
`;

// ProposalContent 영역
export const ProposalContentWrapper = styled.div`
  padding: 2.5rem; /* p-10 */
`;

// 지도 및 장소 리스트 영역
export const MapAndPlaceWrapper = styled.div`
  display: flex;
  gap: 1.25rem; /* gap-5 */
  padding: 2.5rem; /* p-10 */
`;

// 지도 영역
export const MapWrapper = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;

// 장소 리스트 영역
export const PlaceListWrapper = styled.div`
  width: 440px;
  margin: 1rem;
  height: 500px;
  overflow-y: auto; /* 세로 스크롤 */

  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    // display: none;
  }

  // scrollbar-width: none;
`;

// 수락 버튼 스타일
export const AcceptButton = styled.button`

  width: 90px;
  hight: 40px;
  background-color: #FFFFFF;
  bottom:
  color: black;
  font-size: 1rem;
  font-weight: 10;
  border-color: black; 
  border-width: 3px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFD21C;
  }
`;

export const ButtonPosition = styled.div`
 display: flex;
 justify-content: end;
 align-items:flex-end;
 margin-right: 80px;
 margin-bottom: 20px;
`;
