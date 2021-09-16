import './main.css'
const Records = () => {
  let records = JSON.parse(localStorage.getItem('records')) || []
  return (
    <div className="records" id="records">
      <h2>Records 📼</h2>
      <table>
        <tr>
          <th data-icon="📆">Date</th>
          <th data-icon="⌚">Time</th>
          <th data-icon="🎈">Mode</th>
          <th data-icon="⏳">Total Time</th>
        </tr>
        {records.map(record => {
          let date = new Date(record.startTime || 0)
          let minutes = date.getMinutes()
          let workTime = Math.round(record.workTime / 60)
          return (
            <tr>
              <td>
                {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
              </td>
              <td>
                {date.getHours() % 12 || 12}:
                {minutes + (minutes < 10 ? '0' : '')}{' '}
                {date.getHours() >= 12 ? 'PM' : 'AM'}
              </td>
              <td>
                {{
                  work: 'work 🧑‍💻',
                  shortBreak: 'short break ☕',
                  longBreak: 'long break 🛌',
                  stopped: 'work 🧑‍💻'
                }[record.mode] || ''}
              </td>
              <td>
                {workTime} minute{workTime > 1 ? 's' : ''}
              </td>
            </tr>
          )
        })}
      </table>
      {records.length === 0 ? <p> You have no records </p> : <></>}
    </div>
  )
}

export default Records
