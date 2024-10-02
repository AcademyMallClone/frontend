import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './productDetail.scss'; // 추가 스타일을 위한 CSS 파일 import

const ProductDetail = ({ products, addToCart }) => {
    const { productId } = useParams();
    const product = products.find(p => p.id === parseInt(productId));

    const [selectedSize, setSelectedSize] = useState(''); // 사이즈 상태 추가
    const [reviews, setReviews] = useState([]); // 리뷰 상태 추가
    const [newReview, setNewReview] = useState(''); // 새로운 리뷰 입력 상태
    const [rating, setRating] = useState(0); // 별점 상태 추가
    const [hover, setHover] = useState(0); // 마우스 오버를 위한 상태

    if (!product) {
        return <div>제품을 찾을 수 없습니다!</div>;
    }

    const sizes = ['S', 'M', 'L', 'XL']; // 사이즈 배열

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("사이즈를 선택해 주세요."); // 사이즈 미선택 시 경고
            return;
        }

        const productWithSize = {
            ...product,
            selectedSize,
        };

        addToCart(productWithSize); // 장바구니에 제품 추가
        alert(`${product.name} (${selectedSize})이(가) 장바구니에 추가되었습니다.`);
    };

    // 리뷰 등록 함수
    const handleAddReview = () => {
        if (newReview.trim() === '' || rating === 0) {
            alert('리뷰와 별점을 입력해 주세요.');
            return;
        }

        const newReviewData = {
            review: newReview,
            rating: rating
        };

        setReviews([...reviews, newReviewData]); // 새로운 리뷰 추가
        setNewReview(''); // 입력 필드 초기화
        setRating(0); // 별점 초기화
    };

    // 평균 별점 계산
    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1); // 소수점 1자리까지 표시
    };

    return (
        <div className="product-detail">
            <div className="product-detail-img">
                <img src={`/images/${product.imgsrc}`} alt={product.name} style={{ width: '100%' }} />
            </div>
            <div className="product-detail-info">
                <h1>{product.name}</h1>
                <p className="product-price">가격: {product.price}</p>
                <p className="product-description">설명: {product.description || "이 제품에 대한 추가 설명이 없습니다."}</p>

                {/* 평균 별점 표시 */}
                <div className="average-rating">
                    <h3>평균 별점: {calculateAverageRating()} / 5</h3>
                </div>

                <div className="size-selection">
                    <h3>사이즈 선택:</h3>
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        <option value="">사이즈 선택</option>
                        {sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    장바구니에 추가
                </button>

                <div className="product-reviews">
                    <h2>고객 리뷰</h2>
                    {reviews.length === 0 ? (
                        <p>아직 리뷰가 없습니다.</p>
                    ) : (
                        <ul>
                            {reviews.map((review, index) => (
                                <li key={index}>
                                    <div>별점: {review.rating} / 5</div>
                                    <div>{review.review}</div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="review-input">
                        <h3>리뷰 작성:</h3>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="리뷰를 작성해 주세요."
                        />
                        
                        <div className="rating">
                            <h3>별점:</h3>
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            style={{ display: 'none' }}
                                        />
                                        <i
                                            className={`fa-star ${ratingValue <= (hover || rating) ? 'fas' : 'far'}`}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{ cursor: 'pointer', color: '#ffc107', fontSize: '2rem' }}
                                        ></i>
                                    </label>
                                );
                            })}
                        </div>

                        <button onClick={handleAddReview}>리뷰 등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
