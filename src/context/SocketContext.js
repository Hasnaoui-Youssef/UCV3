import React, {createContext, useRef,useEffect, useContext} from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext(null);

export const SocketProvider = ({children}) => {
    const socket =useRef(null);
    useEffect(() => {
        socket.current = io("http://localhost:3001");
    },[])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>   
    )
}

export const useSocket = () => useContext(SocketContext);