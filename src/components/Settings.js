import React, { useContext } from 'react'
import { useSocket } from '../hooks/useSocket'
import { useRoomIdContext } from '../context/RoomContext';
import { GameStateContext } from '../context/GameStateContext';
// TODO : add limitations to the increment and decrement numbers using the current number of players in the game

export default function Settings() {
  const socket = useSocket();
  /**
   *@var {GameState} gameState 
   */
  const gameState = useContext(GameStateContext); 
  const roomId = useRoomIdContext();
  function updateServerValue(subtopic , data){
    socket.emit("message", {
      topic : 'settings',
      subtopic,
      data,
      roomId
    });
  }
  const handleMrWhiteIncrement = () => {
    //server side
    updateServerValue('white','increment');
    //client side
    gameState.addMrWhite();
  }
  const handleMrWhiteDecrement = () => {
    updateServerValue('white','decrement');
    gameState.removeMrWhite();
  }
  const handleUnderCoverIncrement = () => {
    updateServerValue('undercover','increment');
    gameState.addUndercover();
  }
  const handleUnderCoverDecrement = () => {
    updateServerValue('undercover','decrement');
    gameState.removeUndercover();
  }
  

  return (
    <div className='settings'>
      <div className='undercover-settings'>
        <p>UnderCover : {gameState.underCoverCount}</p>
        <button onClick={handleUnderCoverDecrement} className='decrement-uc'> - </button>
        <button onClick={handleUnderCoverIncrement} className='increment-uc'> + </button>
      </div>


      <div className='mr-white-settings'>
        <p>Mr White : {gameState.mrWhiteCount}</p>
        <button onClick={handleMrWhiteDecrement} className='decrement-white'> - </button>
        <button onClick={handleMrWhiteIncrement} className='increment-white'> + </button>
      </div>

    </div>
  )
}
