// style/DateSidebarStyle.jsx
import styled from 'styled-components';

// Sidebar 전체 컨테이너 (p-4)
export const SidebarContainer = styled.div`
  padding: 1rem;
`;


export const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px; /* space-y-2: 위 아래 간격 */
`;

export const ScheduleButton = styled.button`
  background-color: ${({ active }) => (active ? '#FFD21C' : 'white')};
  color: black;
  font-size: 1rem; /* text-x: 필요에 따라 조정 */
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #C9C9C9; 
  border-radius: 0.5rem; /* rounded-lg */
  width: 6.5rem; /* 원래 Tailwind w-[26] 값 (필요에 따라 단위 조정) */
  height: 4rem;  /* h-16 (4rem) */
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
`;


export const DetailButton = styled.button`
  background-color: ${({ active }) => (active ? '#FFD21C' : 'white')};
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #C9C9C9;
  border-radius: 0.5rem;
  width: 6.5rem;
  height: 4rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

`;
