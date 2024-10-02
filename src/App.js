import React, { useState } from 'react';
import './App.css';
import Footer from './include/Footer';
import Header from './include/Header';
import MainPage from './main';
import ProductPage from './product/Product';
import { Routes, Route } from 'react-router-dom';
import Uploadpage from './upload/Upload';
import Cart from './cart/Cart';
import Login from './login/Login';
import Payment from './payment/Payment';
import ProductSearch from './productSearch/ProductSearch';
import SearchResultPage from './searchResultPage/SearchResultPage';
import Join from './join/join';
import ProductDetail from './product/ProductDetail'; 
import NoticeDetail from './board/noticeBoardDetail';
import NoticeBoard from './board/noticeBoard';


function App() {
    // 장바구니에 담긴 상품 상태 관리
    const [cartItems, setCartItems] = useState([]);

    // 로그인된 사용자 정보 상태 관리
    const [profile, setProfile] = useState(null);

    // 장바구니에 제품 추가 함수
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
        if (existingItem) {
            setCartItems(cartItems.map(item => 
                item.id === product.id && item.selectedSize === product.selectedSize
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // 수량 변경 함수
    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };
    // 사이즈 변경 함수
    const updateSize = (id, newSize) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, selectedSize: newSize } : item
        ));
    };

    // 장바구니 비우기
    const clearCart = () => {
        setCartItems([]);
    };

    const Products = [
        { id: 1, name: '일반적인 셔츠', price: 30000, imgsrc: '/shirt01.jpg', description: '고급 원단으로 제작된 셔츠' },
        { id: 2, name: '특별한 셔츠', price: 35000, imgsrc: '/shirt02.jpg', description: '편안한 착용감과 세련된 디자인' },
        { id: 3, name: '독특한 셔츠', price: 40000, imgsrc: '/shirt03.jpg', description: '스타일과 내구성을 갖춘 셔츠' },
        { id: 4, name: '새로운 셔츠', price: 45000, imgsrc: '/shirt04.jpg', description: '클래식하고 깔끔한 디자인 셔츠' },
    ];

    return (
        <div className="App">
            {/* Header에 profile 상태와 setProfile 전달 */}
            <Header profile={profile} setProfile={setProfile} />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products" element={<ProductPage products={Products} addToCart={addToCart} />} />
                <Route path="/product/:productId" element={<ProductDetail products={Products} addToCart={addToCart} />} /> {/* addToCart 추가 */}
                <Route path="/upload" element={<Uploadpage />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} updateSize={updateSize} clearCart={clearCart} />} />
                {/* Login에 setProfile 전달하여 로그인 후 프로필 정보 업데이트 */}
                <Route path="/login" element={<Login setProfile={setProfile}/>} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/productSearch" element={<ProductSearch />} />
                <Route path="/search" element={<SearchResultPage products={Products} addToCart={addToCart} />} />
                <Route path='/join' element={<Join />} />
                <Route path="/notices" element={<NoticeBoard />} />
                <Route path="/notice/:id" element={<NoticeDetail />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
