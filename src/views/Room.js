import React, {useCallback, useContext, useRef } from 'react'
import { useRoom } from '../context/RoomContext'
import Lobby from '../components/Lobby';
import GameBoard from '../components/GameBoard';
import { GameStateContext, Status } from '../context/GameStateContext';
import AuthService from '../service/auth';
import { socket } from '../socket';


export default function Room() {
  const gameState = useContext(GameStateContext);
  const room = useRoom();
  const textAreaRef = useRef(null);
  


  const copyToClipboard = () =>{
    const text = room.roomId;
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
        <p>{room.roomId}</p>
        <textarea ref={textAreaRef} style={{ display: 'none' }} />
        <button id='copy-room-id' onClick={copyToClipboard}> copy to clipboard</button>
      </div>
        {gameState.getStatus()===Status.LOBBY && <Lobby/>}
        {gameState.getStatus()!==Status.LOBBY && <GameBoard/>}
    </div>
  )
}
