import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './product.scss';

const ProductPage = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const navigate = useNavigate();

    // 상품 목록 불러오기 (API에서 가져오기)
    useEffect(() => {
        axios.get('/api/products/items') // 백엔드 API 호출
            .then(response => {
                setProducts(response.data); // API 응답 데이터를 상태에 저장
                setLoading(false); // 로딩 완료
            })
            .catch(error => {
                console.error("상품을 불러오는 중 오류 발생:", error);
                setLoading(false); // 로딩 에러 발생 시에도 완료 처리
            });
    }, []);

    // 장바구니에 상품 추가
    const handleAddToCart = (product) => {
        const existingProduct = cart.find((item) => item.productId === product.productId);

        if (existingProduct) {
            // 장바구니에 이미 있는 제품이라면 수량 증가
            setCart(cart.map((item) =>
                item.productId === product.productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // 장바구니에 없는 제품 새로 추가
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        // 외부 장바구니 추가 함수 호출 (있을 경우)
        if (addToCart) {
            addToCart(product);
        }

        // 성공 메시지 알림
        alert(`${product.productName}이(가) 장바구니에 추가되었습니다.`);
        navigate('/cart'); // 장바구니로 리디렉션
    };

    return (
        <div className="product-container">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.productId} className="product-item">
                        <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-card">
                                <div className="image-box">
                                    <img src={product.imageUrl} alt={product.productName} />
                                </div>
                                <div className="profile-box">
                                    <ul>
                                        <li className="product-name">제품명: {product.productName}</li>                                        <li className="product-price">가격: {product.price.toLocaleString()}원</li>
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
