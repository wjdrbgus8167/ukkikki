// 여행 관련 API

import { publicRequest } from '../hooks/requestMethod';

//여행 계획 제출 목록 조회

export const fetchProposals = async(jwtToken) => {
  try {
    const response = await publicRequest.get('/travel-plans/list',{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      }, 
    });
    return response.data;

  } catch(error) {
    console.error(`Error: `, error)
    throw error;
  };
};

//