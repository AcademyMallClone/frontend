import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "./header.scss";

const Header = ({ profile, setProfile }) => {

    const handleLogout = () => {
        axios.post('/logout', {}, { withCredentials: true }) // 로그아웃 시 세션 쿠키 포함
            .then(() => {
                console.log('check')
                setProfile(null); // 로그아웃 후 상태 초기화
                window.location.href = '/'; // 로그아웃 후 메인 페이지로 리다이렉트
            })
            .catch(error => {
                console.log("로그아웃 실패:", error);
            });
    };


    const [menuOpen, setMenuOpen] = useState(false);

    // 메뉴 토글 함수
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div id="header" className={menuOpen ? 'active' : ''}>
            <div className="inner">
                <h1><NavLink to='/'>I.M</NavLink></h1>

                {/* 햄버거 버튼 */}
                <div className="menu-toggle" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul>
                    <li><NavLink to='/productSearch'>검색</NavLink></li>
                    <li><NavLink to='/upload'>상품등록하기</NavLink></li>
                    <li><NavLink to='/products'>상품보기</NavLink></li>
                    <li><NavLink to='/cart'>장바구니</NavLink></li>
                    {/* 로그인 상태에 따른 조건부 렌더링 */}
                    {profile ? (
                        <li className="profile-info">
                            <span className="username">{profile.username}님</span>
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
