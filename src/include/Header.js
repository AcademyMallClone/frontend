import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "./header.scss";

const Header = ({ profile, setProfile }) => {

    const handleLogout = () => {
        axios.post('/api/auth/logout', {}, { withCredentials: true }) // 로그아웃 시 세션 쿠키 포함
            .then(() => {
                console.log('check')
                setProfile(null); // 로그아웃 후 상태 초기화
                window.location.href = '/'; // 로그아웃 후 메인 페이지로 리다이렉트
            })
            .catch(error => {
                console.log("로그아웃 실패:", error);
            });
    };

    return (
        <div id="header">
            <div className="inner">
                <h1><NavLink to='/'>OneCatch</NavLink></h1>
                <ul>
                    <li><NavLink to='/productSearch'>검색</NavLink></li>
                    <li><NavLink to='/upload'>상품등록하기</NavLink></li>
                    <li><NavLink to='/products'>상품보기</NavLink></li>
                    <li><NavLink to='/cart'>장바구니</NavLink></li>

                    {/* 로그인 상태에 따른 조건부 렌더링 */}
                    {profile ? (
                        <li className="profile-info">
                            <span className="username">{profile.email}님</span>
                            <button onClick={handleLogout}>로그아웃</button>
                        </li>
                    ) : (
                        <li><NavLink to='/login'>로그인</NavLink></li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
