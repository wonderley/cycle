const express = require('express')
const Model = require('./model')

function createApp() {
  const app = express()
  const model = new Model()
  
  app.get('/tasks', (req, res) => {
    const tasks = model.loadTasks()
    res.send(tasks)
  })
  
  app.post('/tasks/add', (req, res) => {
    const task = JSON.parse(req.body)
    const result = model.addTask(task)
    res.send(result)
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

module.exports = {
  createApp,
}