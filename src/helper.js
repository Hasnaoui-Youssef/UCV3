
export function getAddPlayer(message, roomId){
    return {
        topic : 'player',
        subtopic : 'add',
        data : message,
        roomId
    };
}

export function getPlayers(roomId){
    return {
        topic : 'player',
        subtopic: 'get',
        roomId
    };
}

export function getSettings(roomId){
    return{
        topic : 'settings',
        subtopic : 'get',
        roomId
    };
}

export function getAddWord(word, roomId){
    return{
        topic : 'word',
        subtopic : 'get',
        data : word,
        roomId
    };
}

export function guessWord(word, roomId){
    return{
        topic : 'vote',
        subtopic : 'get',
        data : word,
        roomId
    };
}

export function getGameInfo(roomId){
    return{
        topic : 'game',
        subtopic : 'update',
        roomId
    };
}

export function getVoteAgainst(player, roomId){
    return {
        topic : 'vote',
        subtopic : 'against',
        data : player,
        roomId
    };
}

export function getVoteResult(roomId){
    return{
        topic : 'vote',
        subtopic : 'result',
        roomId
    };
}

export function getStartGame(roomId){
    return{
        topic : 'game',
        subtopic : 'start',
        roomId
    };
}
//TODO : add the rest of the functions and the logic for the message handling and transfer the function to the room.js file
export function handleMessage(message){
    if(message.topic === 'player'){
        if(message.subtopic === 'update'){

        }
    }else if(message.topic === 'settings'){
        
    }else if(message.topic === 'game'){

    }else if(message.topic === 'vote'){
        
    }
}
