import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const MainPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '일반적인 셔츠', price: '30,000원', imgsrc: '/images/shirt01.jpg' },
    { id: 2, name: '특별한 셔츠', price: '35,000원', imgsrc: '/images/shirt02.jpg' },
    { id: 3, name: '독특한 셔츠', price: '40,000원', imgsrc: '/images/shirt03.jpg' },
    { id: 4, name: '새로운 셔츠', price: '45,000원', imgsrc: '/images/shirt04.jpg' },
  ]);

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
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="product-card-index">
                <div className="product-img-index">
                  <img src={product.imgsrc} alt={product.name} />
                </div>
                <div className="product-contents-index">
                  <span className="product-name-index">제품명: {product.name}</span>
                  <span className="product-price-index">가격: {product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
