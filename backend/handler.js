const express = require('express')
const model = require('./model/file-model')

function CreateHandler() {
  const handler = express()

  handler.get('/tasks', (req, res) => {
    const tasks = model.GetTasks()
    res.send(tasks)
  })
  
  handler.post('/tasks/add', (req, res) => {
    const task = JSON.parse(req.body)
    const result = model.AddTask(task)
    res.send(result)
  })

  return handler
}

module.exports = {
  CreateHandler,
}