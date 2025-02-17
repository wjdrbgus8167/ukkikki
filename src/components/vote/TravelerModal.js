import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// 접근성 관련 설정 (앱의 루트 엘리먼트를 지정)
Modal.setAppElement('#root');

const TravelerModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    koreanName: '',
    englishName: '',
    passportNumber: '',
    expirationDate: '',
    birthDate: '',
    phoneNumber: '',
  });

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 시 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/v1/travel-plans/3/proposals/5/travelers',
        formData,
      );
      console.log('예약금 전송 성공:', response.data);
      onRequestClose(); // 모달 닫기
    } catch (error) {
      console.error('예약금 전송 실패:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="여행자 정보 입력"
      style={{
        content: {
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
        },
      }}
    >
      <h2>예약금 보내기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름 (한국어):</label>
          <input
            type="text"
            name="koreanName"
            value={formData.koreanName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이름 (영어):</label>
          <input
            type="text"
            name="englishName"
            value={formData.englishName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>여권 번호:</label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>여권 만료일:</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>생년월일:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>전화번호:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">예약금 보내기</button>
          <button
            type="button"
            onClick={onRequestClose}
            style={{ marginLeft: '10px' }}
          >
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TravelerModal;
