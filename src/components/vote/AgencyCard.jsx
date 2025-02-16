import React from 'react';

const AgencyCard = ({ agency, onVote, onDetail }) => {
  const isSelected = agency.votedYn;

  return (
    <div className="flex flex-col items-center w-64 p-6 bg-white border rounded-lg shadow-md">
      <p className="mb-1 text-lg font-semibold">{agency.name}</p>
      <p className="mb-2 text-gray-700">금액: {agency.deposit}원</p>
      <p className="mb-2">투표수: {agency.voteCount}</p>

      <div className="flex mt-auto space-x-2">
        {/* 투표 버튼: 이미 투표한 경우에는 비활성화 */}
        <button
          onClick={() => onVote(agency)}
          disabled={agency.votedYn}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-xl transition-all
            ${
              agency.votedYn
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
