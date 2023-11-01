import { io, type Socket } from 'socket.io-client';
import { useState, useEffect, useRef, Dispatch } from 'react';
import { ConversationChatDataType, ConversationChatMessageType } from '../types/ConversationDataType';
const baseURL = process.env.REACT_APP_API as string;

export interface WebSocketChatMessage {
    conversationId: string
    message: string,
    author: string,
}

const useSocket = (updateConversation: Dispatch<React.SetStateAction<ConversationChatDataType | undefined>>) => {
    const ws = useRef<Socket | null>(null);
    const [isConnectionAlive, setIsConnectionAlive] = useState(false);

    function joinRoom(roomId: string) {
        ws.current?.emit('join room', roomId, (response: {status: string}) => {
            if (response.status === 'ok') 
                setIsConnectionAlive(true)
        });
    }

    function sendRoomMessage(message: WebSocketChatMessage) {
        ws.current?.emit('room message', message)
    }

    useEffect(() => {
        function onConnect() {
            setIsConnectionAlive(true);
        }

        function onDisconnect() {
            setIsConnectionAlive(false);
        }

        function onChatMessageEvent(message: ConversationChatMessageType) {
            updateConversation((prevConversation) => {
                if(prevConversation){
                    return { ...prevConversation, messages: [...prevConversation.messages, message] }
                }
            })
        }

        const socket = io(baseURL);
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