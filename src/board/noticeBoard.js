import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './noticeBoard.scss';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const noticesPerPage = 10;

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/notices');
            setNotices(response.data);
        } catch (error) {
            console.error('Error fetching notices', error);
        }
    };

    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(notices.length / noticesPerPage);

    return (
        <div className="notice-board">
            <h2>공지사항</h2>

            {/* 공지사항 목록 */}
            <table className="notice-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNotices.map((notice, index) => (
                        <tr key={notice.id}>
                            <td>{indexOfFirstNotice + index + 1}</td>
                            <td>
                                <Link to={`/notice/${notice.id}`} className="notice-link" style={{ color: 'black' }}>{notice.title}</Link>
                            </td>
                            <td>{notice.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="pagination">
                <ul>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={index + 1 === currentPage ? "active" : ""}>
                            <button onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 공지사항 작성 링크 */}
            <Link to="/add-notice" className="add-notice-link" style={{ color: 'white' }}>공지사항 작성하기</Link>
        </div>
    );
};

export default NoticeBoard;
