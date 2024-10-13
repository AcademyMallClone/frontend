import React, { useState } from 'react';
import './upload.scss';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { Form, Divider, Input, InputNumber, Button, Upload, message } from 'antd';
import axios from 'axios'; // Axios import
import { UploadOutlined } from '@ant-design/icons';

const UploadPage = (props) => {
    const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
    const navigate = useNavigate();

    // 파일이 선택될 때 호출되는 함수
    const handleImageUpload = (info) => {
        setImageFile(info.file);
    };

    // 폼 제출 시 호출되는 함수
    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('description', values.description);
        if (imageFile) {
            formData.append('image', imageFile); // 이미지 파일도 함께 전송
        }

        // 상품 등록 API 호출
        axios.post("http://localhost:9090/api/products/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 파일 업로드 설정
            }
        },{ withCredentials: true })
        .then(response => {
            console.log("상품 등록 성공:", response.data);
            message.success('상품이 성공적으로 등록되었습니다!');
            navigate('/');
        })
        .catch(error  => {
            console.error("상품 등록 실패:", error);
            message.error('상품 등록에 실패했습니다.');
        });
    };

    return (
        <div id="upload-container" className='inner'>
            <Form name="productUpload" onFinish={onFinish} encType="multipart/form-data">
                <Form.Item 
                    name="imgUpload"
                    label={<div className='upload-label'>상품사진</div>}
                >
                    <Upload
                        listType="picture"
                        maxCount={1} // 한 개의 이미지만 업로드 가능
                        beforeUpload={() => false} // 서버에 업로드를 막고 직접 처리
                        onChange={handleImageUpload}
                    >
                        <Button icon={<UploadOutlined />}>이미지를 업로드 해주세요</Button>
                    </Upload>
                </Form.Item>



                <Divider />

                <Form.Item 
                    name="name"
                    label={<div className='upload-label'>상품이름</div>}
                    rules={[{ required: true, message: '상품 이름을 입력해주세요' }]}
                >
                    <Input
                        className='upload-name'
                        size='large'
                        placeholder='상품 이름을 입력해주세요'/>
                </Form.Item>

                <Divider />

                <Form.Item 
                    name="price"
                    label={<div className='upload-label'>상품가격</div>}
                    rules={[{ required: true, message: '상품 가격을 입력하세요' }]}
                >
                    <InputNumber
                        defaultValue={0}
                        size="large"
                        style={{ width: '100%' }}
                        placeholder="상품 가격을 입력해주세요"
                    />
                </Form.Item>

                <Divider />

                <Form.Item 
                    name="description"
                    label={<div className='upload-label'>상품소개</div>}
                    rules={[{ required: true, message: '상품 소개를 적어주세요' }]}
                >
                    <Input.TextArea
                        size='large'
                        id="product-description"
                        maxLength={300}
                        placeholder="상품 소개를 적어주세요"
                    />
                </Form.Item>

                <Form.Item>
                    <Button id="submit-button" size="large" type="primary" htmlType='submit'>
                        상품등록하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadPage;
