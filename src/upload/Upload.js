import React from 'react';
import './upload.scss';
import 'antd/dist/antd.css';
import { Form, Divider, Input, InputNumber, Button } from 'antd';
import axios from 'axios'; // Axios를 import합니다

const Uploadpage = (props) => {
    const onFinish = (values) => {
        // 폼 데이터 전송
        axios.post("http://localhost:3000/products", values)
            .then(response => {
                console.log("상품 등록 성공:", response.data);
                // 성공 시 알림 또는 다른 동작 추가
            })
            .catch(error => {
                console.error("상품 등록 실패:", error);
                // 실패 시 알림 추가
            });
    };

    return (
        <div id="upload-container" className='inner'>
            <Form name="productUpload" onFinish={onFinish}>
                <Form.Item name="imgUpload"
                    label={<div className='upload-label'>상품사진</div>}>
                    <div id="upload-img-placeholder">
                        <img src="../public/shirt02.jpg" alt="" />
                        <span>이미지를 업로드 해주세요.</span>
                    </div>
                </Form.Item>
                <Divider/>
                <Form.Item name="seller" 
                    label={<div className='upload-label'>판매자명</div>}
                    rules={[{ required: true, message: '판매자 이름을 입력하세요' }]}>
                    <Input className="nameUpload" size='large' placeholder='판매자 이름을 입력하세요'/>
                </Form.Item>
                <Divider/>
                <Form.Item name="name"
                label={<div className='upload-label'>상품이름</div>}
                rules={[{ required: true, message: '상품 이름을 입력해주세요' }]}>
                    <Input
                        className='upload-name'
                        size='large'
                        placeholder='상품 이름을 입력해주세요'/>
                </Form.Item>
                <Divider/>
                <Form.Item name="price"
                label={<div className='upload-label'>상품가격</div>}
                rules={[{ required: true, message: '상품 가격을 입력하세요' }]}>
                    <InputNumber defaultValue={0} size="large" />
                </Form.Item>
                <Divider/>
                <Form.Item name="description"
                label={<div className='upload-label'>상품소개</div>}
                rules={[{ required: true, message: '상품 소개를 적어주세요' }]}>
                <Input.TextArea
                    size='large'
                    id="product-description"
                    maxLength={300}
                    placeholder="상품 소개를 적어주세요"
                />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType='submit'>
                        상품등록하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Uploadpage;
