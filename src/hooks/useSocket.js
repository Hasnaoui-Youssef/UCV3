import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = () =>{
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return ()=>{newSocket.disconnect();};
    },[]);
    return socket;
};
