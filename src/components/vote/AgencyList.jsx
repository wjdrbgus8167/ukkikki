import React from 'react';
import AgencyCard from './AgencyCard';

const AgencyList = ({ agencies, onVote, onDetail }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {agencies.map(
        (agency) => (
          console.log('agency', agency),
          (
            <AgencyCard
              key={agency.proposalId} // proposalId를 key로 사용
              agency={agency}
              onVote={onVote}
              onDetail={onDetail}
            />
          )
        ),
      )}
    </div>
  );
};

export default AgencyList;
