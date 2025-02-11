//제안서 디테일
import React, { createContext, useEffect, useState } from "react";
import { AgencyProposalDetail } from "../apis/agency";

const ProposalDetailContext = createContext();

export const ProposalDetailProvider = ({children, travelPlanId}) => {
  const [proposal, setProposals ] = useState(null);

  useEffect(() => {
    const fetchProposalData = async() => {
      try {
        const data = await AgencyProposalDetail(travelPlanId);
        console.log('context:',data)
        setProposals(data);

      } catch(error) {
        console.log('error:', error);
      }
    };
    if (travelPlanId) {
      fetchProposalData();
    }
  },[travelPlanId]);

  return (
    <ProposalDetailContext.Provider value={{proposal}}>
      {children}
    </ProposalDetailContext.Provider>
  );
};

export default ProposalDetailContext;