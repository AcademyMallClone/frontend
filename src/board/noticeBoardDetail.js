import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './noticeBoardDetail.scss';

const NoticeDetail = () => {
    const { id } = useParams(); // URL에서 공지사항 ID를 가져옵니다.
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotice = async () => {
            console.log(`Fetching notice with ID: ${id}`); // ID 값 확인
            try {
                const response = await axios.get(`http://localhost:9090/api/notices/${id}`);
                setNotice(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching notice details', err);
                setError('Error fetching notice details');
                setLoading(false);
            }
        };
        fetchNotice();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:9090/api/notices/${id}`);
            navigate('/notices'); // 삭제 후 공지사항 목록으로 이동
        } catch (err) {
            console.error('Error deleting notice', err);
            setError('Error deleting notice');
        }
    };

    const handleEdit = async () => {
        navigate(`/edit-notice/${id}`); // 수정 페이지로 이동
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="notice-detail">
            <h2>공지사항 상세</h2>
            {notice && (
                <div>
                    <h3>{notice.title}</h3>
                    <p><strong>날짜:</strong> {notice.date}</p>
                    <div className="notice-content">
                        <p>{notice.content}</p>
                    </div>
                    <div className="notice-actions">
                        <button onClick={handleEdit} className="edit-button">수정</button>
                        <button onClick={handleDelete} className="delete-button">삭제</button>
                    </div>
                    <Link to="/notices" className="back-link" style={{ color: 'white' }}>뒤로 가기</Link>
                </div>
            )}
        </div>
    );
};

export default NoticeDetail;