import React, { useState, useEffect } from 'react';
import ProposalButton from './ProposalButton';
import { STATUS_MAP, THEME_COLORS, STATUS_STYLES } from '../../constants';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

const getThemeColor = (theme) =>
  THEME_COLORS[theme] || 'bg-gray-500 text-white';

const OverviewBar = ({ selectedCard = {} }) => {
  const {
    planningStatus = 'unknown',
    name = '기본 이름',
    arrivalCity = {},
    keywords = [],
    startDate = '',
    endDate = '',
    travelPlanId,
    currentParticipants,
    minPeople,
  } = selectedCard;

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!arrivalCity.name) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${arrivalCity.name}&client_id=${apiKey}`,
        );
        const data = await response.json();
        setImageUrl(data?.urls?.regular || '');
      } catch (error) {
        console.error('이미지 불러오기 실패:', error);
      }
    };

    fetchImage();
  }, [arrivalCity.name]);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100/50 rounded-lg shadow-md">
      {/* 왼쪽 섹션: 제목 + (날짜, 도시, 상태, 키워드) */}
      <div className="flex flex-col gap-2">
        {/* 여행 이름 */}
        <h2 className="text-xl font-bold">{name}</h2>

        {/* 날짜, 도시, 상태, 키워드 등을 한 줄로 배치 */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 여행 일정 */}
          <p className="text-gray-700">
            {startDate} ~ {endDate}
          </p>

          {/* 도시 정보 */}
          {arrivalCity.name && (
            <p className="text-gray-700">{arrivalCity.name}</p>
          )}

          {/* 상태 배지 */}
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              STATUS_STYLES[planningStatus] || 'bg-gray-400 text-white'
            }`}
          >
            {STATUS_MAP[planningStatus] || '알 수 없음'}
          </span>

          {/* 키워드 */}
          {keywords.length > 0 &&
            keywords.map((keyword, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getThemeColor(
                  keyword.name,
                )}`}
              >
                {keyword.name}
              </span>
            ))}
        </div>
      </div>

      {/* 오른쪽 섹션: 여행사 제안하기 버튼 */}
      <ProposalButton
        selectedCard={selectedCard}
        travelPlanId={travelPlanId}
        currentParticipants={currentParticipants}
        minPeople={minPeople}
      />
    </div>
  );
};

export default OverviewBar;
