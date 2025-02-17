// 제시 받은 제안 목록

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

const OngoingProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAgencyProposals = async () => {
      setError(null);
      try {
        const data = await AgencyProposalslist();
        console.log("API 응답 데이터:", data);
        setProposals(data);
      } catch (error) {
        setError("제안서를 불러오는 데 실패했습니다.");
        console.log("Error:", error);
      }
    };

    getAgencyProposals();
  }, []);

  const onhandleDetail = (proposalId) => {
    navigate(`/agency-proposal-detail/${proposalId}`)
  };
  return (
      <Container>
        <CardWrapper>
          <Card>
            <TitleWrapper>
              <Title>진행중인 목록</Title>
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
                  {proposals && proposals.length > 0 ? (
                    proposals.map((proposal) => {
                      return (
                        <TableRow key={proposal.proposalId} onClick={() => onhandleDetail(proposal.proposalId)}>
                          {/* 여행 제목 */}
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-[18px] font-semibold">{proposal.name}</span>
                            </div>
                          </TableCell>
                          {/* 경로 */}
                          <TableCell>
                            {proposal.departureAirportName} 
                              ➡ 
                            {proposal.arrivalAirportName}
                          </TableCell>
                          {/* 항공사 */}
                          <TableCell>{proposal.airline}</TableCell>
                          {/* 기간 */}
                          <TableCell>{proposal.startDate} ~ {proposal.endDate}</TableCell>
                          {/* 상태 */}
                          <TableCell>
                            <Status status={proposal.planningStatus}>
                              {proposal.planningStatus}
                            </Status>
                          </TableCell>
                          
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan="5">참여 중인 여행이 없습니다.</TableCell>
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
