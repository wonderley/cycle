const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const path = './data/cycle.json'

function AddTask(task) {
  task.id = uuidv4()
  task.createdAt = Date.now()
  const tasks = GetTasks()
  if (tasks.find(t => t.id === task.id)) {
    throw new Error('Failed to create task due to ID collision')
  }
  tasks.push(task)
  saveTasks(tasks)
  return task
}
  
function GetTasks() {
  const dataBuffer = fs.readFileSync(path)
  if (!dataBuffer) {
    throw new Error(`couldn't find ${path}`)
  }
  const data = JSON.parse(dataBuffer.toString())
  if (!data) {
    throw new Error(`failed to parse ${path}`)
  }
  if (!Array.isArray(data)) {
    console.log(JSON.stringify(data))
    throw new Error(`couldn't find tasks in ${path}`)
  }
  return data
}
  
function saveTasks(tasks) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2))
}

module.exports = {
  GetTasks,
  AddTask,
}