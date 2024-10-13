import React, { useState } from 'react';
import ChatComponent from './ChatComponent'; // ChatComponent는 기존의 WebSocket을 처리하는 컴포넌트
import './ChatRoom.scss'; // 추가된 스타일 파일

const ChatRoom = () => {
    const [roomId, setRoomId] = useState(''); // 사용자가 입력한 roomId 저장

    const handleJoinRoom = () => {
        if (roomId) {
            console.log(`Joining room: ${roomId}`);
        }
    };

    return (
        <div className="chat-room-container">
            <h2>Enter Chat Room</h2>
            <div className="input-container">
                <input 
                    type="text" 
                    className="room-input"
                    placeholder="Enter Room ID" 
                    value={roomId} 
                    onChange={(e) => setRoomId(e.target.value)} 
                />
                <button className="join-button" onClick={handleJoinRoom}>Join Room</button>
            </div>
            {roomId && <ChatComponent roomId={roomId} />}
        </div>
    );
};

export default ChatRoom;