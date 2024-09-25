import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './productSearch.scss';

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            // 검색어를 쿼리 문자열로 검색 결과 페이지로 이동
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
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
        </div>
    );
};

export default ProductSearch;
