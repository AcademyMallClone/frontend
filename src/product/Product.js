import React from 'react';
import './product.scss';

const ProductPage = ({ products = [], addToCart }) => {
    return (
        <div className="product-container">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-item">
                        <div className="image-box">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="profile-box">
                            <ul>
                                <li className="product-title">
                                    <div className="product-header">
                                        <img src={product.image} alt={product.name} />
                                        <span>{product.name}</span>
                                    </div>
                                </li>
                                <li className="product-name">제품명: {product.name}</li>
                                <li className="product-price">가격: {product.price}원</li>
                                <li className="product-description">
                                    상세설명: {product.description}
                                </li>
                            </ul>
                            <button onClick={() => addToCart(product)} className="add-to-cart-button">
                                장바구니에 추가
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>상품이 없습니다.</p>
            )}
        </div>
    );
};

export default ProductPage;
