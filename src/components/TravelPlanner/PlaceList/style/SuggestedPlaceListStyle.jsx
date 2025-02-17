import styled from "styled-components";



export const StylePlaceList = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row; /* 수평 정렬 */
  margin-bottom: 10px;
  gap: 16px; /* 요소 사이 간격 */

  button {
  justify-content: flex-end;
  border: 2px solid #C9C9C9; 
  border-radius: 0.5rem;
  color: black;
  width: 100px; 
  height: 40px;
  font-size: 10px; 
  display: flex;
  align-items: center;
  justify-content: center;
   background-color: transparent; 
  }
`;

// Place 내용 (텍스트) 영역
export const StylePlaceContent = styled.div`
 
  p {
    margin: 0;
    font-size: 14px;
  }
`;

