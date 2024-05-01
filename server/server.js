const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

    const {
        updateSettings,
        handleDisconnect,
        handlePlayer,
        getWordFor,
        handleVote,
        handleGame,
        createGameState,
        getState,
        getClientsFromSameRoom,
        getRoomId      
    } = require("./gameManager");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : " http://localhost:3000",
        methods : ["GET", "POST"],
    },
});

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.get('/room', (req, res) => {
    const state = getState(req.params.id);
    if(state){
        res.send(JSON.stringify(state.getPlayers()));
    }else{
        res.status(404).send("Room not found");
    }
});
app.get('/', (_, res) => { res.send("Server is running") });

io.on('connect',(socket)=>{
    console.log("New connection");
    const clientId = socket.id;
    socket.on("joinRoom", (data) =>{
        const msg = handlePlayer(
        {topic : "player",
         subtopic : "add",
         data : data.username,
         roomId : data.roomId,
        },
         data.roomId, clientId);
         socket.join(data.roomId);
         socket.emit("joinedRoom",data.roomId);
         io.to(data.roomId).emit("message", msg);
    });
    socket.on("createRoom",(username) =>{
        console.log("Creating room");
        const roomId = createGameState();
        const msg = handlePlayer(
            {topic : "player",
            subtopic : "add",
            data : username,
            roomId :roomId,
           },
            roomId, clientId
        );
        socket.join(roomId);   
        socket.emit("createdRoom",roomId);
        io.to(roomId).emit("message",msg);
    });
    socket.on("message", (message) => {
        const roomId = message.roomId;
        const state = getState(message?.roomId?.toUpperCase());
        if(!state) return;
        switch(message.topic){
            case 'player' :{
                const resp = handlePlayer(message,roomId, clientId); 
                io.to(roomId).emit("message", resp);
                break;
            }
            case 'settings' :{
                const resp = updateSettings(message, clientId);
                io.to(roomId).emit("message", resp);
                break;
            }
            case 'game':{
                const resp = handleGame(clientId, message);
                io.to(roomId).emit("message", resp);
                if(message.subtopic === 'start'){
                    const roomClients = getClientsFromSameRoom(clientId);
                    roomClients.forEach((client) =>{
                        const word = getWordFor(client, state);
                        client.emit('message',word);
                    });
                }
                break;
            }
            case 'vote':{
                const resp = handleVote(message, clientId);
                io.emit('message', resp);
                break;
            }
            default :{
                io.emit('unkownMessage');
            }
        }
    })

    socket.on("disconnect",()=>{
        const resp = handleDisconnect(clientId);
        const roomId = getRoomId(clientId);
        if(resp.data?.length > 0){
            io.to(roomId).emit('message', resp);
        }
    });
})

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});