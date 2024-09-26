import React, { useState } from 'react';
import './index.scss';
import ChatComponent from '../chat/Chat';
import ChatToggleComponent from '../chat/ChatIcon'

const MainPage = (props) => {
    // 기본 상품 데이터 추가
    const [products, setProducts] = useState([
        { id: 1, name: '일반적인 셔츠', price: '30,000원', imgsrc: '/shirt01.jpg'},
        { id: 2, name: '특별한 셔츠', price: '35,000원', imgsrc: '/shirt02.jpg'},
        { id: 3, name: '독특한 셔츠', price: '40,000원', imgsrc: '/shirt03.jpg'},
        { id: 4, name: '새로운 셔츠', price: '45,000원', imgsrc: '/shirt04.jpg'}
    ]);

    const text = `Casual Shirts.
                  좋은 소재로 만든 에센셜 아이템, 셔츠를 만나보세요`;

    return (
        <div id="main">
            <div className='banner' id="banner">
                <h2>{text}</h2>
            </div>
            
            <div id="product-list" className='inner'>
                <h2>최신상품</h2>
                
                <div id="product-items">
                    {products.map(product => (
                        <div className="product-card" key={product.id}>
                            <div className='product-img'>
                                <img src={product.imgsrc} alt={product.name} />
                            </div>
                            <div className='product-contents'>
                                <span className='product-name'>제품명: {product.name}</span>
                                <span className='product-price'>가격: {product.price}</span>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <ChatToggleComponent /> 
        </div>
    );
};

export default MainPage;
