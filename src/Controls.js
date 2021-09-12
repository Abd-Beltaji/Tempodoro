import './Controls.css'

import shortBreak from './svg/short_break.svg'
import play from './svg/play.svg'
import stop from './svg/stop.svg'
import pause from './svg/pause.svg'
import longBreak from './svg/long_break.svg'

import statistics from './svg/statistics.svg'
import records from './svg/records.svg'
import controls from './svg/controls.svg'
import music from './svg/music.svg'
import tasks from './svg/tasks.svg'

const Button = ({ logo, alt, big, click, style }) => {
  return (
    <button
      className={`control_button${big === 'true' ? ' big' : ''}`}
      onClick={click}
      style={style}
    >
      <img src={logo} alt={alt} draggable="false" />
    </button>
  )
}

const Controls = ({
  playEvt,
  stopEvt,
  pauseEvt,
  paused,
  stopped,
  resumeEvt,
  changeMode
}) => {
  return (
    <div id="controls">
      <div className="state_controls">
        <Button
          logo={shortBreak}
          alt="short break"
          click={() => stopped && playEvt(300) && changeMode('shortBreak')}
        />
        <Button
          logo={play}
          alt="play"
          big="true"
          click={() => playEvt(1500)}
          style={{
            width: stopped ? '8.6em' : '0px',
            height: stopped ? '8.6em' : '0px',
            visibility: stopped ? 'visible' : 'hidden',
            position: stopped ? '' : 'absolute'
          }}
        />
        <Button
          logo={stop}
          alt="stop"
          click={stopEvt}
          style={{
            width: !stopped ? '5.6em' : '0',
            height: !stopped ? '5.6em' : '0',
            visibility: !stopped ? 'visible' : 'hidden',
            position: !stopped ? '' : 'absolute'
          }}
        />
        <Button
          logo={paused ? play : pause}
          alt="play"
          click={paused ? resumeEvt : pauseEvt}
          style={{
            width: !stopped ? '5.6em' : '0',
            height: !stopped ? '5.6em' : '0',
            visibility: !stopped ? 'visible' : 'hidden',
            position: !stopped ? '' : 'absolute'
          }}
        />
        <Button
          logo={longBreak}
          alt="long break"
          click={() => stopped && playEvt(900) && changeMode('longBreak')}
        />
      </div>
      <div className="actions">
        <Button logo={statistics} />
        <Button logo={records} />
        <Button logo={controls} />
        <Button logo={music} />
        <Button logo={tasks} />
      </div>
    </div>
  )
}

export default Controls
