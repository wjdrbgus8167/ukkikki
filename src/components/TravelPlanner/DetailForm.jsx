import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  DetailFormContainer,
  Table,
  TableHeadCell,
} from './style/DetailFormStyle';

const DetailForm = ({ proposalData, setProposalData }) => {
  const handleChange = (e) => {
    setProposalData({
      ...proposalData,
      [e.target.name]: e.target.value,
    });
  };

  const getDateValue = (field) => {
    return proposalData[field] ? new Date(proposalData[field]) : null;
  };

  const handleDateChange = (field) => (date) => {
    let formattedValue = '';
    if (date) {
      if (field === 'startDate' || field === 'endDate') {
        formattedValue = date.toISOString().split('T')[0];
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
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await publicRequest.get('/api/v1/geography/airports');
        if (response.status === 200 && response.data.data) {
          setAirports(response.data.data);
        }
      } catch (error) {
        console.error('공항 목록 불러오기 실패:', error);
      }
    };
    fetchAirports();
  }, []);

  const filteredDepartureAirports = airports.filter((airport) =>
    airport.name.toLowerCase().includes(departureQuery.toLowerCase()),
  );
  const filteredArrivalAirports = airports.filter((airport) =>
    airport.name.toLowerCase().includes(arrivalQuery.toLowerCase()),
  );

  const handleSelectDepartureAirport = (airport) => {
    setProposalData((prev) => ({
      ...prev,
      departureAirportName: airport.name,
      departureAirportCode: airport.airportCode,
    }));
    setDepartureQuery(airport.name);
    setShowDepartureSuggestions(false);
  };

  const handleSelectArrivalAirport = (airport) => {
    setProposalData((prev) => ({
      ...prev,
      arrivalAirportName: airport.name,
      arrivalAirportCode: airport.airportCode,
    }));
    setArrivalQuery(airport.name);
    setShowArrivalSuggestions(false);
  };
  return (
    <DetailFormContainer>
      <h1 className="detail-form-title text-[50px] text-center pt-3">
        여행 상세 내용
      </h1>
      <hr className="custom-hr" />

      <form action="">
        <Table>
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
                    selected={getDateValue('startDate')}
                    onChange={handleDateChange('startDate')}
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
                    selected={getDateValue('endDate')}
                    onChange={handleDateChange('endDate')}
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
              <td>출발 공항 선택</td>
              <td>
                <div style={{ position: 'relative' }}>
                  <input
                    id="departureAirportName"
                    name="departureAirportName"
                    type="text"
                    placeholder="출발 공항 검색"
                    value={departureQuery}
                    onChange={(e) => {
                      setDepartureQuery(e.target.value);
                      setShowDepartureSuggestions(true);
                      setProposalData((prev) => ({
                        ...prev,
                        departureAirportName: e.target.value,
                        departureAirportCode: '',
                      }));
                    }}
                    onFocus={() => setShowDepartureSuggestions(true)}
                    autoComplete="off"
                  />
                  {showDepartureSuggestions && departureQuery && (
                    <ul
                      style={{
                        position: 'absolute',
                        zIndex: 1000,
                        background: 'white',
                        width: '100%',
                        border: '1px solid #ccc',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        marginTop: '2px',
                        padding: '0',
                        listStyle: 'none',
                      }}
                    >
                      {filteredDepartureAirports.map((airport) => (
                        <li
                          key={airport.airportCode}
                          onClick={() => handleSelectDepartureAirport(airport)}
                          style={{
                            padding: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          {airport.name} ({airport.airportCode})
                        </li>
                      ))}
                      {filteredDepartureAirports.length === 0 && (
                        <li style={{ padding: '8px' }}>검색 결과 없음</li>
                      )}
                    </ul>
                  )}
                </div>
              </td>
            </tr>

            {/* 공항 정보 - 도착 */}
            <tr>
              <td>도착 공항 선택</td>
              <td>
                <div style={{ position: 'relative' }}>
                  <input
                    id="arrivalAirportName"
                    name="arrivalAirportName"
                    type="text"
                    placeholder="도착 공항 검색"
                    value={arrivalQuery}
                    onChange={(e) => {
                      setArrivalQuery(e.target.value);
                      setShowArrivalSuggestions(true);
                      setProposalData((prev) => ({
                        ...prev,
                        arrivalAirportName: e.target.value,
                        arrivalAirportCode: '',
                      }));
                    }}
                    onFocus={() => setShowArrivalSuggestions(true)}
                    autoComplete="off"
                  />
                  {showArrivalSuggestions && arrivalQuery && (
                    <ul
                      style={{
                        position: 'absolute',
                        zIndex: 1000,
                        background: 'white',
                        width: '100%',
                        border: '1px solid #ccc',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        marginTop: '2px',
                        padding: '0',
                        listStyle: 'none',
                      }}
                    >
                      {filteredArrivalAirports.map((airport) => (
                        <li
                          key={airport.airportCode}
                          onClick={() => handleSelectArrivalAirport(airport)}
                          style={{
                            padding: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          {airport.name} ({airport.airportCode})
                        </li>
                      ))}
                      {filteredArrivalAirports.length === 0 && (
                        <li style={{ padding: '8px' }}>검색 결과 없음</li>
                      )}
                    </ul>
                  )}
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
                    setProposalData((prev) => ({
                      ...prev,
                      deposit: value ? parseFloat(value) : 0,
                    }))
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
