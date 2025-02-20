// ./styled/OngoingProposalsStyle.jsx
import styled from 'styled-components';

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
  width: 910px;
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
  table-layout: fixed; /* 컬럼의 너비를 균등하게 고정 */
`;

export const TableHead = styled.thead`
  text-align: bottom;
`;

export const TableHeadRow = styled.tr``;

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
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TableCell = styled.td`
  padding: 1rem;
  text-align: center;
  background-color: transparent;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
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

// 페이지네이션 스타일 추가
export const PaginationWrapper = styled.div`
  /* ReactPaginate가 생성하는 ul 태그에 적용 */
  .pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
    list-style: none; /* ul 기본 스타일 제거 */
    padding: 0; /* ul 기본 패딩 제거 */
    margin: 40px 0; /* 필요하면 여백 설정 */
  }

  /* 각 페이지 번호를 감싸는 li */
  .page-item {
    margin: 0 5px;
  }

  /* 각 페이지 번호의 링크(a 태그) */
  .page-item a {
    background-color: #ffffff;
    color: #412b2b;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 5px;
    text-decoration: none; /* 밑줄 제거 */
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .page-item a:hover {
    background-color: #412b2b;
    color: #ffd21c;
  }

  /* 비활성화된 버튼(이전, 다음이 없는 경우 등) */
  .previous-item.disabled a,
  .next-item.disabled a {
    background-color: #f1f1f1;
    color: #999;
    cursor: not-allowed;
  }

  /* 활성화된 페이지(현재 페이지) */
  .active a {
    background-color: #412b2b;
    color: #ffd21c;
  }
`;
