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
  width: 40px;  /* 원하는 너비 값 */
  height: 30px; /* 원하는 높이 값 */
  }
`;

// Place 내용 (텍스트) 영역
export const StylePlaceContent = styled.div`
  /* 필요에 따라 추가 스타일 적용 */
  p {
    margin: 0;
    font-size: 14px;
  }
`;

