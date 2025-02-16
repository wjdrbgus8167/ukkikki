import React, { useContext } from "react";
import TravelPlanContext from "../../../contexts/travelPlanContext";

const OngoingProposals = () => {
  const { proposals, error } = useContext(TravelPlanContext) || {};
  console.log('진행중인 목록:', proposals);

  if (error) {
    return <div>{error}</div>;
  }
  if (!proposals || proposals.length === 0) {
    return <div>여행 제안서가 없습니다.</div>;
  }

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl border-b-0">
            <h6 className="text-[40px] font-bold">제안 목록</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 text-[25px] tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      여행 제목
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 text-[25px] tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      경로
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 text-[25px] tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      기간
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 text-[25px] tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      상태
                    </th>
                    <th className="px-6 py-3 font-semibold text-center capitalize align-middle bg-transparent border-b border-gray-200 text-[25px] tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      참여자 수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proposals && proposals.length > 0 ? (
                    proposals.map((proposal) => {
                      // 상태에 따른 배경색 클래스 설정
                      const statusClass =
                        proposal.planningStatus === 'BIDDING' ? 'bg-green-500' : 'bg-gray-500';

                        return (
                          <tr key={proposal.travelPlanId}>
                            {/* 여행 제목 */}
                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-[18px] font-semibold">{proposal.name}</span>
                              </div>
                            </td>
                            {/* 경로 */}
                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                              <div className="text-[18px]">
                                {proposal.departureCity.name} ➡ {proposal.arrivalCity.name} 
                              </div>
                            </td>
                            {/* 기간 */}
                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap">
                              <span className="text-[15px] font-semibold">
                                {proposal.startDate} ~ {proposal.endDate}
                              </span>
                            </td>
                            {/* 상태 */}
                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-[15px] font-bold uppercase rounded ${statusClass} text-white`}
                              >
                                {proposal.planningStatus}
                              </span>
                            </td>
                            {/* 참여자 수 */}
                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap">
                              <span className="text-[15px] font-semibold">{proposal.currentParticipants}</span>
                            </td>
                          </tr>
                        );
                        
                    })
                  ) : (
                    <tr>
                      <td className="p-2 text-center" colSpan="5">
                        참여 중인 여행이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingProposals;
