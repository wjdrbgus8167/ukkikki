import styled from 'styled-components';

export const PorposalContentContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  column-gap: 80px; /* space-x-40: 10rem (160px) */
  margin-left: 150px;

  .proposal-title {
    flex: 1.5;
    font-size: clamp(80px, 5vw, 90px);
    color: #412b2b;
    font-weight: 800;
    line-height: 100px;
    text-align: center;
    padding: 0 1.25rem;
  }

  .proposal-content {
    flex: 2.5;
    font-size: 20px; /* text-[30px] */
    font-weight: 400; /* font-semibold */
    line-height: 50px; /* leading-[50px] */
    
    
  }
  .keywords-container {
    display: flex;
    flex-wrap: wrap; /* 키워드가 화면에 꽉 차면 줄바꿈 */
    gap: 5px;
  }

  .keyword {
    margin-right: 3px; /* 키워드 사이에 간격 추가 */
    font-size: 14px;
    color: black;
  }
`;
