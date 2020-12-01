const express = require('express')

function CreateHandler(model) {
  const handler = express()
  
  handler.get('/tasks', (req, res) => {
    const tasks = model.loadTasks()
    res.send(tasks)
  })
  
  handler.post('/tasks/add', (req, res) => {
    const task = JSON.parse(req.body)
    const result = model.addTask(task)
    res.send(result)
  })

  return handler
}

module.exports = {
  CreateHandler,
}