import './App.css';
import Login from './views/Login';
import Room from './views/Room';
import { useRoom } from './context/RoomContext';
import { GameStateProvider } from './context/GameStateContext';
import { socket } from './socket';
import { useRef, useEffect } from 'react';
//import {Routes, Route, Navigate} from 'react-router-dom';

function App() {
  //
  const playerList = useRef([]);
  if(!socket){
    throw new Error("Socket is not connected");
  }
  const room = useRoom();
  useEffect(()=>{
      socket.on("joinedRoom", (roomID) =>{
        room.setJoinedRoom(true);
        room.setRoomId(roomID);    
      });
      socket.on("createdRoom", (roomID) =>{
        room.setJoinedRoom(true);
        room.setRoomId(roomID);
      });
      
      socket.on("message", (msg) =>{
        
      })
  },[])
  return (
    <div className="App">
            { !room.joinedRoom && <Login />}
            <GameStateProvider>
              {room.joinedRoom && <Room />}
            </GameStateProvider>
    </div>
  );
}

export default App;
