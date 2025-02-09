// 여행사 여행 관련 API
import { publicRequest } from '../hooks/requestMethod';


//여행 계획 제출 목록 조회(유저 제안)

export const UserProposalslist = async() => {
  try {
    const response = await publicRequest.get('api/v1/travel-plans/list');
    return response.data.data;

  } catch(error) {
    console.log(`Error: `, error.message)
    throw error;
  };
};

// 제안서 목록 조회

export const AgencyProposalslist = async() => {
  try{
    const response = await publicRequest.get('api/v1/proposals');
    console.log('response.data:',response.data)
    return response.data.dada;

  } catch(error) {
    if (error.response) {
      // 서버에서 반환한 오류 메시지 출력
      console.log('Error Response:', error.response.data);
      console.log('Error Message:', error.response.data.error.message);
    } else {
      // 네트워크 오류 등 다른 오류 처리
      console.log('Error:', error.message);
    }
  };
};

//여행계획 세부 조회

export const AgencyProposalDetail =  async(travelPlanId) => {
  try{
    const response = await publicRequest.get(`api/v1/travel-plans/${travelPlanId}`);
    return response.data;
  } catch(error) {
    console.log('Error:', error)
  };
};
