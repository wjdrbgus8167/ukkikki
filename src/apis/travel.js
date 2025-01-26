// 여행 관련 API

import { publicRequest } from '../hooks/requestMethod';

//여행 계획 제안서 목록 조회

export const fetchProposals = async(jwtToken) => {
  const response = await publicRequest.get('/proposals',{
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    }, 
  });

  return response.data;
};
