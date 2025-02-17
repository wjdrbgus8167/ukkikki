// ./styled/OngoingProposalsStyle.jsx
import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
`;

// 카드 스타일
export const CardWrapper = styled.div`
  flex: none;
  width: 100%;
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
`;

// 카드 내부 스타일
export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-bottom: 1.5rem;
  background-color: white;
  border: 0;
  border-radius: 1.25rem;
  background-clip: border-box;
`;

// 제목 스타일
export const TitleWrapper = styled.div`
  padding: 1.5rem;
  padding-bottom: 0;
  margin-bottom: 0;
  background-color: white;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  border-bottom: 0;
`;

export const Title = styled.h6`
  font-size: 2.5rem;
  font-weight: bold;
`;

// 테이블 스타일
export const TableWrapper = styled.div`
  width: 870px;
  padding: 0;
  overflow-x: auto;
  overflow-x: hidden;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
`;

export const TableHead = styled.thead`
  text-align: bottom;

`;

export const TableHeadRow = styled.tr`

`;

export const TableHeadCell = styled.th`
  padding: 15px;
  white-space: nowrap;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  background-color: transparent;
  border-bottom: 1px solid #e2e8f0;
  font-size: 1.5625rem;
  color: #cbd5e0;
  opacity: 0.7;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 입체적인 그림자 추가 */
    transform: scale(1.02); /* 살짝 커지는 효과 */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* 부드러운 애니메이션 */
  }

`;


export const TableCell = styled.td`
  padding: 1rem;
  text-align: center;
  background-color: transparent;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
`;

export const Status = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: 0.9375rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: ${(props) => {
    switch (props.status) {
      case 'D':
        return '#991B33';
      case 'A':
        return '#3053B4';
      case 'W':
        return '#1C6534';
      case 'V':
        return '#995E1B';
      default:
        return '#FFFFFF';
    }
  }};

  background-color: ${(props) => {
    switch (props.status) {
      case 'D':
        return '#FEE2E2';
      case 'A':
        return '#DBEAFE';
      case 'W':
        return '#DCFCE7';
      case 'V':
        return '#FEEDDB';
      default:
        return 'gray';
    }
  }};
`;
