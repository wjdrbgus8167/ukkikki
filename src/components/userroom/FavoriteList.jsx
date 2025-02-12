import { useState, useEffect, useMemo } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import useAuthStore from '../../stores/authStore';
import Swal from 'sweetalert2';

const FavoriteList = ({ selectedCard }) => {
  const { user } = useAuthStore(); // 현재 로그인한 유저 정보
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (selectedCard && selectedCard.places) {
      // ✅ 백엔드에서 isLiked 값을 보내주지 않는 경우, 프론트에서 처리
      const updatedPlaces = selectedCard.places.map((place) => ({
        ...place,
        isLiked: place.likedUsers?.includes(user?.id) || false, // 유저가 좋아요했는지 체크
      }));
      setFavorites(updatedPlaces);
    }
  }, [selectedCard, user]);

  // ✅ 좋아요 순으로 정렬
  const sortedWishlists = useMemo(() => {
    return [...favorites].sort((a, b) => b.likeCount - a.likeCount);
  }, [favorites]);

  // ✅ 좋아요 토글 핸들러 (중복 실행 방지)
  const handleLikeToggle = async (place) => {
    const travelPlanId = selectedCard.travelPlanId;
    const placeId = place.placeId;
    const isLiked = place.isLiked; // 현재 좋아요 상태

    try {
      if (!isLiked) {
        // ✅ 좋아요 추가 요청 (POST)
        const response = await publicRequest.post(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );

        if (response.status === 200) {
          setFavorites((prev) =>
            prev.map((fav) =>
              fav.placeId === placeId
                ? { ...fav, likeCount: fav.likeCount + 1, isLiked: true }
                : fav,
            ),
          );
        }
      } else {
        // ✅ 좋아요 취소 요청 (DELETE)
        const response = await publicRequest.delete(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );

        if (response.status === 200) {
          setFavorites((prev) =>
            prev.map((fav) =>
              fav.placeId === placeId
                ? { ...fav, likeCount: fav.likeCount - 1, isLiked: false }
                : fav,
            ),
          );
        }
      }
    } catch (error) {
      console.error('🚨 좋아요 처리 실패:', error);
      Swal.fire('알림', '🚨 좋아요 처리 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {sortedWishlists.map((item, index) => (
        <div
          key={index}
          className="p-4 transition-all duration-300 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-700">
                {index + 1}. {item.name}
              </h3>
            </div>

            {/* 좋아요 버튼 */}
            <button
              className={`px-2 py-1 text-sm rounded-md ${
                item.isLiked
                  ? 'text-red-500 bg-gray-300'
                  : 'text-gray-500 bg-gray-200'
              }`}
              onClick={() => handleLikeToggle(item)}
            >
              {item.isLiked ? '❤️' : '🤍'} {item.likeCount}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
