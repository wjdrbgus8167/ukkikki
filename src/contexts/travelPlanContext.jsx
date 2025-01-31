import React, { createContext, useEffect, useState } from "react";
import { fetchProposals } from "../apis/travel";

const TravelPlanContext = createContext();

export const TravelPlanProvider = ({children, jwtToken}) => {

  const [proposals, setProposals] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //여행 제안서 목록 가져오기
  useEffect(() => {
    const getProposals = async() => {
      // setLoading(true);
      setError(null);

      try{
        const data = await fetchProposals(jwtToken);
        setProposals(data);
      } catch(error) {
        setError('여행 계획을 불러오는 데 실패했습니다.');
        console.error(error);
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    if(jwtToken) {
      getProposals();
    }
  }, [jwtToken])


  return (
    <TravelPlanContext.Provider value={{ proposals, error}}>
      {children}
    </TravelPlanContext.Provider>
  );
};

export default TravelPlanContext;