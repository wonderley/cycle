'use strict'
const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function createApp() {
  const app = express()
  
  app.get('/tasks', (req, res) => {
    const tasks = loadTasks()
    res.send(tasks)
  })
  
  app.post('/tasks/add', (req, res) => {
    const task = JSON.parse(req.body)
    task.id = uuidv4()
    task.createdAt = Date.now()
    const tasks = loadTasks()
    if (tasks.find(t => t.id === id)) {
      throw new Error('Failed to create task due to ID collision')
    }
    tasks.push(task)
    saveTasks(tasks)
    res.send(task)
  })

  return app
}

if (require.main === module) {
  const app = createApp()
  const port = 4000
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

function loadTasks() {
  const dataBuffer = fs.readFileSync('./cycle.json')
  if (!dataBuffer) {
    throw new Error(`couldn't find cycle.json`)
  }
  const data = JSON.parse(dataBuffer.toString())
  if (!data) {
    throw new Error('failed to parse cycle.json')
  }
  if (!data.tasks) {
    console.log(JSON.stringify(data))
    throw new Error(`couldn't find cycle.json tasks`)
  }
  return data.tasks
}

function saveTasks(tasks) {
  fs.writeFileSync('./cycle.json', JSON.stringify(tasks))
}

module.exports = {
  createApp,
}