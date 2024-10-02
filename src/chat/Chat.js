import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // 서버 주소는 실제 환경에 맞게 설정

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on('message', (payload) => {
            setChat(prev => [...prev, payload]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== "") {
            socket.emit('message', { message });
            setMessage('');
        }
    };

    return (
        <div>
            <h2>실시간 채팅</h2>
            <div className="chat-box">
                {chat.map((payload, index) => (
                    <p key={index}>{payload.message}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지 입력..."
                />
                <button type="submit">보내기</button>
            </form>
        </div>
    );
};

export default ChatComponent;
