import './App.css';
import Login from './views/Login';
import { useState } from 'react';
import Room from './views/Room';
import { RoomContext } from './context/RoomContext';
import { useSocket } from './hooks/useSocket';
import { GameStateProvider } from './context/GameStateContext';
import io from 'socket.io-client';

function App() {
  const socket = io.connect("http://localhost:3001");
  if(!socket){
    throw new Error("Socket is not connected");
  }
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const handleLogin = (data) =>{
    const username = data.userName;
    if (data.joiningRoom){
      const roomId = data.joiningRoom.room;
      socket.emit("joinRoom", {username, roomId});
    }else{
      socket.emit("createRoom", username);
    }
  }
  socket.on("joinedRoom", (roomID) =>{
    setJoinedRoom(true);
    setRoomId(roomID);
  })
  socket.on("message", (msg) =>{
    console.log(msg);
  })
  return (
    <div className="App">
      {!joinedRoom && <Login onLogin={handleLogin}/>}
      <GameStateProvider>
        <RoomContext.Provider value={roomId}>
        {joinedRoom && <Room />}
        </RoomContext.Provider>
      </GameStateProvider>
    </div>
  );
}

export default App;
