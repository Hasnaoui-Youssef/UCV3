import { createContext } from "react";



export const Roles = {
    Mr_White : "MrWhite",
    UnderCover : "UnderCover",
    Civilian : "Civilian"
}

export const Status = {
    LOBBY : "LOBBY",
    PLAYING : "PLAYING",
    VOTING : "VOTING",
    FINISHED_VOTING : "FINISHED VOTING",
    MR_WHITE_GUESSING : "MR_WHITE_GUESSING",
    WON : "WON",
    LOST : "LOST" 
};

class GameState {
    constructor() {
      this.playerList = [];
      //this.clientToPlayer = new Map();
      this.playerToWords = new Map();
      this.playerToRole = new Map();
      this.underCoverCount = 0;
      this.mrWhiteCount = 0;
      this.remainingVilains = 0;
      this.remainingCivilians = 0;
      this.status = Status.LOBBY;
      this.turn = 0;
      this.playersOrder = [];
      this.playerToAssignedWord = new Map();
      this.votedOutPlayers = [];
      this.currentPlayersVote = new Map();
      this.originalPlayerNumber = 0;
      this.goodWord = '';
      this.undercoverWord = '';
    }
  //To be changed
    addPlayer(player) {
      this.playerList.push(player);
    }
  
    getPlayers() {
      return this.playerList;
    }
  
    getUndercoverCount() {
      return this.underCoverCount;
    }
  
    getMrWhiteCount() {
      return this.mrWhiteCount;
    }
  
    removePlayer(playerName) {
      if(this.playerList.find(playerName)){
      const role = this.playerToRole.get(playerName);
      if (role === Roles.CIVILIAN) {
        this.remainingCivilians -= 1;
      } else {
        this.remainingVilains -= 1;
      }
      this.playerToRole.delete(playerName);
      this.playerToWords.delete(playerName);
      this.playerToAssignedWord.delete(playerName);
      this.currentPlayersVote.delete(playerName);
      this.votedOutPlayers = this.votedOutPlayers.filter((p) => p !== playerName);
      if (this.playerToRole.size === 0) {
        this.resetState();
      }}
      return this;
    }
  
    addUndercover() {
      if (this.underCoverCount + this.mrWhiteCount < this.playerList.size) {
        this.underCoverCount += 1;
        this.remainingVilains += 1;
      }
    }
  
    guess(word) {
      if (word.toUpperCase() !== this.goodWord.toUpperCase()) {
        if (this.remainingVilains === 0) {
          this.status = Status.WON;
        } else {
          this.status = Status.PLAYING;
        }
      } else {
        this.status = Status.LOST;
      }
      return this;
    }
  
    vote(player, against) {
      if (this.status === Status.DRAW_VOTE || this.status === Status.VOTING) {
        if (this.status === Status.DRAW_VOTE) {
          this.resetCurrentVote();
          this.status = Status.VOTING;
        }
        const againstExists = this.playerToAssignedWord.has(against);
        if (againstExists && player !== against) {
          this.currentPlayersVote.set(player, against);
          if (this.currentPlayersVote.size + this.votedOutPlayers.length === this.originalPlayerNumber) {
            this.status = Status.FINISHED_VOTING;
          }
        }
      }
    }
  
    getStatus() {
      return this.status;
    }
    resetCurrentVote() {
        this.currentPlayersVote = new Map();
      }
    
    getPlayersWhoVoted() {
        return Array.from(this.currentPlayersVote).map((pair) => pair[0]);
      }
    
      getVotedOutPlayers() {
        return this.votedOutPlayers;
      }
    
