import React ,{useContext}from 'react'
import { GameStateContext } from '../context/GameStateContext';
export default function Players() {
    const gameState = useContext(GameStateContext);
    const players = gameState.playerList;
  return (
    <div className='player-list'>
        <ul>
            {players.map((player, index) => {
                return <li key={index}>{player}</li>
            })}
        </ul>
    </div>
  )
}
