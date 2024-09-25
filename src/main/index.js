import React, {useState, useEffect} from 'react';
import './index.scss';
import axios from 'axios';


const MainPage = (props) => {
    const [ products, setProducts ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/products")
        .then((result)=>{
            const products = result.data.products;
            setProducts(products);
        }).catch((e)=>{
            console.log(e);
        })
    }, [])

    
const text = `Casual Shirts.
                        좋은 소재로 만든 에센셜 아이템, 셔츠를 만나보세요`;


     
    return (
        <div>
            <div id="main">
                <div className='banner' id="banner">
                     <h2>{text}</h2>
                </div>
                
                <div id="product-list" className='inner'>
                    <h2>최신상품</h2>
                    
                    <div id="product-items">
                        {/* 나중에 map 이용해서 밑에꺼 8개 뿌려줌 */}
                        {products.map(product => (
                            <div className="product-card" key={product.id}>
                                <div className='product-img'>
                                    <img src={product.imgsrc} alt="" />
                                </div>
                                <div className='product-contents'>
                                    <span className='product-name'>제품명 {product.name}</span>
                                    <span className='product-price'>가격 {product.price}</span>
                                    <div className='product-seller'>
                                    <img src="../public/shirt01.jpg" alt=""/>{product.seller}
                                    </div>
                                </div>
                            </div>
                        ))}   
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MainPage;
