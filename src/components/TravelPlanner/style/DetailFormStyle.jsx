import styled from 'styled-components'


export const DetailFormContainer = styled.div`
  width: 90%;                 /* 전체 너비의 90%로 설정 */
  max-width: 1300px;           /* 최대 너비를 1300px로 제한 */
  margin: 10px auto;
  border: 4px solid black;
  border-radius: 20px;
  padding: 20px;
  background-color: #fff;


  box-shadow: 30px 20px 0px rgba(255, 204, 0, 0.6); /* 노란색 그림자 */

  height: 90vh;                /* 폼 내용 영역 높이 설정 */
  overflow-y: auto;            /* 세로 스크롤 추가 */

    

  .custom-hr {
    margin-top: 12px;
    margin-bottom: 12px;
    border-top: 3.5px solid #d1d5db;  /* border-gray-300 */
    width: 1150px;
    margin-left: auto;
    margin-right: auto;
}

/* 내용 중앙 정렬을 위한 스타일 추가 */
  .content-container {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    width: 100%;
  }

`;

export const TravelTitle = styled.p`
    font-size: 40px;
    font-weight: 200;
    text-align: left; /* 왼쪽 정렬 */
    margin-left: 50px;  /* 왼쪽으로 옮기기 위한 margin-left */
    flex-grow: 1; /* 공간을 최대화하여 왼쪽으로 밀리도록 함 */
`;

export const TravelWrapper = styled.div`
    display: flex; /* 부모 컨테이너에 flex 적용 */
    align-items: center; /* 세로 정렬 가운데 */
    width: 100%;
    gap: 10px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap:0px; /* 두 요소 사이에 100px 간격을 추가 */
  position: relative;

    &::after {
    content: "";
    position: absolute;
    top: 50%; /* 수평 중앙 정렬 */
    left: 50%;
    transform: translateX(-50%); /* 가운데로 정렬 */
    width: 100%; /* 선의 길이 */
    height: 2px; /* 선의 두께 */
    background-color: #F5BD33; /* 선 색상 */
    z-index: -1; /* 선이 요소 뒤로 가게 */
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 왼쪽 정렬 */

  position: relative; /* 두 input 사이에 선을 추가하려면 relative 위치 설정 */
`;

