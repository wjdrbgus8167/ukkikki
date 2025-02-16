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
    return response.data.data;

  } catch(error) {
      console.log('Error:', error.message);
  };
};

export const AgencyProposalListDetail = async(proposalId)=>{
  try{
      const response = await publicRequest.get(`api/v1/proposals/${proposalId}`);
      console.log(`제안서 세부 내용 조회 `,response.data)
      return response.data
  }catch(error){
    console.log(`Error`,error)
  }
};

//여행계획 세부 조회

export const AgencyProposalDetail =  async(travelPlanId) => {
  try{
    const response = await publicRequest.get(`api/v1/travel-plans/${travelPlanId}`);
    console.log('여행계획 세부 조회 response.data:',response.data)
    return response.data;
  } catch(error) {
    console.log('Error:', error)
  };
};

//여행계획 제안서 (상세내용)

export const CreateTravelProposal = async(travelPlanId) => {
  try {
    const response = await publicRequest.get(`api/v1/travel-plans/${travelPlanId}/proposals`);
    console.log('여행 게획 제안서 보내기 성공:', response.data)
    return response.data;
  } catch(error) {
    console.log('error:',error)
  };
};