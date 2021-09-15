import './main.css'
// import { useRef, useEffect } from 'react'
const Statistics = () => {
  let records = JSON.parse(localStorage.getItem('records'))
  let todayRecords = records.filter(
    record =>
      new Date(record.startTime).setHours(0, 0, 0, 0) ===
      new Date(Date.now()).setHours(0, 0, 0, 0)
  )

  let todayWorkSeconds = todayRecords
    .filter(r => r.mode === 'work')
    .map(r => r.workTime)
    .reduce((a, r) => a + r, 0)

  let todayBreakSeconds = todayRecords
    .filter(r => r.mode !== 'work')
    .map(r => r.workTime)
    .reduce((a, r) => a + r, 0)

  let todayBreakCount = todayRecords.filter(r => r.mode !== 'work').length

  console.log(
    records,
    todayRecords,
    todayWorkSeconds,
    todayBreakSeconds,
    todayBreakCount
  )

  let groupedbyDate = {}
  records.forEach(r => {
    let date = new Date(r.startTime).setHours(0, 0, 0, 0)
    if (!groupedbyDate[date]) groupedbyDate[date] = []
    groupedbyDate[date].push(r)
  })

  return (
    <div id="statistics">
      <h2>Statistics💹</h2>
      <div class="cards">
        <h3>Today you have:</h3>
        <div class="card">
          <p>worked for:</p>
          <h1>{Math.round(todayWorkSeconds / 60)}</h1>
          <p>minutes</p>
        </div>

        <div class="card">
          <p>taken:</p>
          <h1>{todayBreakCount}</h1>
          <p>breaks</p>
        </div>

        <div className="card">
          <p>taken breaks for:</p>
          <h1>{Math.round(todayBreakSeconds / 60)}</h1>
          <p>minutes</p>
        </div>
      </div>
      <div className="charts">
        {Object.keys(groupedbyDate).length === 0 ? <p>No data</p> : ''}
        {Object.keys(groupedbyDate).map(date => {
          let d = new Date(+date)
          let totalWork = 0,
            totalBreak = 0
          groupedbyDate[date].forEach(session => {
            if (session.mode === 'work') return totalWork++
            totalBreak++
          })
          return (
            <div
              className="bar"
              style={{ height: (totalWork + totalBreak) * 3 + '%' }}
            >
              <p>🧑‍💻 {totalWork}</p>
              <p>☕ {totalBreak}</p>
              <p>
                {d.getDate()}-{d.getMonth() + 1}-{d.getFullYear()}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Statistics
