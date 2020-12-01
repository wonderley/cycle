const express = require('express')
const Model = require('./model')

function createHandler() {
  const handler = express()
  const model = new Model()
  
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

if (require.main === module) {
  const handler = createHandler()
  const port = 4000
  handler.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

module.exports = {
  createHandler,
}