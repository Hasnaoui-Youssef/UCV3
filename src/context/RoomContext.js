import { createContext, useCallback, useContext, useState } from "react";
import AuthService from "../service/auth";

export const RoomContext = createContext(null);

export const RoomProvider = ({children}) =>{
    const [roomId, setRoomId] = useState(null);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const joinRoom = useCallback((roomId) => AuthService.joinRoom({roomId}), [])
    const createRoom = useCallback(() => AuthService.createRoom(), [])
    

    return <RoomContext.Provider
            value={{roomId,joinedRoom, setJoinedRoom, setRoomId, joinRoom, createRoom}}
            children={children}   
        />;
} 

export const useRoom = () =>  useContext(RoomContext);
export const useRoomId = () => useContext(RoomContext).roomId;
