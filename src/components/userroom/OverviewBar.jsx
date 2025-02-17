import React, { useState, useEffect } from 'react';
import ProposalButton from './ProposalButton';
import { STATUS_MAP, THEME_COLORS, STATUS_STYLES } from '../../constants';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

const getThemeColor = (theme) => THEME_COLORS[theme] || 'bg-gray-500 text-white';

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
    <div className="flex flex-wrap items-center justify-between p-4 bg-gray-100/50 rounded-lg shadow-md">
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_STYLES[planningStatus] || 'bg-gray-400 text-white'}`}>
        {STATUS_MAP[planningStatus] || '알 수 없음'}
      </span>

      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-700">{arrivalCity.name || '도시 정보 없음'}</p>

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span key={index} className={`px-3 py-1 rounded-full text-sm font-semibold ${getThemeColor(keyword.name)}`}>
              {keyword.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-right text-gray-700">
        {startDate} ~ {endDate}
      </p>

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
