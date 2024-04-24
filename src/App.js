import './App.css';
import Login from './views/Login';
import { useState } from 'react';
import Room from './views/Room';
import { RoomContext } from './context/RoomContext';
import { useSocket } from './hooks/useSocket';
import { GameStateProvider } from './context/GameStateContext';

function App() {
  const socket = useSocket();
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const handleLogin = (data) =>{
    const {username,joiningRoom} = data;
    if(joiningRoom.room){
      const roomId = joiningRoom.room;
      socket.emit("joinRoom", {username, roomId});
    }else{
      socket.emit("createRoom", username);
    }
  }
  socket.on("joinedRoom", (roomID) =>{
    setJoinedRoom(true);
    setRoomId(roomID);
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
