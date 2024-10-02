import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './product.scss';

const ProductPage = ({ products = [], addToCart }) => {
    const [cart, setCart] = useState([]); // 장바구니 상태 추가

    const handleAddToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        
        if (existingProduct) {
            // 장바구니에 이미 있는 제품이라면 수량만 증가시킴
            setCart(cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // 장바구니에 없는 경우 새로 추가
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        // 제품을 장바구니에 추가하는 외부 함수 호출 (addToCart가 있을 경우)
        if (addToCart) {
            addToCart(product);
        }

        // 성공 알림 메시지 표시
        alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
    };

    return (
        <div className="product-container">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-item">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-card">
                                <div className="image-box">
                                    <img src={`/images/${product.imgsrc}`} alt={product.name} />
                                </div>
                                <div className="profile-box">
                                    <ul>
                                        <li className="product-title">
                                            
                                        </li>
                                        <li className="product-name">제품명: {product.name}</li>
                                        <li className="product-price">가격: {product.price.toLocaleString()}원</li>
                                        <li className="product-description">상세설명: {product.description}</li>
                                    </ul>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // 기본 링크 동작 방지
                                            handleAddToCart(product); // 장바구니에 추가
                                        }}
                                        className="add-to-cart-button"
                                    >
                                        장바구니에 추가
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>상품이 없습니다.</p>
            )}
        </div>
    );
};

export default ProductPage;
