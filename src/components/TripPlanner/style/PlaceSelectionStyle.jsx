import styled from 'styled-components';

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
    font-size: 20px; /* 날짜 크기 */
    color: #555; /* 글자 색상 */
    margin-left: 5px;
  }
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

export const SearchSection = styled.div`
  width: 100%;
  
  h2 {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-top:10px;

  }
`;

export const Places = styled.div`
 margin: 10px;
`;