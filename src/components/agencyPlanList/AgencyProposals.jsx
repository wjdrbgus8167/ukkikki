import React, { useEffect, useState } from "react";
import ListCard from "../common/ListCard";
import { AgencyProposalslist } from "../../apis/agency";

const AgencyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAgencyProposals = async () => {
      setError(null);
      try {
        const data = await AgencyProposalslist();
        console.log("API 응답 데이터:", data);
        setProposals(data);
      } catch (error) {
        setError("제안서를 불러오는 데 실패했습니다.");
        console.log("Error:", error);
      }
    };

    getAgencyProposals();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {proposals && proposals.length > 0 ? (
        proposals.map((proposal) => (
          <ListCard 
            key={proposal.proposalId}
            trip_name={proposal.name}
            start_date={proposal.startDate}
            end_date={proposal.endDate}
            proposal={proposal}
            navigateType="travel"  // travel-proposal 경로로 이동
          />
        ))
      ) : (
        <p>제안서가 없습니다.</p>
      )}
    </div>
  );
};

export default AgencyProposals;
