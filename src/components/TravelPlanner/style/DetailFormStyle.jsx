import styled from 'styled-components';

export const DetailFormContainer = styled.div`
  width: 70%; /* 전체 너비의 70%로 설정 (90% → 70%로 변경) */
  max-width: 900px; /* 최대 너비를 900px로 제한 (1300px → 900px로 변경) */
  height: 600px;
  margin: 10px auto;
  background-color: #fff;
  overflow-y: auto; /* 세로 스크롤 추가 */

  .custom-hr {
    margin-top: 12px;
    margin-bottom: 12px;
    border-top: 3.5px solid #d1d5db; /* border-gray-300 */
    width: 100%; /* 너비를 100%로 변경하면 container 너비에 맞게 조정됨 */
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Table = styled.table`
  margin: 0 auto; /* 수평 중앙 정렬 */
  width: 100%;
  max-width: 1200px; /* 테이블의 최대 너비를 설정 */
  border-collapse: collapse; /* 테이블 경계선 겹침 방지 */
  table-layout: auto;
`;

export const TableHeadCell = styled.th`
  padding: 15px;
  margin-left: 15px;
  white-space: nowrap;
  font-weight: bold;
  text-align: left; /* 왼쪽 정렬 */
  text-transform: uppercase;
  font-size: 1.5625rem;
  opacity: 0.7;
`;

// 스타일 파일 (예시)
// export const Input = styled.input`
//   padding: 0.5rem;
//   border: 1px solid #ccc; /* 기본 테두리 */
//   border-radius: 4px; /* 둥근 모서리 */
//   width: 100%;
//   box-sizing: border-box;

//   &:focus {
//     border: 1px solid #007BFF; /* 포커스 시 테두리 색상 변경 */
//     outline: none; /* 포커스 시 기본 아웃라인 제거 */
//   }
// `;
