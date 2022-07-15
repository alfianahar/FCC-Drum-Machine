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

  React.useEffect(() => {
    const input = document.querySelector(".range");
  
  function setBackgroundSize(input) {
    input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
  }
  
  setBackgroundSize(input);
  
  input.addEventListener("input", () => setBackgroundSize(input));
  
  function getBackgroundSize(input) {
    const min = +input.min || 0;
    const max = +input.max || 100;
    const value = +input.value;
  
    const size = (value - min) / (max - min) * 100;
  
    return size;
  }
  }, [vol]);
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <label className="flex flex-col items-center cursor-pointer mb-4">
        <span className='p-2 font-bold text-[#E1E5F2]'>POWER</span>
        <div className="relative">
          <input type="checkbox" className="sr-only" checked={power} onClick={() => setPower(!power)}/>
          <div className={`block w-14 h-8 rounded-full ${power ? "bg-gray-600 " : "bg-[#E1E5F2]"}`}></div>
          <div className={`absolute left-1 top-1 bg-[#1F7A8C] w-6 h-6 rounded-full transition ${power ? "" : "translate-x-full duration-300 ease-in-out"} `}></div>
        </div>
      </label>
      <label className="flex items-center cursor-pointer">
        <input type='range' min={0} max={1} step={0.01} defaultValue={vol} onChange={e => setVol(Number(e.target.value))} className="range" />
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
        <div className="flex flex-col p-6 border rounded-md">
          <Control power={power} setPower={setPower} vol={vol} setVol={setVol} />

        </div>

        <Credit />
      </div>
  )
}

export default App
