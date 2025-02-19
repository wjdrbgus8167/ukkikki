// style/DateSidebarStyle.jsx
import styled from 'styled-components';

// Sidebar 전체 컨테이너
export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 680px; /* 전체 높이를 채우도록 설정 */
  justify-content: space-between;
  overflow: visible;

`;


export const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px; /* space-y-2: 위 아래 간격 */
`;

export const ScheduleButton = styled.button`
  background-color: ${({ active }) => (active ? '#FFD21C' : 'white')};
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #C9C9C9; 
  border-radius: 0.5rem; /* rounded-lg */
  width: 6.5rem; 
  height: 4rem; 
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
`;


export const DetailButton = styled.button`
  background-color: ${({ active }) => (active ? '#FFD21C' : 'white')};
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  margin-bottom: 7px;
  border: 2px solid #C9C9C9;
  border-radius: 0.5rem;
  width: 6.5rem;
  height: 4rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

`;

export const SubmitButton = styled.button`
  background-color: #412B2B;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #C9C9C9;
  border-radius: 0.5rem;
  width: 6.5rem;
  height: 4rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
`;