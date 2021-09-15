import './App.css'
import { ReactComponent as TempodoroLogo } from './svg/tempodoro.svg'
import { ReactComponent as BackgroundWave } from './svg/background_wave_long.svg'
import Timer from './Timer'
import Controls from './Controls'
import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import { alert as customAlert } from './Alert'
import Records from './records/index'
import Statistics from './statistics/index'
function App() {
  const [time, setTime] = useState(1500)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState('notStarted')
  const [interval, setIntervalValue] = useState(null)

  const [mode, setMode] = useState('work')

  const [target, setTarget] = useState(null)

  const [workTime, setWorkTime] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem('records') || '[]')
  )
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

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records))
  }, [records])

  useEffect(() => {
    if (stopped !== true) return
    if (workTime < 30) {
      pause()
      customAlert(
        'Warning!',
        'Are you sure that you want to end this session early? (sessions under 30 seconds will not be recorded).',
        'warning',
        res => {
          if (res) {
            setMode('stopped')
            setIntervalValue(v => clearInterval(v) || null)
            setTime(1500)
            setWorkTime(0)
            setPaused(false)
            return
          }
          setStopped(false)
        }
      )
      return
    }
    setRecords([...records, { workTime: workTime / 2, mode, startTime }])
    setMode('stopped')
    setIntervalValue(v => clearInterval(v) || null)
    setTime(1500)
    setWorkTime(0)
    setPaused(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped])
  const play = (timeAmount, isResume) => {
    if (!(paused || stopped)) return false
    if (!isResume) {
      setMode('work')
      setWorkTime(0)
      setStartTime(Date.now())
    }
    if (timeAmount) setTime(timeAmount)
    if (time === 0) setTime(timeAmount || 1200)
    setStopped(false)
    setPaused(false)

    setIntervalValue(
      setInterval(
        () =>
          setTime(t => {
            if (t === 0) {
              setStopped(true)
              return 0
            }
            setWorkTime(w => w + 1)
            return t - 1
          }),
        1000
      )
    )
    return true
  }

  const stop = () => {
    setStopped(true)
  }
  const pause = () => {
    setPaused(true)
    clearInterval(interval)
  }

  const resume = () => {
    setPaused(false)
    play(time, true)
  }
  return (
    <>
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
          opts={{ height: '0', width: '0', playerVars: { autoplay: '0' } }}
        />
      </div>
      <div id="secondSection">
        <Records />
        <Statistics />
      </div>

      <div id="anchor">
        <p>
          Coded with <span>❤️</span> by:{' '}
          <a href="https://github.com/abd-Beltaji/">Abd.Beltaji</a>.
        </p>
      </div>
    </>
  )
}

export default App
