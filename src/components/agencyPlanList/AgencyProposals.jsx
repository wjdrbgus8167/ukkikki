// 여행사가 진행중인 계획 목록

import React, { useEffect, useState } from "react";
import ListCard from "../common/ListCard";
import { fetchAgencyProposals } from "../../apis/agency";
import Cookies from "js-cookie";


const AgencyProposals = () => {

   
  const [proposals, setProposal ] = useState([]);
  const [error, setError] = useState(null);

  const jwtToken = Cookies.get('jwtToken');

  useEffect(() => {
    const getAgencyProposals = async() => {
        setError(null);
        
        try{
            const data = await fetchAgencyProposals(jwtToken);
            setProposal(data);
        } catch(error) {
            setError('제안서를 불러오는 데 실패했습니다.');
            console.log('Error:',error);
        }
    };

    getAgencyProposals();
  
    }, [jwtToken]);

    return(
        <div className="flex flex-wrap">
            {proposals && proposals.length > 0 ? (
                proposals.map((proposal) => (
                    <ListCard 
                        key = {proposal.proposalId}
                        trip_name = {proposal.travelPlanName}
                    />
                ))
            ) : (
              <p>제안서가 없습니다.</p>
            )}
          </div>
    );
};
export default AgencyProposals;