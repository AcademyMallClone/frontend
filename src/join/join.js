import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './join.scss';

const Join = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'ROLE_USER' // 기본 권한 설정
  });

  // 에러 메시지를 처리하기 위한 상태 변수
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // 입력값 처리
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios를 통해 Spring Boot API로 POST 요청
      await axios.post('/api/auth/join', user);
      alert('회원가입 완료');
      navigate('/'); // 회원가입 후 메인 페이지로 이동
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // 이메일 중복으로 인한 실패 처리
        setErrorMessage("이미 가입된 이메일입니다.");
      } else {
        // 그 외의 에러 처리
        setErrorMessage("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <div className="join-container">
      <h3>회원가입</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          value={user.username}
          placeholder="이름"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          value={user.email}
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          value={user.password}
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="phone"
          value={user.phone}
          placeholder="전화번호"
          onChange={handleChange}
        />
        <input
          type="text"
          id="address"
          value={user.address}
          placeholder="주소"
          onChange={handleChange}
        />
        <span>권한설정</span>
        <select
          className="form-select form-select-sm" // class 대신 className 사용
          id="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="ROLE_USER">사용자</option>
          <option value="ROLE_ADMIN">관리자</option>
        </select>
        <button type="submit">회원가입</button>
      </form>
      {/* 에러 메시지 출력 */}
      {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Join;
