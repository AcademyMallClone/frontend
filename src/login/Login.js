import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import "./login.scss"

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 로그인 유효성 검증
    if (email === 'test@test.com' && password === 'password') {
      alert('로그인 성공!');
      navigate('/');  // 로그인 성공 시 메인 페이지로 이동
    } else {
      alert('로그인 실패! 이메일과 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-group">
          <label htmlFor="email">이메일</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="login-group">
          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className='lb' type="submit">로그인</button>
      </form>
        <button className='signup'>
          <NavLink to="/join">회원가입</NavLink>
        </button>
    </div>
  );
};

export default Login;
