import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const JoinDialog = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const MainVideo = styled.div`
  margin-bottom: 20px;
`;

export const StreamContainer = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;

export const StreamContainerText = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const Button = styled.input`
  margin: 5px;
`;

export const IframeContainer = styled.div`
  margin-top: 20px;
  iframe {
    width: 100%;
    height: 500px;
    border: none;
  }
`;