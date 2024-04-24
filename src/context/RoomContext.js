import { createContext, useContext } from "react";


export const RoomContext = createContext("");

export const useRoomIdContext = () =>{
    const roomId = useContext(RoomContext);
    if(roomId === undefined){
        throw new Error("No context provided for the room id");
    }
    return roomId;
} 