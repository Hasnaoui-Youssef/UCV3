import { createContext, useState } from "react";
import { socket } from "../socket";


export const Roles = {
    Mr_White : "MrWhite",
    UnderCover : "UnderCover",
    Civilian : "Civilian"
}

export const Status = {
    LOBBY : "LOBBY",
    PLAYING : "PLAYING",
    VOTING : "VOTING",
    FINISHED_VOTING : "FINISHED VOTING",
    MR_WHITE_GUESSING : "MR_WHITE_GUESSING",
    WON : "WON",
    LOST : "LOST" 
};






