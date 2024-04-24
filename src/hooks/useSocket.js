import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = () =>{
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        const newSocket = io.connect("http://localhost:3001");
        setSocket(newSocket);
        return ()=>{newSocket.disconnect();};
    },[]);
    return socket;
};
