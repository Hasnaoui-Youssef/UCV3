import './App.css';
import Login from './views/Login';
import {Routes, Route, Navigate} from 'react-router-dom';
import Room from './views/Room';
import RequireRoomId from './components/RequireRoomId'; 


function App() {

  
  return (
    <div className="App">
        <Routes>
            <Route
                path="/"
                element = {<Navigate to="/login" replace/>}
            />
            <Route
                path = "/login"
                element = {<Login/>}
            />
            <Route
                path = "/room"
                element = {<RequireRoomId children={<Room/>}/>}
            />
        </Routes>
    </div>
  );
}

export default App;
