import React, { createContext,useState } from "react";

export const VillainsContext = createContext({
    underCoverCount : 0,
    mrWhiteCount : 0,
    setMrWhiteCount : () => {},
    setUnderCoverCount : () => {}
});

export function VillainProvider({children}){
    const [underCoverCount, setUCCount] = useState(0);
    const [mrWhiteCount, setMWCount] = useState(0);
    const setMrWhiteCount = (newCount)=>{
        setMWCount(newCount);
    }
    const setUnderCoverCount = (newCount)=>{
        setUCCount(newCount);
    }
    return(
        <VillainsContext.Provider
            value={{underCoverCount, mrWhiteCount,setMrWhiteCount,setUnderCoverCount}}>
                {children}
        </VillainsContext.Provider>
    )
}