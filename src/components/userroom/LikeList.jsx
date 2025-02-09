import React, { useState, useMemo } from 'react';

const LikeList = ({ wishlists }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // 좋아요 순으로 정렬된 리스트
  const sortedWishlists = useMemo(() => {
    return [...wishlists].sort((a, b) => b.likes - a.likes); // 좋아요 내림차순 정렬
  }, [wishlists]);

  // 순위에 따른 색상 스타일
  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return 'text-gold font-bold'; // 1등: 금색
      case 2:
        return 'text-silver font-bold'; // 2등: 은색
      case 3:
        return 'text-bronze font-bold'; // 3등: 동색
      default:
        return 'text-gray-700'; // 기타 순위
    }
  };

  // 항목 클릭 핸들러
  const handleItemClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleLikeButtonClick = async (place) => {
    if (!place || !selectedCard || !selectedCard.id) {
      console.error('🚨 장소 정보 또는 여행방 ID가 없습니다.');
      return;
    }

    const travelPlanId = selectedCard.id;
    const placeId = place.id;

    try {
      await axios.post(
        `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
      );

      // ✅ 좋아요 개수 업데이트
      setFavorites((prev) =>
        prev.map((fav) =>
          fav.id === placeId ? { ...fav, likes: fav.likes + 1 } : fav,
        ),
      );

      console.log('✅ 좋아요 증가 성공:', place);
    } catch (error) {
      console.error('🚨 좋아요 증가 실패:', error);
      alert('🚨 좋아요를 추가하는 중 오류가 발생했습니다.');
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
              <span className={`text-lg ${getRankStyle(index + 1)}`}>
                {index + 1}위
              </span>
              <h3 className="text-lg font-semibold text-gray-700">
                {item.name}
              </h3>
            </div>

            {/* 좋아요 버튼 */}
            <button
              className="px-2 py-1 text-sm text-red-500 bg-gray-200 rounded-md"
              onClick={() => handleLikeButtonClick(item)}
            >
              ❤️ {item.likes}
            </button>
          </div>

          {expandedIndex === index && (
            <div className="mt-2 text-gray-600">
              <p>
                <strong>주소:</strong> {item.address}
              </p>
              <p>
                <strong>위도:</strong> {item.latitude}
              </p>
              <p>
                <strong>경도:</strong> {item.longitude}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LikeList;
