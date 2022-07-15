import React from 'react'

const soundBank = {
  'Q': {
    name: 'Heater 1',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  'W': {
    name: 'Heater 2',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  'E': {
    name: 'Heater 4',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  'A': {
    name: 'Heater 3',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  'S': {
    name: 'Clap',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  'D': {
    name: 'Open Hi-Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  'Z': {
    name: 'Kick n Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  'X': {
    name: 'Kick',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  'C': {
    name: 'Closed Hi-Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
}

function Title() {
  return(
    <h1 className='p-2 font-bold text-xl text-[#E1E5F2]'>
      FreeCodeCamp Drum Machine
    </h1>
  )
}

function Credit() {
  return(
    <p className='text-[#E1E5F2]'>
      Made by Alfian
    </p>
  )
}

function Control({power, setPower, vol, setVol}) {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
        <input type="checkbox" className="sr-only" checked={power} onClick={() => setPower(!power)}/>
        <div className={`block w-14 h-8 rounded-full ${power ? "bg-gray-600 " : "bg-[#E1E5F2]"}`}></div>
        <div className={`absolute left-1 top-1 bg-[#1F7A8C] w-6 h-6 rounded-full transition ${power ? "" : "translate-x-full duration-300 ease-in-out"} `}></div>
        </div>
      </label>
    </div>
  )
}

function App() {
  const [power, setPower] = React.useState(false)
  const [vol, setVol] = React.useState(0.5)

  return (
      <div 
        id='drum-machine'
        className='flex flex-col justify-center items-center h-screen bg-none'>
        <Title />
        <Control power={power} setPower={setPower} />

        <Credit />
      </div>
  )
}

export default App
