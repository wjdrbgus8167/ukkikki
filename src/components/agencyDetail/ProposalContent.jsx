//제안서 디테일(계획)

// import React, { useContext } from "react";
// import ProposalDetailContext from "../../contexts/proposalDetailContext";

// const ProposalContent = () => {
//   const { proposal, totalCount } = useContext(ProposalDetailContext);

//   if(!proposal) {
//     return <div>제안서 불러오는 중,,</div>
//   }

//   return (
//     <div className="container">
//       <div className="travel-plan">
//         <h2 className="travel-title"> 여행타이틀: {proposal.data.travelPlan.name}</h2>
//         <p>출발: {proposal.travelPlan.departureCityName}</p>
//         <p>도착: {proposal.travelPlan.arrivalCityName}</p>
//         <p>여행 예상 날짜: {proposal.travelPlan.startDate} ~ {proposal.data.travelPlan.endDate}</p>
//         <p>테마:{proposal.travelPlan.keyword.join(",")}</p>
//         <p>총 참여인원: {totalCount}</p>
//         <p>내용: </p>
//       </div>

//       <div className="message">
//         <h3>메세지</h3>
//         <ul>
//           {proposal.messages.map((message, index) => (
//             <li key={index}>
//               <p>{message.content}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default ProposalContent;

import React from "react";

const ProposalContent = () => {
  return (
      <div className="travel-plan flex justify-start m-10 space-x-40">
        <span className="proposal-title font-['Pretendard'] text-[120px] text-[#412B2B] font-extrabold leading-[150px] text-center px-5">
            술친자들의
            <br />
            증류소 여행
          </span>
        <div className="proposal-content font-['Pretendard']  text-[30px] font-semibold leading-[50px]">
          <p>출발: 서울(인천)</p>
          <p>도착: 영국(스코틀랜드)</p>
          <p>여행 예상 날짜: 2025.03.10 ~ 2025.03.</p>
          <p>테마:</p>
          <p>총 참여인원: </p>
          <p>내용: </p>
        </div>
      </div>
  )
};
export default ProposalContent;