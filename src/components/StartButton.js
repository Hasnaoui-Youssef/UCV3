import React,{useContext} from 'react'
import * as payload from '../helper';
import {useSocket} from '../hooks/useSocket'
import { useRoomIdContext } from '../context/RoomContext';
import { GameStateContext } from '../context/GameStateContext';
export default function StartButton() {
  const gameState = useContext(GameStateContext);
  const canStartGame = ()=>{
    if(gameState.getUndercoverCount() + gameState.getMrWhiteCount() >= gameState.getPlayers().length 
    || gameState.getPlayers().length < 3){
      return false;
    }
    return true;
  }
  const socket = useSocket();
  const roomId = useRoomIdContext();
  const handleClick = () =>{
    if(canStartGame()){
      // server
      socket.emit("message", payload.getStartGame(roomId));
      gameState.start();
    }else{
      alert("Not enough players to start the game")
    }
  }
  return (
    <div className='start-button'>
      <button onClick={handleClick}> Start Game</button>
    </div>
  )
}
