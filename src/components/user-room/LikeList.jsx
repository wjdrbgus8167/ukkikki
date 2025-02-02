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

  return (
    <div className="space-y-4">
      {sortedWishlists.map((item, index) => {
        const rank = index + 1; // 순위 계산
        return (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:bg-gray-200"
            onClick={() => handleItemClick(index)}
          >
            {/* 리스트 항목 제목과 좋아요 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {/* 순위 표시 */}
                <span className={`text-lg ${getRankStyle(rank)}`}>{rank}위</span>
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              </div>
              <span className="text-sm text-gray-500">❤️ {item.likes}</span>
            </div>

            {/* 상세 정보 펼치기 */}
            {expandedIndex === index && (
              <div className="mt-2 text-gray-600 transition-all duration-300 overflow-hidden">
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
        );
      })}
    </div>
  );
};

export default LikeList;