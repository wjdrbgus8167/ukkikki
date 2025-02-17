import styled from 'styled-components';
// 장소 리스트 컨테이너
export const PlaceContainer = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px; /* 장소들 사이의 간격 */
  cursor: pointer;
`;

// 각 장소 카드 스타일
export const PlaceCard = styled.div`
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 0px 10px;
  margin-bottom: 1rem;
  width: 400px;
  height: 100px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column; /* 수직으로 배치 */
  justify-content: flex-start; /* 수직 정렬 */
  align-items: flex-start; /* 수평 정렬 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
`;

// 장소 이름 스타일
export const PlaceName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  text-overflow: ellipsis; 
  
`;

// 좋아요 개수 스타일
export const LikeCount = styled.span`
  font-size: 1rem;
  color: #412B2B;
  margin-top: 5px;
  position: absolute; /* 절대 위치 */
  top: 5px; /* 카드 상단에서 10px 위치 */
  right: 10px; /* 카드 오른쪽에서 10px 위치 */
`;

// 태그 컨테이너
export const TagContainer = styled.div`
  padding-top: 5px;
  display: flex;
  flex-wrap: wrap; /* 태그가 너비를 초과하면 다음 줄로 이동 */
  gap: 5px; /* 각 태그 간의 간격 */
  position: relative;
  overflow: hidden;
`;

// 태그 스타일
export const PlaceTag = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #4f5b62;
  white-space: nowrap; 
  display: inline-block; /* 수평으로 나열되도록 */
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 100%;
`;

// 태그가 없을 때 메시지 스타일
export const NoTagsMessage = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
  margin-top: 5px;
  text-align: center;
`;
