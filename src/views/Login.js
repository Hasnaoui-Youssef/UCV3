import React from 'react'
import { useState} from 'react'
import { useRoom } from '../context/RoomContext';
import { socket } from '../socket';


export default function Login() {

  const [userName, setUserName] = useState("");
  const room = useRoom();

  const handleJoinRoom = () =>{
    if(!userName || !room.roomId){
      alert("Username or room ID is empty !");
      return;
    }else{
      socket.emit("joinRoom", {username: userName, roomId: room.roomId})
    }
  }
  const handleCreateRoom = () =>{
    if(!userName){
      alert("Username is empty !")
    }else{
      socket.emit("createRoom", userName);
    }
  }
  return (
    <div className='Login'>
      <div className='user-name'>
        <input placeholder='Enter your name..' onChange={(event) =>{
          event.preventDefault();
          setUserName(event.target.value);
        }}/>
      </div>
      <div className='room'>
      <input placeholder='Enter room ID...' onChange={(event) => {
        event.preventDefault();
        room.setRoomId(event.target.value);
      }}/>
      <button onClick={handleJoinRoom}>Join Room</button>
      <br/>
      <button onClick={handleCreateRoom}>Create Room</button>

      </div>
    </div>
  )
}
