import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import './index.scss';
import ChatToggleComponent from '../chat/ChatIcon';


const MainPage = () => {
  const [products, setProducts] = useState([]);

  // 백엔드에서 최신 상품 목록 불러오기
  useEffect(() => {
    axios.get('/api/products/items') // 백엔드 API에서 상품 목록 가져오기
      .then(response => {
        setProducts(response.data); // API로부터 받은 데이터를 상태로 설정
      })
      .catch(error => {
        console.error("상품을 불러오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <div id="main">
      <div className="banner" id="banner">
        <h2>
          Casual Shirts.
          <br />
          좋은 소재로 만든 에센셜 아이템, 셔츠를 만나보세요
        </h2>
      </div>

      <div id="product-list" className="inner">
        <h2>최신상품</h2>

        <div id="product-items" className="product-container-index">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/product/${product.productId}`} // productId를 사용
                key={product.productId}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="product-card-index">
                  <div className="product-img-index">
                    <img src={product.imageUrl} alt={product.name} /> {/* 이미지 경로 및 이름 */}
                  </div>
                  <div className="product-contents-index">
                    <span className="product-name-index">제품명: {product.productName}</span>
                    <br></br>
                    <span className="product-price-index">가격: {product.price.toLocaleString()}원</span> {/* 가격 포맷 */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>상품이 없습니다.</p> // 상품이 없을 경우 출력 메시지
          )}
        </div>
      </div>
      <ChatToggleComponent/>
    </div>
  );
};

export default MainPage;
