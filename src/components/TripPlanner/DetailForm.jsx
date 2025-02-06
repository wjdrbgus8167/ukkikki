// 상세 내용 

import React, { useState } from "react";
import KoreaAirportSelector from "../../services/airport/KoreaAirportSelector";

const DetailForm = () => {

    const [proposal, setProposal] = useState({
        startDate:'',
        endDate:'',
        airLine:'',
        departureAirportCode: '',
        departureAirportName: '',
        arrivalAirportCode: '',
        arrivalAirportName: '',
        startDateBoardingTime: '',
        startDateArrivalTime: '',
        endDateBoardingTime: '',
        endDateArrivalTime: '',
        deposit: '',
        minPeople: '',
        guideIncluded: '',
        productIntroduction: '',
        refundPolicy: '',
        insuranceIncluded: '',
        proposalStatus: 'V',
    });
    const [error, setError] = useState('');


    const handleChange = (e) => {
        setProposal({
            ...proposal,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="detail-form-container">
            <h1 className="detail-form-title
            font-extrabold text-lg
            ">여행 상세 내용</h1>

            <form action="">
                {/* 여행 시작일 */}
                <div className="mb-4">
                    <label 
                    htmlFor="startDate"
                    className="startDate"
                    >
                        여행시작일
                    </label>
                    <input 
                    id='startDate'
                    name="start-date"
                    type="date" 
                    value={proposal.startDate}
                    onChange={handleChange}
                    />
                </div>
                {/* 여행 종료일 */}
                <div className="mb-4">
                    <label 
                    htmlFor="endDate"
                    className="end-date"
                    >
                        여행 종료일
                    </label>
                    <input 
                    id='endDate'
                    name='endDate'
                    type="date" 
                    value={proposal.endDate}
                    onChange={handleChange}
                    />
                </div>
                {/* 항공사 */}
                <div>
                    <label htmlFor="airLine"
                    className="">항공사</label>
                    <input 
                    id='airLine'
                    name='airLine'
                    type="text" 
                    value={proposal.airLine}
                    onChange={handleChange}
                    className="airline-input border-gray-300"
                    />
                </div>
                {/* 출발일 탑승 일시 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="startDateBoardingTime">출발일 탑승일시</label>
                    <br />
                    <input 
                    id="startDateBoardingTime"
                    name="startDateBoardingTime"
                    type="datetime-local"
                    value={proposal.startDateBoardingTime}
                    onChange={handleChange}
                    className="start-boarding-time-input"
                    />
                </div>
                {/* 출발일 도착 일시시 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="startDateArrivalTime">출발일 도착 일시</label>
                    <br />
                    <input 
                    id="startDateArrivalTime"
                    name="startDateArrivalTime"
                    type="datetime-local"
                    value={proposal.startDateArrivalTime}
                    onChange={handleChange}
                    className="start-arrival-time-input"
                    />
                </div>
                {/* 도착일 탑승 일시 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="endDateBoardingTime">도착일 탑승 일시</label>
                    <input 
                    id="endDateBoardingTime"
                    name="endDateBoardingTime"
                    type="datetime-local"
                    value={proposal.endDateBoardingTime}
                    onChange={handleChange}
                    className="end-boarding-time-input"
                    />
                </div>
                {/* 도착일 도착 일시 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="endDateArrivalTime">도착일 도착 일시</label>
                    <input 
                    id="endDateArrivalTime"
                    name="endDateArrivalTime"
                    type="datetime-local"
                    value={proposal.endDateArrivalTime}
                    onChange={handleChange}
                    className="end-arrival-time-input"
                    />
                </div>
                {/* 예약금 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="deposit">예약금</label>
                    <input 
                    id="deposit"
                    name="deposit"
                    type="text"
                    value={proposal.deposit}
                    onChange={handleChange}
                    className="deposit-input"
                    />
                </div>
                {/* 최소 인원 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="minPeople">최소 인원</label>
                    <input 
                    id="minPeople"
                    name="minPeople"
                    type="number" 
                    min="1"
                    step="1"
                    value={proposal.minPeople}
                    onChange={handleChange}
                    className="minpeople-input"
                    />
                </div>
                {/* 가이드 유무 */}
                <div>
                    <label 
                    className="title text-xl font-bold"
                    htmlFor="guideIncluded">가이드 여부</label>
                    <input 
                    id="guideIncluded"
                    name="guideIncluded"
                    type="checkbox"
                    checked={proposal.guideIncluded}
                    onChange={(e)=>
                        setProposal((prev) => ({
                            ...prev,
                            guideIncluded: e.target.checked,
                        }))
                    }
                    className="guide-input"
                    />
                </div>  
                    {/* 여행자보험 포함 여부 */}
                <div>
                    <label htmlFor="insuranceIncluded">여행자 보험 포함 여부</label>
                    <input 
                    id="insuranceIncluded"
                    name="guideIncluded"
                    type="checkbox"
                    checked={proposal.insuranceIncluded} />
                </div>
                {/* 상품소개 */}
                <div>
                    <label htmlFor="productIntroduction">상품소개</label>
                    <input 
                    id="productIntroduction"
                    name="productIntroduction"
                    type="text"
                    value={proposal.productIntroduction}
                    onChange={handleChange}
                    className="producintrodution-input"
                    />
                </div>
                    {/* 취소/환불정책 */}
                <div>
                    <label htmlFor=""></label>
                </div>
            </form>

        </div>
    );
};
export default DetailForm;