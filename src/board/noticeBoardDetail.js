import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './noticeBoardDetail.scss'; // CSS 파일을 추가합니다.

const NoticeBoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const notices = [
        { id: 1, title: '상품가이드', date: '2024-09-19', content: '상품가이드에 대한 상세 내용입니다.' },
        { id: 2, title: '신상품 입고 안내', date: '2024-09-19', content: '신상품 입고 안내에 대한 상세 내용입니다.' },
        { id: 3, title: 'Mall 오픈을 축하드립니다.', date: '2024-09-19', content: 'Mall 오픈을 축하드립니다. 상세 내용입니다.' },
        { id: 4, title: '배송 안내', date: '2024-09-20', content: '1~2일 소요 됩니다.' },
        { id: 5, title: '회원 혜택 안내', date: '2024-09-21', content:'회원가입시 20% 할인 혜택' },
        { id: 6, title: '이벤트 안내', date: '2024-09-22', content:'셔츠 10장 구매시 1장 무료 증정'},
        { id: 7, title: '고객센터 운영시간', date: '2024-09-23', content:'09시부터 18시까지입니다.' },
        { id: 8, title: '리뷰 작성 가이드', date: '2024-09-24',content:'베스트 리뷰 당첨시 10%할인 쿠폰 증정' },
        { id: 9, title: '특가 행사 안내', date: '2024-09-25', content:'매월 마지막 수요일 할인행사' },
        { id: 10, title: '추석 배송 일정 안내', date: '2024-09-26',content:'추석 전후 2일 배송 지연' },
        { id: 11, title: '재입고 안내', date: '2024-09-27',content:'10일뒤 입고 예정' },
        { id: 12, title: '서비스 점검 안내', date: '2024-09-28',content:'매월 1일 0시부터 15분간 정검' }
    ];

    const notice = notices.find(notice => notice.id === parseInt(id));

    if (!notice) {
        return <div>공지사항을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="notice-detail">
            <h2>{notice.title}</h2>
            <p className="date">작성일: {notice.date}</p>

            <div className="content">
                <h3>내용</h3>
                <p>{notice.content}</p>
            </div>

            <div className="button-group">
                <button className="back-button" onClick={() => navigate('/notices')}>
                    목록
                </button>
            </div>
        </div>
    );
};

export default NoticeBoardDetail;
