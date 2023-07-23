import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

const useSocket = (conversationId, updateState) => {
    const socket = io('http://localhost:7000');
    const [isConnected, setIsConnected] = useState(socket.connected);

    function joinConversation(conversationId) {
        socket.emit('join conversation', conversationId)
    }

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }


        function onChatMessageEvent(message) {
            updateState((prevChatData) => {
                return {
                    ...prevChatData,
                    messages: [...prevChatData.messages, message]
                }
            })
        }


        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat message', onChatMessageEvent);
        if (conversationId) {
            joinConversation(conversationId)
        }

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chat message', onChatMessageEvent);
        };
    }, []);


    return { socket, isConnected, joinConversation }
}

export default useSocket