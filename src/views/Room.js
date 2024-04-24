import React, {useContext, useRef } from 'react'
import { useRoomIdContext } from '../context/RoomContext'
import Lobby from '../components/Lobby';
import GameBoard from '../components/GameBoard';
import { GameStateContext, Status } from '../context/GameStateContext';
export default function Room() {
  const gameState = useContext(GameStateContext);
  const roomId = useRoomIdContext();

  const textAreaRef = useRef(null); 
  const copyToClipboard = () =>{
    const text = roomId;
    textAreaRef.current.value = text;
    textAreaRef.current.select();
    navigator.clipboard.writeText(text).then(()=>{
      alert("roomId copied succesfully !");
    },(err) =>{
      alert("Unable to copy roomID, Error :  ", err);
    });
  }

  return (
    <div className='room'>
      <div className='room-id'>
        <p>{roomId}</p>
        <button id='copy-room-id' onClick={copyToClipboard}> copy to clipboard</button>
      </div>
        {gameState.getStatus()===Status.LOBBY && <Lobby/>}
        {gameState.getStatus()!==Status.LOBBY && <GameBoard/>}
    </div>
  )
}
