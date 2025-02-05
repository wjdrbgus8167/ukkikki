import React from 'react';

const AgencyCard = ({ agency, selectedAgencyId, onVote, onDetail }) => {
  const isSelected = agency.id === selectedAgencyId;

  return (
    <div className="border p-6 rounded-lg shadow-md flex flex-col items-center w-64 bg-white">
      <p className="text-lg font-semibold mb-1">{agency.name}</p>
      <p className="text-gray-700 mb-2">금액: {agency.price}원</p>
      <p className="mb-2">투표수: {agency.votes}</p>

      <div className="mt-auto flex space-x-2">
        {/* 체크 버튼 (선택되면 파란색) */}
        <button
          onClick={() => onVote(agency.id)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-xl transition-all
            ${
              isSelected
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 hover:bg-gray-500'
            }
          `}
        >
          ✔
        </button>

        {/* 상세보기 버튼 */}
        <button
          onClick={() => onDetail(agency)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          상세보기
        </button>
      </div>
    </div>
  );
};

export default AgencyCard;
