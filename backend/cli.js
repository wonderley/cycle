const model = require('./model/file-model')
const { TaskToString } = require('./task')

function Interpret(text) {
  if (!text) return
  splitText = text.split(' ')
  if (!splitText.length) return
  const cmd  = splitText[0],
        args = splitText.splice(1)
  if (cmd === 'list') {
    const tasks = model.GetTasks()
    return tasks.map(TaskToString).join('\n')
  } else if (cmd === 'add') {
    if (!args.length) return 'nothing to add'
    const task = {
      desc: args.join(' '),
    }
    const result = model.AddTask(task)
    return `➕${TaskToString(result)}`
  } else if (cmd === 'fin') {
    if (!args.length) return 'specify a task to complete'
    let task
    if (args.length === 1) {
      const possibleId = args[0]
      if (possibleId.length > 2
       && possibleId.split()
          .every(c => c.match(/[0-9a-f]/))) {
        // The argument could be the task ID
        task = model.TaskById(possibleId)
      }
    }
    if (!task) {
      // get by name
    }
    if (task) {
      task.done = true
      model.UpdateTask(task)
      return `✅${TaskToString(task)}`
    } else {
      return `unknown task ${args.join(' ')}`
    }
  } else {
    return `unknown command ${cmd}`
  }
}

module.exports = {
  Interpret,
}