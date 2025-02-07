// 상세 내용 

import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DetailFormContainer,TravelWrapper, TravelTitle,FlexWrapper,InputWrapper} from "./style/DetailFormStyle";



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
    //Date객체로 변환하기 위한 함수
    const getDateValue = (field) => {
        return proposal[field] ? new Date(proposal[field]) : null
    }
    
      // 필드명을 인자로 받아 해당 필드의 값만 업데이트하는 핸들러 함수
    const handleDateChange = (field) => (date) => {
        let formattedValue = "";
        if (date) {
        // startDate, endDate는 날짜 형식만 적용
            if (field === "startDate" || field === "endDate") {
                formattedValue = date.toISOString().split("T")[0];
            } else {
                // 나머지 필드는 날짜와 시간 형식을 적용
                formattedValue = format(date, "yyyy-MM-dd'T'HH:mm");
            }
        }
        setProposal((prev) => ({
        ...prev,
        [field]: formattedValue,
        }));
    };


    return (
        <DetailFormContainer>
            <h1 className="detail-form-title
            text-[80px] text-center pt-3
            ">여행 상세 내용</h1>
            <hr className="custom-hr"/>

            <div className="content-container">
                
            <form action="">
                {/* 여행 시작일 */}
                <div className="flex items-center mb-4 space-x-10">
                    <TravelTitle>여행 일정</TravelTitle>
                    <FlexWrapper>                                   
                        <InputWrapper>
                            <label htmlFor="startDate" className="startDate text-a">시작일</label>
                            <DatePicker
                                id="startDate"
                                selected={getDateValue("startDate")}
                                onChange={handleDateChange("startDate")}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date()}
                                locale={ko}
                                className="startdate-input text-center"
                                placeholderText="yyyy/MM/dd"
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <label htmlFor="endDate" className="end-date">종료일</label>
                            <DatePicker
                                id="endDate"
                                selected={getDateValue("endDate")}
                                onChange={handleDateChange("endDate")}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date()}
                                locale={ko}
                                className="enddate-input text-center"
                                placeholderText="yyyy/MM/dd"
                            />
                        </InputWrapper>
                    </FlexWrapper>
                </div>
                
                
                {/* 항공사 */}
                <div className="">
                <TravelWrapper>
                    <TravelTitle htmlFor="airLine">항공사</TravelTitle>
                    <input 
                    id='airLine'
                    name='airLine'
                    type="text" 
                    value={proposal.airLine}
                    onChange={handleChange}
                    className="airline-input border border-gray-300"
                    />
                </TravelWrapper>

                </div>

                <div className=" flex items-center mb-4 space-x-10">
                    <TravelTitle>항공 일정</TravelTitle>
                    <div className="flex space-x-40 mb-4">
                        <div className="text-center border-[3px] border-gray-200 rounded-lg">
                            {/* 출발일 탑승 일시 */}
                            <div>
                                <label 
                                className="title"
                                htmlFor="startDateBoardingTime">출발일 탑승일시</label>
                                <br />
                                <DatePicker
                                id="startDateBoardingTime"
                                selected={getDateValue("startDateBoardingTime")}
                                onChange={handleDateChange("startDateBoardingTime")}
                                showTimeInput
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="yyyy-MM-dd'T'HH:mm"
                                className="start-boarding-time text-center"
                                placeholderText="yyyy-MM-dd'T'HH:mm"

                                />
                            </div>
                                {/* 출발일 도착 일시 */}
                            <div>
                                <label 
                                className="title"
                                htmlFor="startDateArrivalTime">출발일 도착 일시</label>
                                <br />
                                <DatePicker
                                id="startDateArrivalTime"
                                selected={getDateValue("startDateArrivalTime")}
                                onChange={handleDateChange("startDateArrivalTime")}
                                showTimeInput
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="yyyy-MM-dd'T'HH:mm"
                                className="start-date-arrival-time text-center"
                                placeholderText="yyyy-MM-dd'T'HH:mm"
                                />
                            </div>
                        </div>
                        <div className="text-center border-[3px] border-gray-200 rounded-lg">
                                {/* 도착일 탑승 일시 */}
                            <div>
                                <label 
                                className="title"
                                htmlFor="endDateBoardingTime">도착일 탑승 일시</label>
                                <br />
                                <DatePicker
                                id="endDateBoardingTime"
                                selected={getDateValue("endDateBoardingTime")}
                                onChange={handleDateChange("endDateBoardingTime")}
                                showTimeInput
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="yyyy-MM-dd'T'HH:mm"
                                className="end-date-boarding-time text-center"
                                placeholderText="yyyy-MM-dd'T'HH:mm"
                                />
                            </div>
                            {/* 도착일 도착 일시 */}
                            <div>
                                <label 
                                className="title"
                                htmlFor="endDateArrivalTime">도착일 도착 일시</label>
                                <br />
                                <DatePicker
                                id="endDateArrivalTime"
                                selected={getDateValue("endDateArrivalTime")}
                                onChange={handleDateChange("endDateArrivalTime")}
                                showTimeInput
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="yyyy-MM-dd'T'HH:mm"
                                className="end-date-arrival-time text-center"
                                placeholderText="yyyy-MM-dd'T'HH:mm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                
                {/* 예약금 */}
                <div>
                    <TravelTitle htmlFor="deposit">예약금</TravelTitle>
                    <CurrencyInput 
                        id="deposit"
                        name="deposit"
                        placeholder="예약금을 입력하세요"
                        defaultValue={proposal.deposit}
                        decimalScale={2}
                        prefix="₩"
                        onValueChange={(value) =>
                            setProposal((prev) => ({ ...prev, deposit: value }))
                          }
                        className="deposit-input"
                    />
                </div>
                {/* 최소 인원 */}
                <div>
                    <TravelTitle htmlFor="minPeople">최소인원</TravelTitle>
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
                    <TravelTitle htmlFor="guideIncluded">가이드 여부</TravelTitle>
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
                    <TravelTitle htmlFor="insuranceIncluded">여행자 보험 포함 여부</TravelTitle>
                    <input 
                    id="insuranceIncluded"
                    name="guideIncluded"
                    type="checkbox"
                    checked={proposal.insuranceIncluded}
                    onChange={(e)=>
                        setProposal((prev) => ({
                            ...prev,
                            insuranceIncluded: e.target.checked,
                        }))
                    }
                    />
                </div>
                {/* 상품소개 */}
                <div>
                    <TravelTitle htmlFor="producintrodution">상품 소개</TravelTitle>
                    <br />
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
                    <TravelTitle htmlFor="refundPolicy">취소/ 환불정책</TravelTitle>
                    <br />
                    <input 
                    id="refundPolicy"
                    name="refundPolicy"
                    type="text"
                    value={proposal.refundPolicy}
                    onChange={handleChange}
                    className="refundpolicy-input "
                    />
                </div>
            </form>
            </div>
        
        </DetailFormContainer>
    );
};
export default DetailForm;