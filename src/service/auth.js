import axios from 'axios';

const joinRoom = ({roomId}) => {
    axios.get(`http://localhost:3001/room`,{roomId})
    .then(resp => resp.data);
}

const createRoom = () => {
    axios.post('http://localhost:3001/room')
    .then(resp => resp.data);
}

const AuthService = {createRoom, joinRoom};
export default AuthService;
