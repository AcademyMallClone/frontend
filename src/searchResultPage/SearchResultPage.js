// src/searchResultPage/SearchResultsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductPage from '../product/Product'; // 경로 확인
import '../searchResultPage/searchresultpage.scss'; // 스타일 파일이 있을 경우

const SearchResultPage = ({ addToCart }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || ''; // 쿼리가 없으면 빈 문자열로 대체
    console.log('Query:', query);


    // 상품 목록 (API 호출로 대체 가능)
    const defaultProducts = [
        { id: 1, name: '일반적인 셔츠', price: 30000, description: '고급 원단으로 제작된 셔츠', image: '/shirt01.jpg' },
        { id: 2, name: '특별한 셔츠', price: 35000, description: '편안한 착용감과 세련된 디자인', image: '/shirt02.jpg' },
        { id: 3, name: '독특한 셔츠', price: 40000, description: '스타일과 내구성을 갖춘 셔츠', image: '/shirt03.jpg' },
        { id: 4, name: '새로운 셔츠', price: 45000, description: '클래식한 디자인의 셔츠', image: '/shirt04.jpg' },
    ];

    // 검색 쿼리로 상품 필터링
    const filteredProducts = query ?
        defaultProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) :
        defaultProducts;

    console.log('Query:', query);
    console.log('Filtered Products:', filteredProducts);

    return (
        <div className="search-results-container">
            {filteredProducts.length > 0 ? (
                <ProductPage products={filteredProducts} addToCart={addToCart} />
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default SearchResultPage;
