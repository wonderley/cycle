const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

let path = './data/cycle.json'

function SetPath(customPath) {
  path = customPath
}

function ResetPath() {
  path = './data/cycle.json'
}

function AddTask(task) {
  const tasks = GetTasks(path)
  task.id = uuidv4()
  task.createdAt = Date.now()
  if (tasks.find(t => t.id === task.id)) {
    throw new Error('failed to create task due to ID collision')
  }
  tasks.push(task)
  saveTasks(tasks, path)
  return task
}
  
function GetTasks(customPath) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '[]')
  }
  const dataBuffer = fs.readFileSync(path)
  if (!dataBuffer) {
    throw new Error(`couldn't open ${path}`)
  }
  const data = JSON.parse(dataBuffer.toString())
  if (!data) {
    throw new Error(`failed to parse ${path}`)
  }
  if (!Array.isArray(data)) {
    console.log(JSON.stringify(data))
    throw new Error(`couldn't find tasks in ${path}`)
  }
  let tasks = data
  return data.filter(t => !t.done)
}

function TaskById(id) {
  if (id.length <= 1
    || !id.split()
        .every(c => c.match(/[0-9a-f]/))) {
    return undefined
  }
  const tasks = GetTasks(path)
  return tasks.find(t => t.id.startsWith(id))
}

function UpdateTask(task) {
  const tasks = GetTasks()
  const idx = tasks.findIndex(t => t.id === task.id)
  if (idx === -1)
    throw new Error(`couldn't find task with id ${task.id}`)
  tasks[idx] = task
  saveTasks(tasks, path)
}
  
function saveTasks(tasks, path) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2))
}

module.exports = {
  GetTasks,
  AddTask,
  TaskById,
  UpdateTask,
  SetPath,
  ResetPath,
}