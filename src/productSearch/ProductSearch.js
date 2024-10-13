import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './productSearch.scss';
import axios from 'axios'; // axios import 추가

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            // axios를 사용하여 백엔드 검색 API 호출
            axios.get(`http://localhost:9090/api/products/search?query=${encodeURIComponent(searchTerm)}`)
                .then(response => {
                    setSearchResults(response.data); // 검색 결과를 상태에 저장
                })
                .catch(error => {
                    console.error('검색 중 오류 발생:', error);
                });
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="상품 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">검색</button>
            </form>
            {/* 검색 결과 출력 */}
            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map(product => (
                        <div key={product.id} className="search-item">
                            <h3>{product.productName}</h3>
                            <p>{product.description}</p>
                            <p>가격: {product.price}원</p>
                            <img src={product.imageUrl} alt={product.productName} />
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ProductSearch;
