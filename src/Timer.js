import './Timer.css'
import minus from './svg/minus.svg'
import plus from './svg/plus.svg'

const Timer = ({ time, addEvt, subEvt }) => {
  return (
    <div className="timer">
      <button className="control_btn" onClick={subEvt}>
        <img src={minus} alt="decrease timer by 1 minute" />
      </button>
      <h1>
        {('0' + parseInt(time / 60).toString()).slice(-2)}:
        {('0' + (time % 60).toString()).slice(-2)}
      </h1>
      {/* <h1>{time}</h1> */}
      <button className="control_btn" onClick={addEvt}>
        <img src={plus} alt="increase timer by 1 minute" />
      </button>
    </div>
  )
}
export default Timer
