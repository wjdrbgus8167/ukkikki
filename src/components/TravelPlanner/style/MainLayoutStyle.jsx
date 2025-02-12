import styled from 'styled-components';


export const StyledMainLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row; /* 수평 배열, 기본값이므로 생략 가능 */

`;

export const StyledDateSidebar = styled.div`
  display: flex;
  width: 10%
  justify-content: center; /* 가로 방향 가운데 정렬 */
  margin: 10px;
`;

export const StyledMapDisplay = styled.div`
  display: flex;
  width: 75%
`;

export const StyleScheduleByDate = styled.div`
  display: flex;
  width: 25%
  justify-content: center; /* 가로 방향 가운데 정렬 */
`;