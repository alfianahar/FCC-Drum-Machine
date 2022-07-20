import React from 'react';

const soundBank = {
  Q: {
    name: 'Heater 1',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  W: {
    name: 'Heater 2',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  E: {
    name: 'Heater 4',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  A: {
    name: 'Heater 3',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  S: {
    name: 'Clap',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  D: {
    name: 'Open Hi-Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  Z: {
    name: 'Kick n Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  X: {
    name: 'Kick',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  C: {
    name: 'Closed Hi-Hat',
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
};

function Title() {
  return (
    <h1 className="p-2 mb-2 font-bold text-xl text-[#E1E5F2]">
      FreeCodeCamp Drum Machine
    </h1>
  );
}

function Credit() {
  return (
    <p className="p-2 mt-2 text-[#E1E5F2]">
      Made by{' '}
      <span className="font-bold">
        <a href="https://www.alfianahar.com/bio" target="_blank">
          Alfian Nahar
        </a>
      </span>
    </p>
  );
}

function Control({ power, setPower, vol, setVol, display, setDisplay }) {
  React.useEffect(() => {
    const input = document.querySelector('.range');

    function setBackgroundSize(input) {
      input.style.setProperty(
        '--background-size',
        `${getBackgroundSize(input)}%`
      );
    }

    setBackgroundSize(input);

    input.addEventListener('input', () => setBackgroundSize(input));

    function getBackgroundSize(input) {
      const min = +input.min || 0;
      const max = +input.max || 100;
      const value = +input.value;

      const size = ((value - min) / (max - min)) * 100;

      return size;
    }
  }, []);

  React.useEffect(() => {
    const volDisp = Math.round(vol * 100);
    function clearDisp(volDisp) {
      setDisplay('volume: ' + volDisp);
      setTimeout(() => setDisplay(''), 1000);
    }

    clearDisp(volDisp);
  }, [vol]);

  return (
    <div className="flex flex-col items-center justify-center mt-6 lg:mt-0 lg:ml-8 ">
      <label className="flex flex-col items-center cursor-pointer mb-4">
        <span className=" font-bold text-[#E1E5F2]">POWER</span>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={power}
            onClick={() => setPower(!power)}
          />
          <div
            className={`block w-14 h-8 rounded-full ${
              power ? 'bg-[#777] ' : 'bg-[#E1E5F2]'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-[#1F7A8C] border border-2 w-6 h-6 rounded-full transition ${
              power ? '' : 'translate-x-full duration-300 ease-in-out'
            } `}
          ></div>
        </div>
      </label>
      <div id="display" className="p-1 mb-4 border border-2 rounded-md w-3/4 bg-[#E1E5F2] text-center h-9">
        <span>{display}</span>
      </div>
      <label className="flex items-center cursor-pointer">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={vol}
          onChange={(e) => setVol(Number(e.target.value))}
          className="range"
        />
      </label>
    </div>
  );
}

function Pad({ pad, play, power }) {
  // console.log(soundBank[pad])
  return (
    <button
      type="button"
      className="drum-pad border-2 rounded-md text-white p-10 h-0 w-0 flex justify-center items-center"
      onClick={play}
      id={soundBank[pad]}
      disabled={power}
    >
      {pad}
      <audio
        id={pad}
        src={soundBank[pad].source}
        className="clip"
      ></audio>
    </button>
  );
}

function Pads({ setDisplay, power, vol, isActive }) {
  const keypads = Object.keys(soundBank);

  const play = e => {
    const keyboardKey = e.key ? e.key.toUpperCase() : e.target.childNodes[1].id;
    if (e.key && !keypads.includes(keyboardKey)) return;
    setDisplay(soundBank[keyboardKey].name);
    
    const sound = document.getElementById(keyboardKey);
    const el = sound.parentElement
    el.classList.add('bg-[#E1E5F2]', 'text-black', 'shadow-[#022B3A]/50')
    setTimeout(() => el.classList.remove('bg-[#E1E5F2]', 'text-black', 'shadow-[#022B3A]/50'), 100);
    sound.currentTime = 0;
    sound.volume = vol;
    sound.play();
  };

  React.useEffect(() => {
    if (power) {
      return;
    } else {
      window.addEventListener('keydown', play);
    }
    return () => window.removeEventListener('keydown', play);
  }, [power, vol]);

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {keypads.map((pad, id) => {
        return <Pad key={pad + id} pad={pad} play={play} power={power} />;
      })}
    </div>
  );
}

function App() {
  const [power, setPower] = React.useState(false);
  const [vol, setVol] = React.useState(0.5);
  const [display, setDisplay] = React.useState('');

  return (
    <div
      id="drum-machine"
      className="flex flex-col justify-center items-center min-h-screen bg-none"
    >
      <Title />
      <div className="flex flex-col lg:flex-row p-6 border rounded-md bg-[#1F7A8C]/70 min-h-max">
        <Pads setDisplay={setDisplay} power={power} vol={vol} />
        <Control
          power={power}
          setPower={setPower}
          vol={vol}
          setVol={setVol}
          display={display}
          setDisplay={setDisplay}
        />
      </div>

      <Credit />
    </div>
  );
}

export default App;
