import React, { useState } from 'react';
import ProductPage from './Product';

const products = [
        { id: 1, name: '일반적인 셔츠', price: 30000, description: '고급 원단으로 제작된 셔츠', image: '/shirt01.jpg' },
        { id: 2, name: '특별한 셔츠', price: 35000, description: '편안한 착용감과 세련된 디자인', image: '/shirt02.jpg' },
        { id: 3, name: '독특한 셔츠', price: 40000, description: '스타일과 내구성을 갖춘 셔츠', image: '/shirt03.jpg' },
        { id: 4, name: '새로운 셔츠', price: 45000, description: '클래식한 디자인의 셔츠', image: '/shirt04.jpg' },
];

const ParentComponent = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        // 선택적으로 장바구니 업데이트를 처리할 로직을 추가할 수 있습니다
    };

    return (
        <div>
            <ProductPage products={products} addToCart={addToCart} />
        </div>
    );
};

export default ParentComponent;
