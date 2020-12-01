const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

class Model {
  constructor(path) {
    this.path = path || './cycle.json'
  }

  addTask(task) {
    task.id = uuidv4()
    task.createdAt = Date.now()
    const tasks = loadTasks()
    if (tasks.find(t => t.id === id)) {
      throw new Error('Failed to create task due to ID collision')
    }
    tasks.push(task)
    saveTasks(tasks)
    return task
  }
  
  loadTasks() {
    const dataBuffer = fs.readFileSync(this.path)
    if (!dataBuffer) {
      throw new Error(`couldn't find ${this.path}`)
    }
    const data = JSON.parse(dataBuffer.toString())
    if (!data) {
      throw new Error(`failed to parse ${this.path}`)
    }
    if (!data.tasks) {
      console.log(JSON.stringify(data))
      throw new Error(`couldn't find tasks in ${this.path}`)
    }
    return data.tasks
  }
  
  _saveTasks(tasks) {
    fs.writeFileSync(this.path, JSON.stringify(tasks))
  }
}

module.exports = Model