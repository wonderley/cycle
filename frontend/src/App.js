import './App.css'
import React, { useState } from 'react'

function App() {
  const [tasks] = useState([])
  fetch('/api/tasks')
    .then(result => result.text())
    .then(res => console.log(res))
  const taskItems = tasks.map((_, i) => {
    return (
      <li>item {i}</li>
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        Items
      </header>
      <ul>
        {taskItems}
      </ul>
    </div>
  )
}

export default App