      computeVoteResult() {
        if (this.status !== Status.FINISHED_VOTING) {
          return undefined;
        }
        const votesAgainst = new Map();
        let draw = false;
        let maxVote = 0;
        let playerOut;
    
        Array.from(this.currentPlayersVote)
          .forEach((pair) => {
            const votedOutPlayer = pair[1];
            if (!votesAgainst.has(votedOutPlayer)) {
              votesAgainst.set(votedOutPlayer, 0);
            }
            const newCount = votesAgainst.get(votedOutPlayer) + 1;
            votesAgainst.set(votedOutPlayer, newCount);
            if (newCount > maxVote) {
              maxVote = newCount;
              draw = false;
              playerOut = votedOutPlayer;
            } else if (newCount === maxVote) {
              draw = true;
            }
          });
    
        const voteDetails = Array.from(votesAgainst);
        if (draw) {
          this.status = Status.DRAW_VOTE;
          return {
            turn: this.turn,
            result: 'DRAW',
            voteDetails,
            gameState: this.status,
          };
        }
    
        if (this.votedOutPlayers.indexOf(playerOut) === -1) {
          this.votedOutPlayers.push(playerOut);
          const role = this.playerToRole.get(playerOut);
          if (role === Roles.Mr_White || role === Roles.UnderCover) {
            this.remainingVilains -= 1;
          } else {
            this.remainingCivilians -= 1;
          }
          if (role === Roles.Mr_White) {
            this.status = Status.MR_WHITE_GUESSING;
          } else if (this.remainingVilains === 0) {
            this.status = Status.WON;
          } else if (this.remainingCivilians === 1) {
            this.status = Status.LOST;
          } else {
            this.status = Status.PLAYING;
          }
        }
        this.skipVotedOutPlayers();
        const finishedStatus = this.status === Status.WON || this.status === Status.LOST;
        return {
          turn: this.turn,
          result: 'OUT',
          playerOut,
          playerOutRole: this.playerToRole.get(playerOut),
          voteDetails,
          gameState: this.status,
          goodWord: finishedStatus ? this.goodWord : undefined,
          undercoverWord: finishedStatus && this.underCoverCount > 0 ? this.undercoverWord : undefined,
        };
      }
    
      removeUndercover() {
        if (this.underCoverCount > 0) {
          this.underCoverCount -= 1;
          this.remainingVilains -= 1;
        }
      }
    
      addMrWhite() {
        if (this.underCoverCount + this.mrWhiteCount < this.clientToPlayer.size) {
          this.mrWhiteCount += 1;
          this.remainingVilains += 1;
        }
      }
    
      removeMrWhite() {
        if (this.mrWhiteCount > 0) {
          this.mrWhiteCount -= 1;
          this.remainingVilains -= 1;
        }
      }
    
      getPlayerToWords() {
        return this.playerToWords;
      }
    
      clearWords() {
        this.playerToWords = new Map();
      }
    
      start() {
        this.renewWord();
        this.votedOutPlayers = [];
        this.status = Status.PLAYING;
        this.originalPlayerNumber = this.playerList.size;
        this.remainingVilains = this.underCoverCount + this.mrWhiteCount;
        this.remainingCivilians = this.originalPlayerNumber - this.remainingVilains;
      }
      getTurn() {
        return this.turn;
      }
      getPlayerAt(turn){
        return this.playersOrder[turn % this.playersOrder.length];
      }
      addWord(word, player){
        const playerTurn = this.getPlayerAt(this.turn) === player;
        if(this.status !== Status.VOTING && playerTurn && word){
            this.playerToWords.get(this.getPlayerAt(this.turn)).push(word);
            this.turn += 1;
            if(this.turn !== 0 && this.turn% this.originalPlayerNumber === 0){
                this.resetCurrentVote();
                this.status = Status.VOTING;
            }
            this.skipVotedOutPlayers();
        }
      }
      getWord(player){
        return this.playerToAssignedWord.get(player);
      }
      setPlayersOrder() {
        //To be Redone : Get the order from the server
      }

      initPlayerToWords(){
        this.playersOrder.forEach((player) => {
            this.playerToWords.set(player, []);
        });
      }

      skipVotedOutPlayers(){
        while(this.votedOutPlayers.indexOf(this.getPlayerAt(this.turn)) !== -1){
            this.turn += 1;
            if(this.turn !== 0  &&  this.turn%this.originalPlayerNumber === 0){
                this.resetCurrentVote();
                this.status = Status.VOTING;
            }
        }
      }
      renewWord(){
        this.initPlayerToWords();
        this.turn = 0;
      }
      resetState(){
        this.turn = 0;
        this.underCoverCount = 0;
        this.mrWhiteCount = 0;
        this.originalPlayerNumber = 0;
        this.remainingVilains = 0;
        this.currentPlayersVote = new Map();
        this.votedOutPlayers = [];
        this.status = Status.LOBBY;
      }
}


export const GameStateContext = createContext(new GameState());

export function GameStateProvider({children}){
  const gameState = new GameState();
  return(
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  )
}