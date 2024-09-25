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
import SearchResultsPage from './searchResultPage/SearchResultPage';
import Join from './join/join';

function App() {
    // 장바구니에 담긴 상품 상태 관리
    const [cartItems, setCartItems] = useState([]);

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

    return (
        <div className="App">
            {/* Header, Footer, Routes 등 */}
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products" element={<ProductPage addToCart={addToCart} />} />
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
                <Route path="/login" element={<Login />} />
                <Route path='/join' element={<Join />}/>
                <Route path="/payment" element={<Payment />} />
                <Route path="/productSearch" element={<ProductSearch />} />
                {/* /search 경로는 SearchResultsPage 컴포넌트만 사용 */}
                <Route path="/search" element={<SearchResultsPage addToCart={addToCart} />} />
                
            </Routes>
            <Footer />
          </div>
    );
}

export default App;
