const ProposalDetailInfo = ({ proposal, formatDateTime }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">제안 상세 정보</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold">항공사</h3>
          <p>{proposal.airLine}</p>
        </div>
        <div>
          <h3 className="font-bold">출국 공항</h3>
          <p>{proposal.departureAirport}</p>
        </div>
        <div>
          <h3 className="font-bold">도착 공항</h3>
          <p>{proposal.arrivalAirport}</p>
        </div>
        <div>
          <h3 className="font-bold">출발 탑승 및 도착 시간</h3>
          <p>탑승: {formatDateTime(proposal.startDateBoardingTime)}</p>
          <p>도착: {formatDateTime(proposal.startDateArrivalTime)}</p>
        </div>
        <div>
          <h3 className="font-bold">귀국 탑승 및 도착 시간</h3>
          <p>탑승: {formatDateTime(proposal.endDateBoardingTime)}</p>
          <p>도착: {formatDateTime(proposal.endDateArrivalTime)}</p>
        </div>
        <div>
          <h3 className="font-bold">여행자 보험</h3>
          <p>{proposal.insuranceIncluded ? '포함' : '미포함'}</p>
        </div>
        <div>
          <h3 className="font-bold">가이드 포함 여부</h3>
          <p>{proposal.guideIncluded ? '포함' : '미포함'}</p>
        </div>
        <div>
          <h3 className="font-bold">취소/환불 정책</h3>
          <p>{proposal.refundPolicy}</p>
        </div>
        <div>
          <h3 className="font-bold">제품 정보</h3>
          <p>{proposal.productInformation}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailInfo;
