import React from "react";
import {Navigate, useLocation} from 'react-router-dom';  
import { useRoomIdContext } from "../context/RoomContext";

function RequireRoomId({children}){
    const location = useLocation();
    const roomId =useRoomIdContext() ;
    if(!roomId){
        return(
            <Navigate to="/login" state={{ from : location}} replace/>
        )
    }
    return children;
}


export default RequireRoomId