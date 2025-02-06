import React, { useState } from 'react';
import AgencyCard from './AgencyCard';

const AgencyList = ({ agencies, onVote, onDetail }) => {
  const [selectedAgencyId, setSelectedAgencyId] = useState(null);

  const handleVote = (id) => {
    setSelectedAgencyId((prevSelectedId) => {
      if (prevSelectedId === id) {
        // ✅ 같은 카드를 클릭하면 투표 취소
        onVote(id, false);
        return null;
      } else {
        // ✅ 다른 카드 선택 시 기존 투표 취소 후 새 투표
        if (prevSelectedId) onVote(prevSelectedId, false);
        onVote(id, true);
        return id;
      }
    });
  };

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {agencies.map((agency) => (
        <AgencyCard
          key={agency.id}
          agency={agency}
          selectedAgencyId={selectedAgencyId}
          onVote={handleVote}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
};

export default AgencyList;
