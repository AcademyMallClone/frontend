import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios'; // axios를 사용해 API 호출
import "./login.scss";

const Login = ({ setProfile }) => {  // setProfile을 props로 받음
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 로그인 API 호출
      const response = await axios.post('/api/auth/login', { email, password }, {withCredentials: true});

      if (response.status === 200) {
        // 로그인 성공 시 프로필 정보 가져오기
        const profileResponse = await axios.get('/api/auth/profile', { withCredentials: true });
        setProfile(profileResponse.data);  // 로그인 후 프로필 정보 상태 업데이트
        alert('로그인 성공');
        navigate('/');  // 로그인 성공 시 메인 페이지로 이동
      }
      //에러처리
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다');
      } else {
        alert('로그인 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

    // try {
    //   // 백엔드 로그인 API 호출
    //   const response = await axios.post('/login', new URLSearchParams({
    //     username: email,
    //     password: password
    //   }), {withCredentials: true});

    //   if (response.status === 200) {
    //     // 로그인 성공 시 프로필 정보 가져오기
    //     const profileResponse = await axios.get('/api/auth/profile', { withCredentials: true });
    //     setProfile(profileResponse.data);  // 로그인 후 프로필 정보 상태 업데이트
    //     alert('로그인 성공');
    //     navigate('/');  // 로그인 성공 시 메인 페이지로 이동
    //   }
    //   //에러처리
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     alert('이메일 또는 비밀번호가 일치하지 않습니다');
    //   } else {
    //     alert('로그인 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    //   }
    // }
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
            placeholder="Email"
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
            placeholder="Password"
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

