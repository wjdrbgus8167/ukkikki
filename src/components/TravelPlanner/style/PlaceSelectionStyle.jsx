// PlaceSelectionStyle.js
import styled from "styled-components";

export const StyledContainer = styled.div`
  margin-top: 14px;
  padding: 0px 5px;

  .place-list {
   height:550px;
   overflow-y:auto;
`;


// 일자(label)를 위한 스타일 (예: 40px 크기, 굵은 글씨)
export const DayLabel = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #333;
`;

// 날짜(date)를 위한 스타일 (예: 20px 크기, 조금 아래에 마진 추가)
export const DayDate = styled.span`
  font-size: 18px;
  color: #555;
  margin-left: 5px;  /* label과 date 사이의 간격 */
`;

export const TabButton = styled.div`
  display: flex;
  margin-bottom: 14px; /* 버튼과 아래 콘텐츠 사이의 간격 */
  justify-content: space-evenly; /* 버튼 간격 균일하게 정렬 */
  

  button {
    flex: 1; /* 버튼의 동일한 너비 */
    padding: 8px 2px; /* 버튼 내부 여백 */
    font-size: 16px; /* 텍스트 크기 */
    font-weight: 600; /* 텍스트 두께 */
    cursor: pointer; /* 포인터 커서 */
    border: none; /* 기본 테두리 제거 */
    border-bottom: 2px solid transparent; /* 기본 상태에서 투명 */
    transition: all 0.2s ease; /* 클릭 시 애니메이션 */
    text-align: center; /* 텍스트 가운데 정렬 */
    min-width: 10px; /* 버튼의 최소 너비 지정 */
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */

    &.active {
      color: #2563eb; /* 활성화된 탭 텍스트 색 */
      border-bottom: 2px solid #2563eb; /* 활성화된 탭 하단 테두리 */
    }

    &.inactive {
      color: #9ca3af; /* 비활성화된 탭 텍스트 색 */
    }
  }
`;

export const StylePlaceContainer = styled.div`
  margin: 10px;
 }
`;

