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
  background-color: #e5e5e5; /* 배경색을 추가 */
  padding: 1rem;
  border-radius: 8px;
`;

// 장소 리스트 영역
export const PlaceListWrapper = styled.div`
  width: 33.33%; /* w-1/3 */
`;

// 수락 버튼 스타일
export const AcceptButton = styled.button`
  width: 90px;
  hight: 10px;
  background-color: #FFFFFF;
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

