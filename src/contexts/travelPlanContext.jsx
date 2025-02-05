import React, { createContext, useEffect, useState } from "react";
import { fetchUserProposals } from "../apis/agency";

const TravelPlanContext = createContext();

export const TravelPlanProvider = ({children, jwtToken}) => {

  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);

  //여행 제안서 목록 가져오기
  useEffect(() => {
    const getUserProposals = async() => {
      setError(null);

      try{
        const data = await fetchUserProposals(jwtToken);
        setProposals(data);
      } catch(error) {
        setError('사용자 제안 목록을 불러오는 데 실패했습니다.');
        console.error(error);
      } 
    };

    if(jwtToken) {
      getUserProposals();
    }
  }, [jwtToken])


  return (
    <TravelPlanContext.Provider value={{ proposals, error}}>
      {children}
    </TravelPlanContext.Provider>
  );
};

export default TravelPlanContext;