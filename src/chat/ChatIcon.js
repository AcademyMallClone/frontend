import React, { useState } from 'react';
import ChatComponent from './ChatComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import './chatIcon.scss';

const ChatToggleComponent = () => {
    const [isOpen, setIsOpen] = useState(false); // 토글 상태 관리
    const [roomId, setRoomId] = useState(null);  // 생성된 채팅방 ID 관리

    // Spring Boot의 createChatRoom API 호출하여 방 생성
    const createChatRoom = async () => {
        try {
            const response = await fetch('http://localhost:9090/chat/createRoom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomName: 'New Chat Room' })  // 방 이름을 JSON으로 전송
            });
            const roomId = await response.text();  // 서버로부터 방 ID 받아옴
            setRoomId(roomId);  // roomId 상태에 저장
            
            // room URL 생성 및 콘솔에 출력
            const roomUrl = `http://localhost:9090/chat/room/${roomId}`;
            console.log("Room Created with URL:", roomUrl); // URL 출력
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    // 채팅 토글 및 방 생성
    const toggleChat = async () => {
        if (!isOpen && !roomId) {
            // 채팅창이 열릴 때만 방을 생성
            await createChatRoom();
        }
        setIsOpen(!isOpen); // 토글 상태 반전
    };

    return (
        <div className="chat-toggle-container">
            {/* 채팅 아이콘 */}
            <button onClick={toggleChat} className="chat-toggle-button">
                <FontAwesomeIcon icon={isOpen ? faTimes : faComments} />
            </button>
            {/* 토글된 상태에 따라 채팅창을 보여줌 */}
            {isOpen && roomId && ( // 방 ID가 존재할 때만 채팅 컴포넌트 표시
                <div className="chat-window">
                    <ChatComponent roomId={roomId} /> {/* ChatComponent에 방 ID 전달 */}
                </div>
            )}
        </div>
    );
};

export default ChatToggleComponent;