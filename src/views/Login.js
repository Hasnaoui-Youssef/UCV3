import React from 'react'
import { useState} from 'react'

export default function Login({onLogin}) {

  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joiningRoom, setJoinRoom] = useState(null);

  const handleJoinRoom = () =>{
    if(!userName || !roomId){
      alert("Username or room ID is empty !");
    }else{
      setJoinRoom({room : roomId});
      onLogin({userName, joiningRoom});
    }
  }
  const handleCreateRoom = () =>{
    if(!userName){
      alert("Username is empty !")
    }else{
      setJoinRoom(null);
      onLogin({userName, joiningRoom});
    }
  }
  return (
    <div className='Login'>
      <div className='user-name'>
        <input placeholder='Enter your name..' onChange={(event) =>{
          setUserName(event.target.value);
        }}/>
      </div>
      <div className='room'>
      <input placeholder='Enter room ID...' onChange={(event) => {
        setRoomId(event.target.value);
      }}/>
      <button onClick={handleJoinRoom}>Join Room</button>
      <br/>
      <button onClick={handleCreateRoom}>Create Room</button>

      </div>
    </div>
  )
}
