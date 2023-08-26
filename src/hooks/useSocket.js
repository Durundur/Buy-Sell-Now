import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';

const useSocket = (updateConversation) => {
    const ws = useRef(null);
    const [isConnectionAlive, setIsConnectionAlive] = useState(false);

    function joinRoom(roomId) {
        ws.current.emit('join room', roomId, (response) => {
            if (response.status === 'ok') setIsConnectionAlive(true)
        });
    }

    function sendRoomMessage(message) {
        ws.current.emit('room message', message)
    }

    useEffect(() => {
        function onConnect() {
            setIsConnectionAlive(true);
        }

        function onDisconnect() {
            setIsConnectionAlive(false);
        }

        function onChatMessageEvent(message) {
            console.log('new room msg', message)
            updateConversation((prevConversation) => {
                return { ...prevConversation, messages: [...prevConversation.messages, message] }
            })
        }

        const socket = io('http://localhost:7000');
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('room message', onChatMessageEvent);
        ws.current = socket;

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('room message', onChatMessageEvent);
        };
    }, []);


    return { isConnectionAlive, joinRoom, sendRoomMessage }
}

export default useSocket