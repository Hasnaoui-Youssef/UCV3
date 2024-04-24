import { createContext, useContext } from "react";

const StartGameContext = createContext(false);

export const useStartGameContext = ()=>{
    let gameStarted = useContext(StartGameContext);

    if(!gameStarted){
        throw new Error("No context for the start game element");
    }
    return gameStarted;
}