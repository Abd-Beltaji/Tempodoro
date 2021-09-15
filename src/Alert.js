import './Alert.css'
import { useState } from 'react'

let shown,
  setShown,
  title,
  setTitle,
  message,
  setMessage,
  mode,
  setMode,
  callback,
  setCallback
const Alert = () => {
  ;[callback, setCallback] = useState(() => () => {})
  ;[shown, setShown] = useState(false)
  ;[title, setTitle] = useState('')
  ;[message, setMessage] = useState('')
  ;[mode, setMode] = useState('')

  return (
    <div id="alert" style={{ width: shown ? '' : '0' }}>
      <div className={`alertBody ${mode}`}  style={{ transform: shown ? 'translate(0%);' : 'translate(-500%);' }}>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="buttons">
          <button
            onClick={() => {
              callback(true)
              setShown(false)
            }}
            className={
              mode.toLowerCase() === 'message' ? 'primary' : 'secondary'
            }
          >
            ok
          </button>
          <button
            className={
              mode.toLowerCase() === 'message' ? 'secondary' : 'primary'
            }
            onClick={() => {
              callback(false)
              setShown(false)
            }}
            style={{
              display: mode.toLowerCase() === 'message' ? 'none' : ''
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert

export const alert = (title, msg, mode, cb) => {
  setShown(true)
  setCallback(() => cb)
  setMessage(msg)
  setTitle(title)
  setMode(mode)
}
