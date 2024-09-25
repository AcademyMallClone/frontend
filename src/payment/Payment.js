import React, { useState } from 'react';
import './payment.scss'

const Payment = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // 실제 결제 처리 로직을 추가할 수 있는 부분
        alert('결제가 완료되었습니다!');
    };

    return (
        <div id="payment">
            <h2>가상결제</h2>
            <form onSubmit={handlePaymentSubmit}>
                <div className="form-group">
                    <label htmlFor="payment-method">결제수단</label>
                    <select
                        id="payment-method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">선택하세요</option>
                        <option value="card">신용카드</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank-transfer">계좌이체</option>
                    </select>
                </div>

                {paymentMethod === 'card' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="card-number">카드번호</label>
                            <input
                                type="text"
                                id="card-number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                placeholder="카드번호 입력"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card-name">카드 소유자명</label>
                            <input
                                type="text"
                                id="card-name"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                                placeholder="소유자명 입력"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="expiry-date">유효기간</label>
                            <input
                                type="text"
                                id="expiry-date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                                placeholder="MM/YY"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                                placeholder="CVV 입력"
                            />
                        </div>
                    </>
                )}

                <button type="submit">결제하기</button>
            </form>
        </div>
    );
};

export default Payment;
