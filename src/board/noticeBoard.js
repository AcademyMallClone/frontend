import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './noticeBoard.scss';

const NoticeBoard = () => {
    const notices = [
        { id: 1, title: '상품가이드', date: '2024-09-19' },
        { id: 2, title: '신상품 입고 안내', date: '2024-09-19' },
        { id: 3, title: 'Mall 오픈을 축하드립니다.', date: '2024-09-19' },
        { id: 4, title: '배송 안내', date: '2024-09-20' },
        { id: 5, title: '회원 혜택 안내', date: '2024-09-21' },
        { id: 6, title: '이벤트 안내', date: '2024-09-22' },
        { id: 7, title: '고객센터 운영시간', date: '2024-09-23' },
        { id: 8, title: '리뷰 작성 가이드', date: '2024-09-24' },
        { id: 9, title: '특가 행사 안내', date: '2024-09-25' },
        { id: 10, title: '추석 배송 일정 안내', date: '2024-09-26' },
        { id: 11, title: '재입고 안내', date: '2024-09-27' },
        { id: 12, title: '서비스 점검 안내', date: '2024-09-28' }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const noticesPerPage = 10;

    // 현재 페이지에 표시할 공지사항들 계산
    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

    // 페이지 번호 클릭 핸들러
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(notices.length / noticesPerPage);

    return (
        <div>
            <h2>공지사항</h2>
            <table>
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
                                <Link to={`/notice/${notice.id}`} style={{ color: 'black'}}>{notice.title}</Link>
                            </td>
                            <td>{notice.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div>
                <ul className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NoticeBoard;
