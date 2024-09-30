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
import { useState } from 'react';
import SearchResultPage from './searchResultPage/SearchResultPage';
import Join from './join/Join';

function App() {
    // 장바구니에 담긴 상품 상태 관리
    const [cartItems, setCartItems] = useState([]);

    // 로그인된 사용자 정보 상태 관리
    const [profile, setProfile] = useState(null);

    // 장바구니에 제품 추가 함수
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item => 
                item.id === product.id 
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

    // 장바구니 비우기
    const clearCart = () => {
        setCartItems([]);
    };

    const defaultProducts = [
        { id: 1, name: '일반적인 셔츠', price: 30000, description: '고급 원단으로 제작된 셔츠', image: '/shirt01.jpg' },
        { id: 2, name: '특별한 셔츠', price: 35000, description: '편안한 착용감과 세련된 디자인', image: '/shirt02.jpg' },
        { id: 3, name: '독특한 셔츠', price: 40000, description: '스타일과 내구성을 갖춘 셔츠', image: '/shirt03.jpg' },
        { id: 4, name: '새로운 셔츠', price: 45000, description: '클래식한 디자인의 셔츠', image: '/shirt04.jpg' },
    ];

    return (
        <div className="App">
            {/* Header에 profile 상태와 setProfile 전달 */}
            <Header profile={profile} setProfile={setProfile} />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products" element={<ProductPage products={defaultProducts} addToCart={addToCart} />} />
                <Route path="/upload" element={<Uploadpage />} />
                <Route 
                    path="/cart" 
                    element={
                        <Cart 
                            cartItems={cartItems} 
                            updateQuantity={updateQuantity} 
                            clearCart={clearCart} 
                        />
                    } 
                />
                {/* Login에 setProfile 전달하여 로그인 후 프로필 정보 업데이트 */}
                <Route path="/login" element={<Login setProfile={setProfile} />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/productSearch" element={<ProductSearch />} />
                <Route path="/search" element={<SearchResultPage addToCart={addToCart} />} />
                <Route path='/join' element={<Join />}/>
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
