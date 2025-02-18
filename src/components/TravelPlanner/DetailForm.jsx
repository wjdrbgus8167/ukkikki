import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { 
    DetailFormContainer,
    Table,
    TableHeadCell,
} from "./style/DetailFormStyle";

const DetailForm = ({ proposalData, setProposalData }) => {

    const handleChange = (e) => {
        setProposalData({
            ...proposalData,
            [e.target.name]: e.target.value
        });
    };

    const getDateValue = (field) => {
        return proposalData[field] ? new Date(proposalData[field]) : null
    }

    const handleDateChange = (field) => (date) => {
        let formattedValue = "";
        if (date) {
            if (field === "startDate" || field === "endDate") {
                formattedValue = date.toISOString().split("T")[0];
            } else {
                formattedValue = format(date, "yyyy-MM-dd'T'HH:mm");
            }
        }
        setProposalData((prev) => ({
            ...prev,
            [field]: formattedValue,
        }));
    };

    const handleNumberChange = (e) => {
        setProposalData({
            ...proposalData,
            [e.target.name]: Number(e.target.value),
        });
    };

    return (
        <DetailFormContainer>
            <h1 className="detail-form-title text-[50px] text-center pt-3">여행 상세 내용</h1>
            <hr className="custom-hr" />

            <form action="">
                <Table >
                    <thead>
                        <tr>
                            <TableHeadCell>항목</TableHeadCell>
                            <TableHeadCell>내용</TableHeadCell>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 여행 이름 */}
                        <tr>
                            <td>여행 이름</td>
                            <td>
                                <input
                                    id="name"
                                    name="name"
                                    value={proposalData.name}
                                    onChange={handleChange}
                                    type="text"
                                />
                            </td>
                        </tr>

                        {/* 여행 일정 */}
                        <tr>
                            <td>여행 일정</td>
                            <td>
                                <div>
                                    <label htmlFor="startDate">시작일</label>
                                    <DatePicker
                                        id="startDate"
                                        selected={getDateValue("startDate")}
                                        onChange={handleDateChange("startDate")}
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date()}
                                        locale={ko}
                                        placeholderText="yyyy/MM/dd"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endDate">종료일</label>
                                    <DatePicker
                                        id="endDate"
                                        selected={getDateValue("endDate")}
                                        onChange={handleDateChange("endDate")}
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date()}
                                        locale={ko}
                                        placeholderText="yyyy/MM/dd"
                                    />
                                </div>
                            </td>
                        </tr>

                        {/* 항공사 */}
                        <tr>
                            <td>항공사</td>
                            <td>
                                <input
                                    id="airline"
                                    name="airline"
                                    type="text"
                                    value={proposalData.airline}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        {/* 공항 정보 */}
                        <tr>
                            <td>출발 공항 코드</td>
                            <td>
                                <input
                                    id="departureAirportCode"
                                    name="departureAirportCode"
                                    type="text"
                                    value={proposalData.departureAirportCode}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>출발 공항 이름</td>
                            <td>
                                <input
                                    id="departureAirportName"
                                    name="departureAirportName"
                                    type="text"
                                    value={proposalData.departureAirportName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>도착 공항 코드</td>
                            <td>
                                <input
                                    id="arrivalAirportCode"
                                    name="arrivalAirportCode"
                                    type="text"
                                    value={proposalData.arrivalAirportCode}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>도착 공항 이름</td>
                            <td>
                                <input
                                    id="arrivalAirportName"
                                    name="arrivalAirportName"
                                    type="text"
                                    value={proposalData.arrivalAirportName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                         {/* 항공편 */}
                         <tr>
                            <td>출발 항공</td>
                            <td>
                                <div>
                                    <label htmlFor="startDateBoardingTime">출발일 탑승 일시 </label>
                                    <DatePicker
                                        id="startDateBoardingTime"
                                        selected={getDateValue("startDateBoardingTime")}
                                        onChange={handleDateChange("startDateBoardingTime")}
                                        dateFormat="yyyy/MM/dd HH:mm"
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={1}
                                        minDate={new Date()}
                                        locale={ko}
                                        placeholderText="yyyy/MM/dd HH:mm"
                                        />
                                </div>
                                <div>
                                    <label htmlFor="startDateArrivalTime">출발일 도착 일시</label>
                                    <DatePicker
                                        id="startDateArrivalTime"
                                        selected={getDateValue("startDateArrivalTime")}
                                        onChange={handleDateChange("startDateArrivalTime")}
                                        dateFormat="yyyy/MM/dd HH:mm"
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={1}
                                        minDate={new Date()}
                                        locale={ko}
                                        placeholderText="yyyy/MM/dd HH:mm"
                                        />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>도착 항공</td>
                            <td>
                                <div>
                                    <label htmlFor="endDateBoardingTime">도착일 탑승 일시 </label>
                                    <DatePicker
                                        id="endDateBoardingTime"
                                        selected={getDateValue("endDateBoardingTime")}
                                        onChange={handleDateChange("endDateBoardingTime")}
                                        dateFormat="yyyy/MM/dd HH:mm"
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={1}
                                        minDate={new Date()}
                                        locale={ko}
                                        placeholderText="yyyy/MM/dd HH:mm"
                                        />
                                </div>
                                <div>
                                    <label htmlFor="endDateArrivalTime">출발일 도착 일시</label>
                                    <DatePicker
                                        id="endDateArrivalTime"
                                        selected={getDateValue("endDateArrivalTime")}
                                        onChange={handleDateChange("endDateArrivalTime")}
                                        dateFormat="yyyy/MM/dd HH:mm"
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={1}
                                        minDate={new Date()}
                                        locale={ko}
                                        placeholderText="yyyy/MM/dd HH:mm"
                                        />
                                </div>
                            </td>
                        </tr>
                        {/* 예약금 */}
                        <tr>
                            <td>예약금</td>
                            <td>
                                <CurrencyInput
                                    id="deposit"
                                    name="deposit"
                                    placeholder="예약금을 입력하세요"
                                    value={proposalData.deposit}
                                    decimalScale={2}
                                    prefix="₩"
                                    onValueChange={(value) =>
                                        setProposalData((prev) => ({ ...prev, deposit: value ? parseFloat(value) : 0 }))
                                    }
                                />
                            </td>
                        </tr>

                        {/* 최소 인원 */}
                        <tr>
                            <td>최소인원</td>
                            <td>
                                <input
                                    id="minPeople"
                                    name="minPeople"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={proposalData.minPeople}
                                    onChange={handleNumberChange}
                                />
                            </td>
                        </tr>

                        {/* 가이드 유무 */}
                        <tr>
                            <td>가이드 여부</td>
                            <td>
                                <input
                                    id="guideIncluded"
                                    name="guideIncluded"
                                    type="checkbox"
                                    checked={proposalData.guideIncluded}
                                    onChange={(e) =>
                                        setProposalData((prev) => ({
                                            ...prev,
                                            guideIncluded: e.target.checked,
                                        }))
                                    }
                                />
                            </td>
                        </tr>

                        {/* 여행자 보험 포함 여부 */}
                        <tr>
                            <td>여행자 보험 포함 여부</td>
                            <td>
                                <input
                                    id="insuranceIncluded"
                                    name="insuranceIncluded"
                                    type="checkbox"
                                    checked={proposalData.insuranceIncluded}
                                    onChange={(e) =>
                                        setProposalData((prev) => ({
                                            ...prev,
                                            insuranceIncluded: e.target.checked,
                                        }))
                                    }
                                />
                            </td>
                        </tr>

                        {/* 상품 소개 */}
                        <tr>
                            <td>상품 소개</td>
                            <td>
                                <input
                                    id="productIntroduction"
                                    name="productIntroduction"
                                    type="text"
                                    value={proposalData.productIntroduction}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        {/* 취소/환불정책 */}
                        <tr>
                            <td>취소/환불정책</td>
                            <td>
                                <input
                                    id="refundPolicy"
                                    name="refundPolicy"
                                    type="text"
                                    value={proposalData.refundPolicy}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </form>
        </DetailFormContainer>
    );
};

export default DetailForm;
