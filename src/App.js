import './App.css'
import { ReactComponent as TempodoroLogo } from './svg/tempodoro.svg'
import { ReactComponent as BackgroundWave } from './svg/background_wave_long.svg'
import Timer from './Timer'
import Controls from './Controls'
import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'

function App() {
  const [time, setTime] = useState(1500)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(true)
  const [interval, setIntervalValue] = useState(null)

  const [mode, setMode] = useState('work')

  const [target, setTarget] = useState(null)

  useEffect(() => {
    document.body.style.backgroundColor = stopped
      ? '#323739'
      : paused
      ? 'rgb(60, 39, 0)'
      : {
          work: 'rgb(43, 21, 68)',
          shortBreak: 'rgb(6, 47, 64)',
          longBreak: 'rgb(6, 47, 64)'
        }[mode] || ''
  }, [mode, paused, stopped])

  const play = timeAmount => {
    if (!(paused || stopped)) return false
    setMode('work')
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
            return t - 1
          }),
        1000
      )
    )
    return true
  }

  const stop = () => {
    setStopped(true)
    clearInterval(interval)
    setTime(1500)
    setMode('stopped')
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
        addEvt={() => stopped && setTime(t => t + 30)}
        subEvt={() => stopped && setTime(t => (t > 30 ? t - 30 : t))}
        stopped={stopped}
      />
      <h2 id="status">
        Current Task:<span> {mode}.</span>
      </h2>
      <Controls
        playEvt={play}
        pauseEvt={pause}
        stopEvt={stop}
        resumeEvt={resume}
        stopped={stopped}
        paused={paused}
        mode={mode}
        changeMode={setMode}
        musicPlay={() => (target ? target.playVideo() || true : false)}
        musicPause={() => (target ? target.pauseVideo() || true : false)}
      />
      <YouTube
        videoId="5qap5aO4i9A"
        onReady={evt => setTarget(evt.target)}
        opts={{ height: '0', width: '0', playerVars: { autoplay: '1' } }}
      />
    </div>
  )
}

export default App
