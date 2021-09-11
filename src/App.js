import './App.css'
import { ReactComponent as TempodoroLogo } from './svg/tempodoro.svg'
import { ReactComponent as BackgroundWave } from './svg/background_wave_long.svg'
import Timer from './Timer'
import Controls from './Controls'
import { useState } from 'react'
function App() {
  const [time, setTime] = useState(1500)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(true)
  const [interval, setIntervalValue] = useState(null)

  const play = timeAmount => {
    if (paused || stopped) {
      if (time === 0) setTime(timeAmount || 1500)
      setStopped(false)
      setPaused(false)
      setIntervalValue(
        setInterval(
          () =>
            setTime(t => {
              if (t === 0) {
                setIntervalValue(v => clearInterval(v) || null)
                setStopped(true)
                return 0
              }
              console.log(paused)
              return t - 1
            }),
          1000
        )
      )
    }
  }

  const stop = () => {
    setStopped(true)
    clearInterval(interval)
    setTime(0)
  }
  const pause = () => {
    setPaused(true)
    clearInterval(interval)
  }

  const resume = () => {
    setPaused(false)
    play(time)
  }
  return (
    <div className="App">
      <BackgroundWave className="background_wave_abstract" />
      <header className="App-header">
        <TempodoroLogo className="logo" />
      </header>
      <Timer
        time={time}
        addEvt={() => (stopped || paused) && setTime(t => t + 30)}
        subEvt={() =>
          (stopped || paused) && setTime(t => (t > 30 ? t - 30 : t))
        }
      />
      <h2 id="status">
        Current Task:<span> Finish App development.</span>
      </h2>
      <Controls
        playEvt={play}
        pauseEvt={pause}
        stopEvt={stop}
        resumeEvt={resume}
        stopped={stopped}
        paused={paused}
      />
    </div>
  )
}

export default App
