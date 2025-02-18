import React, { useEffect, useState } from "react";
import { AgencyProposalslist } from "../../../apis/agency";
import { useNavigate } from "react-router";
import { 
  Container, 
  CardWrapper, 
  Card, 
  TitleWrapper, 
  Title, 
  TableWrapper, 
  Table, 
  TableHead, 
  TableHeadRow, 
  TableHeadCell, 
  TableBody, 
  TableRow, 
  TableCell, 
  Status 
} from "./style/OngoingProposalsStyle";
import { STATUS_PROPOSAL } from "../../../constants";

// 필터 옵션 배열 정의
const FILTER_OPTIONS = [
  { label: "전체보기", status: "" },
  { label: STATUS_PROPOSAL.D, status: "D" },
  { label: STATUS_PROPOSAL.A, status: "A" },
  { label: STATUS_PROPOSAL.W, status: "W" },
  { label: STATUS_PROPOSAL.V, status: "V" },
];

const OngoingProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);

  useEffect(() => {
    const getAgencyProposals = async () => {
      setError(null);
      try {
        const data = await AgencyProposalslist();
        console.log(" 진행중인 목록 API 응답 데이터:", data);
        setProposals(data);
      } catch (error) {
        setError("제안서를 불러오는 데 실패했습니다.");
        console.log("Error:", error);
      }
    };

    getAgencyProposals();
  }, []);

  const onhandleDetail = (proposal) => {
    navigate(`/agency-proposal-detail/${proposal.travelPlanId}/${proposal.proposalId}`);
  };
  

  const statusMapping = {
    D: "거절",
    A: "수락",
    W: "투표전",
    V: "투표중"
  };

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
  };

  // 선택한 필터에 따라 제안 목록 필터링 (전체보기일 경우 전체 목록)
  const filteredProposals = selectedFilter.status
    ? proposals.filter(
        (proposal) => proposal.proposalStatus === selectedFilter.status
      )
    : proposals;

  return (
    <Container>
      <CardWrapper>
        <Card>
          <TitleWrapper>
            <div className="flex items-center justify-center space-x-8 mb-8">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleFilterChange(option)}
                  className={`relative py-2 text-sm font-medium transition-colors  ${
                    selectedFilter.label === option.label
                      ? "text-brown"
                      : "text-gray-500 hover:text-brown"
                  }`}
                >
                  {option.label}
                  {selectedFilter.label === option.label && (
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-brown"></div>
                  )}
                </button>
              ))}
            </div>
          </TitleWrapper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>여행 제목</TableHeadCell>
                  <TableHeadCell>경로</TableHeadCell>
                  <TableHeadCell>항공사</TableHeadCell>
                  <TableHeadCell>기간</TableHeadCell>
                  <TableHeadCell>상태</TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {filteredProposals && filteredProposals.length > 0 ? (
                  filteredProposals.map((proposal) => (
                    <TableRow
                      key={proposal.proposalId}
                      onClick={() => onhandleDetail(proposal)}
                    >
                      {/* 여행 제목 */}
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-[18px] font-semibold">
                            {proposal.name}
                          </span>
                        </div>
                      </TableCell>
                      {/* 경로 */}
                      <TableCell>
                        {proposal.departureAirportName} ➡ {proposal.arrivalAirportName}
                      </TableCell>
                      {/* 항공사 */}
                      <TableCell>{proposal.airline}</TableCell>
                      {/* 기간 */}
                      <TableCell>
                        {proposal.startDate} ~ {proposal.endDate}
                      </TableCell>
                      {/* 상태 */}
                      <TableCell>
                        <Status status={proposal.proposalStatus}>
                          {statusMapping[proposal.proposalStatus] ||
                            proposal.proposalStatus}
                        </Status>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5">
                      {selectedFilter.status
                        ? "해당 상태의 제안이 없습니다."
                        : "참여 중인 여행이 없습니다."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableWrapper>
        </Card>
      </CardWrapper>
    </Container>
  );
};

export default OngoingProposals;
