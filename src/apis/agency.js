// 여행사 여행 관련 API
import { publicRequest } from '../hooks/requestMethod';


//여행 계획 제출 목록 조회(유저 제안)

export const UserProposalslist = async() => {
  try {
    const response = await publicRequest.get('/travel-plans/list');
    return response.data.data;

  } catch(error) {
    console.log(`Error: `, error.message)
    throw error;
  };
};

// 제안서 목록 조회

export const fetchAgencyProposals = async() => {
  try{
    const response = await publicRequest.get('/proposals');
    return response.data.proposals;

  } catch(error) {
    console.log('Error', error)
  };
};

//여행계획 세부 조회

export const AgencyProposalDetail =  async(jwtToken,travelPlanId) => {
  try{
    const response = await publicRequest.get(`/travel-plans/${travelPlanId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch(error) {
    console.log('Error:', error)
  };
};
