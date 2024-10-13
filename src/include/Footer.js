import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        // 공지사항 데이터 가져오기
        const fetchNotices = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/notices');
                // 최신 3개의 공지사항만 가져오기
                setNotices(response.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching notices', error);
            }
        };
        fetchNotices();
    }, []);

    return (
        <div id="footer">
            <div id="footer-info">
                <div className='inner'>
                    <div>
                        <h3>무통장 입금계좌</h3>
                        <p>BANK ACCOUNT</p>
                        <p>우리 1002-340-725049</p>
                        <p>예금주 - 홍길동(I.M)</p>
                    </div>
                    <div>
                        <h3>고객센터</h3>
                        <p>영업시간 이외에는 문의 게시판을 이용해주시면 담당자 확인 후 빠른 답변 도와드리겠습니다.</p>
                        <p id="tel">02-1263-1245</p>
                    </div>
                    <div>
                        <h3><Link to="/notices" style={{ color: 'black' }}>공지사항</Link></h3>
                        <ul>
                            {notices.map((notice) => (
                                <li key={notice.id}>
                                    <Link to={`/notice/${notice.id}`} style={{ color: 'black' }}>
                                        {notice.title}
                                    </Link> 
                                    <span> {notice.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div id="footer-copy">
                <div className='inner'>
                    <ul>
                        <li><NavLink to='/' style={{ color: 'black' }}>홈</NavLink></li>
                        <li>I.M안내</li>
                        <li>이용약관</li>
                        <li>개인정보처리방침</li>
                    </ul>
                </div>
                <div id="copyright">
                    <div className='inner-detail'>
                        상호 : I.M(It mall)<br/> 
                        주소 : 서울특별시 용산구 100번길<br/>
                        대표전화 : 02-1234-1234 대표이사 : 홍길동<br/>
                        사업자 등록번호 : 102-12-12345
                        copyright(c) I.M, .LTD all rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
