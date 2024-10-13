import './payment.scss'; // SCSS 파일 불러오기
import { totalprice } from '../cart/Cart'; // 총 결제 금액 불러오기
import React, { useEffect } from 'react';
import axios from 'axios';

const Payment = ({ cartItems }) => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, [cartItems]);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp76575565'); // 아임포트 가맹점 식별코드

    const amount = totalprice(cartItems); // 총 결제 금액 계산
    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: '결제 상품',
      amount: amount, // 결제 금액
      buyer_email: 'test@naver.com',
      buyer_name: '고객명',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시',
      buyer_postcode: '123-456',
    }, async (rsp) => {
      if (rsp.success) {
        try {
          const { data } = await axios.post(`http://localhost:9090/verifyIamport/${rsp.imp_uid}`);
          if (rsp.paid_amount === data.response.amount) {
            alert('결제 성공');
            // 메인 페이지로 리다이렉트
            window.location.href = 'http://localhost:3000/'; // 메인 페이지 URL로 변경
          } else {
            alert('결제 금액 불일치: 결제 실패');
          }
        } catch (error) {
          alert('결제 검증 실패');
        }
      } else {
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    });
  };

  return (
    <div className="payment-container">
      <button className="payment-button" onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payment;