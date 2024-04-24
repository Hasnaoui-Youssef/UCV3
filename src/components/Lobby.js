import React from 'react'
import StartButton from './StartButton'
import Players from './Players'
import Settings from './Settings'
// Print out player list
export default function Lobby() {
  return (
    <div>
        <Settings/>
        <Players/>
        <StartButton/>
    </div>
  )
}
