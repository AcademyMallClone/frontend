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
    address: ''
  });
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
      alert('회원가입 완료!');
      navigate('/'); // 회원가입 후 메인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Join;
