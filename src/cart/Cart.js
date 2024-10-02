import React from 'react';
import { NavLink } from 'react-router-dom';
import './cart.scss';

const Cart = ({ cartItems, updateQuantity, updateSize, clearCart }) => {
    // 총 가격 계산
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // 사이즈 옵션 배열
    const sizes = ['S', 'M', 'L', 'XL'];

    return (
        <div id="cart-container">
            <h2>장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니에 상품이 없습니다.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-size">
                                    사이즈:
                                    <select 
                                        value={item.selectedSize} 
                                        onChange={(e) => updateSize(item.id, e.target.value)} // 사이즈 변경 핸들러
                                    >
                                        {sizes.map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </span>
                                <span className="item-price">가격: {item.price.toLocaleString()} 원</span>
                                <span className="item-quantity">
                                    수량:
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        min="1" 
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                    <h3>총 가격: {totalPrice.toLocaleString()} 원</h3>
                    <div className="button-group-cart">
                        <button className="cb" onClick={clearCart}>장바구니 비우기</button>
                        <NavLink className="pay-btn" to="/payment">결제</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
