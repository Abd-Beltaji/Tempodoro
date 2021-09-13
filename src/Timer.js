import './Timer.css'
import minus from './svg/minus.svg'
import plus from './svg/plus.svg'

const Timer = ({ time, addEvt, subEvt, stopped }) => {
  return (
    <div className="timer">
      <button
        className="control_btn"
        onClick={subEvt}
        disabled={!stopped}
      >
        <img src={minus} alt="decrease timer by 1 minute" draggable="false" />
      </button>
      <h1>
        {('0' + parseInt(time / 60).toString()).slice(-2)}:
        {('0' + (time % 60).toString()).slice(-2)}
      </h1>
      <button className="control_btn" onClick={addEvt} disabled={!stopped}>
        <img src={plus} alt="increase timer by 1 minute" draggable="false" />
      </button>
    </div>
  )
}
export default Timer
