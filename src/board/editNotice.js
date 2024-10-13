import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editNotice.scss';

const EditNotice = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/notices/${id}`);
                const notice = response.data;
                setTitle(notice.title);
                setDate(notice.date);
                setContent(notice.content);
            } catch (error) {
                console.error('Error fetching notice details', error);
            }
        };
        fetchNotice();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedNotice = { title, date, content };
        try {
            await axios.put(`http://localhost:9090/api/notices/${id}`, updatedNotice);
            navigate(`/notice/${id}`);
        } catch (error) {
            console.error('Error updating notice', error);
        }
    };

    return (
        <div className="edit-notice-container">
            <h2 className="edit-notice-title">공지사항 수정</h2>
            <form className="edit-notice-form" onSubmit={handleUpdate}>
                <div className="edit-form-group">
                    <label className="edit-form-label">제목:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="edit-form-input" 
                        required 
                    />
                </div>
                <div className="edit-form-group">
                    <label className="edit-form-label">날짜:</label>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        className="edit-form-input" 
                        required 
                    />
                </div>
                <div className="edit-form-group">
                    <label className="edit-form-label">내용:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="edit-form-textarea" 
                        required 
                    />
                </div>
                <button type="submit" className="edit-submit-button">수정 완료</button>
            </form>
        </div>
    );
};

export default EditNotice;
