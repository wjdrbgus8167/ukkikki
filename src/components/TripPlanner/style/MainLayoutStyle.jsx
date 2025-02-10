import styled from 'styled-components';

export const StyledLoadScript = styled.div`
  width: 25%; /* 원하는 너비 */
  height: 100%; /* 원하는 높이 */
  display: flex; /* 유연한 레이아웃 */
  flex-direction: column; /* 세로로 배치 */
  justify-content: flex-start;
  margin: 0 12px; /* mx-3을 px로 변환 */

`;

export const StyledPlaceSelectionResult = styled.div`
  
  height: 100%; /* 동일한 높이 */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s;
  width: ${({ isCollapsed }) => (isCollapsed ? '0' : '100%')};
  overflow: hidden;
`;