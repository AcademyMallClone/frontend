import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './searchResultPage.scss';

const SearchResultPage = ({ products, addToCart }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // URL에서 쿼리 파라미터 가져오기
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            setSearchTerm(query); // 검색창에 기존 검색어 유지
            // 검색어와 일치하는 제품 필터링
            const results = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(results);
        }
    }, [query, products]);

    // 검색 처리 함수
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            // 검색어를 쿼리 문자열로 검색 결과 페이지로 이동
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    // 장바구니 추가 확인 메시지
    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
    };

    return (
        <div className="search-result-container">
            {/* 검색창 유지 */}
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

            <h2>검색 결과: "{query}"</h2>
            {filteredProducts.length > 0 ? (
                <div className="product-list">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            {/* 상세 페이지로 이동하는 링크 추가 */}
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={`/images/${product.imgsrc}`} alt={product.name} />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>{product.price.toLocaleString()} 원</p>
                                </div>
                            </Link>
                            <button onClick={() => handleAddToCart(product)}>장바구니에 추가</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>검색된 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default SearchResultPage;
