import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid'; // UUID 라이브러리

const ChatComponent = ({ roomId }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const messagesEndRef = useRef(null);

    // 메시지 중복 방지를 위한 Set (messageId로 확인)
    const processedMessageIds = useRef(new Set());

    useEffect(() => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log('WebSocket 연결 해제');
            });
        }

        if (!roomId) {
            return;
        }

        const socket = new SockJS('http://localhost:9090/ws');
        const stomps = Stomp.over(socket);
        stomps.reconnectDelay = 5000;

        stomps.connect({}, (frame) => {
            console.log('connected', frame);

            // 메시지 구독
            const subscription = stomps.subscribe(`/topic/messages/${roomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log("Received message:", receivedMessage);

                // 중복 메시지 방지: 동일한 messageId가 없는 경우만 추가
                if (!processedMessageIds.current.has(receivedMessage.messageId)) {
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    processedMessageIds.current.add(receivedMessage.messageId); // messageId 추가
                } else {
                    console.log('중복된 메시지 무시:', receivedMessage.messageId);
                }
            });

            setStompClient(stomps);

            return () => {
                subscription.unsubscribe();
                stomps.disconnect();
                console.log('구독 해제 및 WebSocket 연결 해제');
            };
        });
    }, [roomId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        if (stompClient && inputMessage.trim() && isUsernameSet) {
            const messageObj = {
                sender: username,
                content: inputMessage,
                roomId: roomId,
                messageId: uuidv4() // 고유한 UUID를 생성하여 messageId로 사용
            };
            stompClient.send(`/app/chat/${roomId}`, 
                { 'content-type': 'application/json' }, 
                JSON.stringify(messageObj));
            setInputMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const setUser = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
        }
    };

    return (
        <div>
            <h2>Chat Room: {roomId}</h2>

            {!isUsernameSet ? (
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <button onClick={setUser}>Set Name</button>
                </div>
            ) : (
                <div>
                    <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <strong>{message.sender}: </strong>{message.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;