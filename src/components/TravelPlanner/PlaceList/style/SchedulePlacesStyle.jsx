import styled from "styled-components";


export const SelectedPlacesContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;

  .selected-place {
    width: 270px;
    height: 80px;
    padding: 10px;
    margin-left: 10px;
    border-radius: 10px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 10px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
    position: relative; /* 자식 요소에 절대 위치 설정을 위해 */
  }

  .index {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .time-input {
    position: absolute;
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between; /* input과 버튼을 양쪽에 배치 */
    align-items: center;
    z-index: 10;
    left: 0px;
  }

  .time-input-fields {
    padding-left: 5px;
    width: 220px; 
    height: 60px;
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  .btn {
    margin-left: auto; /* 버튼을 오른쪽으로 정렬 */
  }
`;


export const SelectedPlacesContent = styled.div`
  margin-left: 10px;
  max-width: 270px; 
  height: 90px;
  display: flex;
  align-items: center;
  justify-content:flex-start; 
  

  .place {
    font-size: 16px;
    flex-shrink: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px; /* 텍스트와 버튼 사이에 간격 추가 */
    
    max-width: ${(props) => (props.hasDuration ? "115px": "160px")};

    }

  .btns {
    position: absolute;
    right: 10px;
    display: flex; /* 버튼들을 수평으로 배치 */
    gap: 10px; 
    justify-content: flex-end; /* 버튼들을 오른쪽 끝으로 배치 */
  }

  .duration-text {
    background-color: #FFD21C;
    color: black;
    border-radius: 5px;
    font-size: 15px;
    padding: 5px;
    white-space: nowrap;
  }
  
`;