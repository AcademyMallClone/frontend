import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addNotice.scss';

const AddNotice = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleAddNotice = async (e) => {
        e.preventDefault();

        console.log("Title before sending: ", title);
        console.log("Date before sending: ", date);
        console.log("Content before sending: ", content);

        const newNotice = {
            title: title.trim(),
            date: date ? date : new Date().toISOString().split('T')[0],
            content: content.trim()
        };

        if (!newNotice.title || !newNotice.content) {
            alert("Title and Content cannot be empty");
            return;
        }

        try {
            await axios.post('http://localhost:9090/api/notices', newNotice);
            navigate('/notices'); // 공지사항 목록으로 이동
        } catch (error) {
            console.error('Error adding notice', error);
        }
    };

    return (
        <div className="add-notice">
            <h2>공지사항 작성하기</h2>
            <form onSubmit={handleAddNotice} className="notice-form">
                <div className="form-group">
                    <label>제목: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>날짜: </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용: </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">공지사항 추가</button>
            </form>
        </div>
    );
};

export default AddNotice;
