import './App.css'
import React, { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [needTasks, setNeedTasks] = useState(true)
  if (needTasks) {
    fetch('/tasks')
      .then(result => result.text())
      .then(res => JSON.parse(res))
      .then(res => {
        setNeedTasks(false)
        setTasks(res)
      })
      .catch(err => console.log(err))
  }
  const taskItems = tasks.map((t, i) => {
    return (
      <li id={i}>
        {t.desc}
      </li>
    )
  })
  return (
    <div className="App">
      Items
      <ul style={{listStyleType: 'none'}}>
        {taskItems}
      </ul>
    </div>
  )
}

export default App
