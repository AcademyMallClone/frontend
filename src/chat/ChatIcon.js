import React, { useState } from 'react';
import ChatComponent from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons'; // 채팅 아이콘과 닫기 아이콘 불러오기
import './chatIcon.scss';

const ChatToggleComponent = () => {
    const [isOpen, setIsOpen] = useState(false); // 토글 상태 관리

    const toggleChat = () => {
        setIsOpen(!isOpen); // 토글 상태 반전
    };

    return (
        <div className="chat-toggle-container">
            {/* 채팅 아이콘 */}
            <button onClick={toggleChat} className="chat-toggle-button">
                <FontAwesomeIcon icon={isOpen ? faTimes : faComments} /> {/* 열려 있으면 닫기 아이콘, 닫혀 있으면 채팅 아이콘 */}
            </button>
            {/* 토글된 상태에 따라 채팅창을 보여줌 */}
            {isOpen && (
                <div className="chat-window">
                    <ChatComponent />
                </div>
            )}
        </div>
    );
};


export default ChatToggleComponent;
