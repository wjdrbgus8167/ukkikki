import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5rem;
`;

export const CardWrapper = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.75rem;
  border: 2px solid #e5e5e5;
  overflow: hidden;
  width: 900px;
  margin-bottom: 1.5rem;
`;

export const CardImage = styled.img`
  width: 33.33%;
  object-fit: cover;
  border-radius: 0.75rem;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 66.67%;
`;

export const CardTitle = styled.h2`
  font-weight: bold;
  line-height: 1.25;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const CardText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

export const DetailButton = styled.button`
  margin-top: auto;
  margin-left: auto;
  background-color: #412b2b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5f3a3a;
  }
`;
