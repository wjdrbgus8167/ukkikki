import styled from "styled-components";

export const ScheduleByDateContainer = styled.div`
   margin: 10px 0px;
   width: 100%;

`;
export const Info = styled.div`
  width: 100%; /* 가로 길이 고정 */
  height: 100px; /* 높이 고정 */
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  border-bottom: 1px solid #ddd; /* 아래쪽 경계선 */

  h1 {
    font-size: 40px; /* 제목 크기 */
    font-weight: bold; /* 굵은 글씨 */
    margin-left: 5px; 
  }

  h3 {
    font-size: 18px; /* 날짜 크기 */
    color: #555; /* 글자 색상 */
    margin-left: 5px;
  }
`;

export const ScheduleContainer = styled.div`
  padding-top: 10px;
  button {
    width: 260px;
    border: 3px dotted #C9C9C9;
    border-radius: 8px;
    padding: 8px 80px;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #FFD21C;


  }
`;

export const SelectedPlacesContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;

  .selected-place {
    width: 260px;
    height: 80px;
    padding: 10px;
    border-radius: 10px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 10px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
    position: relative; /* 자식 요소에 절대 위치 설정을 위해 */
  }

  .index {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .time-input {
    position: absolute;
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between; /* input과 버튼을 양쪽에 배치 */
    align-items: center;
    z-index: 10;
    left: 0px;
  }

  .time-input-fields {
    padding-left: 5px;
    width: 220px; 
    height: 60px;
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  .btn {
    margin-left: auto; /* 버튼을 오른쪽으로 정렬 */
  }
`;


export const SelectedPlacesContent = styled.div`
  margin-left: 10px;
  width: 260px; 
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between; 

  .place {
    font-size: 16px;
     flex-grow: 1;

  }

  .btns {
    display: flex; /* 버튼들을 수평으로 배치 */
    gap: 10px; 
  }
  
`;