import styled from 'styled-components';

export const PlaceSelectionResultContainer = styled.div`
  transition: all 0.3s;
  width: ${({ isCollapsed }) => (isCollapsed ? '0' : '100%')};
  overflow: ${({ isCollapsed }) => (isCollapsed ? 'hidden' : 'visible')};
  padding: ${({ isCollapsed }) => (isCollapsed ? '0' : '1rem')};

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;