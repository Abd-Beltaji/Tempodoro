import { useState, useEffect } from 'react'
const TimerWrapper = () => {
  const [time, setTime] = useState(25 * 60)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const pause = () => setPaused(true)
  const play = () => {
    let interval = setInterval(() => {
      if (paused) return clearInterval(interval)
      if (time === 0) {
        setStopped(true)
        return clearInterval(interval)
      }
      setTime(t => t - 1)
    }, 1000)
  }

  return (
    <>
      <h1 onClick={play}>
        {(parseInt(time / 60).toString() + '0').slice(0, 2)}:
        {((time % 60).toString() + '0').slice(0, 2)}
      </h1>
    </>
  )
}

export default TimerWrapper
