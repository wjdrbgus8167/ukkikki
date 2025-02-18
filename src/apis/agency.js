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

//제안서 세부내용 (지우기)
export const AgencyProposalListDetail = async(proposalId, travelPlanId)=>{
  try{
      const response = await publicRequest.get(`api/v1/travel-plans/${travelPlanId}/proposals/${proposalId}`);
      console.log(`제안서 세부 내용 조회 `,response.data)
      return response.data
  }catch(error){
    console.log(`Error`,error)
  }
};

//제안서 세부내용 
export const ProposalDetail = async(proposalId, travelPlanId)=>{
  try{
      const response = await publicRequest.get(`api/v1/travel-plans/${travelPlanId}/proposals/${proposalId}`);
      console.log(`제안서 세부 내용 조회 `,response.data)
      return response.data
  }catch(error){
    console.log(`Error`,error)
  }
};

//여행계획 세부 조회

export const TravelPlanDetail =  async(travelPlanId) => {
  try{
    const response = await publicRequest.get(`api/v1/travel-plans/${travelPlanId}`);
    console.log('여행계획 세부 조회 response.data:',response.data)
    return response.data;
  } catch(error) {
    console.log('Error:', error)
  };
};

//여행계획 제안서보내기 (상세내용)

export const CreateTravelProposal = async(travelPlanId, payload) => {
  try {
    const response = await publicRequest.post(`api/v1/travel-plans/${travelPlanId}/proposals`, payload );
    console.log('여행 계획 제안서 보내기 성공:', response.data)
    return response.data;
  } catch(error) {
    console.log('error:',error)
  };
};

//여행 계획 제안서 수정
export const UpdateTravelProposal = async(travelPlanId,proposalId, payload) => {
  try {
    const response = await publicRequest.put(`api/v1/travel-plans/${travelPlanId}/proposals/${proposalId}`, payload);
    console.log('여행 제안서 수정 완료:', response.data)
    return response.data;
  } catch(error) {
    console.log(' 여행 제안서 수정 실패:', error)
  };
};

//확정된 제안서의 여권 조회
export const getPassport = async(proposalId) => {
  try {
    const response = await publicRequest.get(`api/v1/proposals/${proposalId}/passports`);
    console.log(' 확정된 제안서의 여권 조회:', response.data)
    return response.data;
  } catch(error) {
    console.log('error:',error)
  };
};

