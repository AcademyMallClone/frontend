import React from 'react';
import { NavLink } from 'react-router-dom';
import './cart.scss'; 

const Cart = ({ cartItems, updateQuantity, clearCart }) => {
    // 총 가격 계산
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div id="cart-container">
            <h2>장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니에 상품이 없습니다.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <span>{item.name}</span>
                                <span>가격: {item.price} 원</span>
                                <span>
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
                    <h3>총 가격: {totalPrice} 원</h3>
                    <div className='button-group'>
                        <button className='cb' onClick={clearCart}>장바구니 비우기</button>
                        <NavLink className='pay-btn' to='/payment'>결제</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
