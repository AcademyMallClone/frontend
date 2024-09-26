import React from 'react';
import { NavLink } from 'react-router-dom';
import "./header.scss"

const Header = () => {
    return (
        <div id="header">
            <div className="inner">
                <h1><NavLink to ='/'>OneCatch</NavLink></h1>
                <ul>
                    {/* <li>상품등록하기</li>
                    <li>상품보기</li> */}
                    <li><NavLink to ='/productSearch'>검색</NavLink></li>
                    <li><NavLink to ='/upload'>상품등록하기</NavLink></li>
                    <li><NavLink to ='/products'>상품보기</NavLink></li>
                    <li><NavLink to ='/cart'>장바구니</NavLink></li>
                    <li><NavLink to ='/login'>로그인</NavLink></li>
                    
                </ul>
            </div>
        </div>   
    );
};

export default Header;
