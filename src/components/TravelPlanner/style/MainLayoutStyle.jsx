import styled from 'styled-components';


export const StyledMainLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row; /* 수평 배열, 기본값이므로 생략 가능 */

`;

export const StyledDateSidebar = styled.div`
  display: flex;
  width: 10%;
  justify-content: center; /* 가로 방향 가운데 정렬 */
  margin: 10px 0px;
`;

export const StyledMapDisplay = styled.div`
  display: flex;
  width: 72%;
  margin: 10px 0px;
`;

export const StyleScheduleByDate = styled.div`
  display: flex;
  width: 18%;

`;

export const StyleMapContainer =  styled.div`
  position: relative; /* 자식 요소의 absolute 위치 기준 */
  width: 100%;
  height: 100%;

`;

export const StylePlaceSelection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10; /* MapDisplay보다 높은 값으로 설정 */
  width: 30%;
  height: 565px;
  /* 필요에 따라 배경색, 투명도 등 추가 스타일 적용 가능 */
  background-color: white;
  
  
`;

export const StyledOverlayButton = styled.button`
  position: absolute;
  top: 20px;   /* 지도 상단에서 20px 아래 */
  right: 20px;   /* 지도 우측에서 20px 떨어짐 */
  z-index: 20;   /* PlaceSelection보다 높은 z-index */
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s ease;

`;