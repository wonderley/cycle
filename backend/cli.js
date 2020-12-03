const model = require('./model/file-model')
const { TaskToString } = require('./task')

function Interpret(text) {
  if (!text) return
  splitText = text.split(' ')
  if (!splitText.length) return
  const cmd  = splitText[0].toLowerCase(),
        args = splitText.slice(1)
  if (cmd === 'ls' || 'list'.startsWith(cmd)) {
    const tasks = model.GetTasks()
    return tasks.map(TaskToString).join('\n')
  } else if (cmd === 'add') {
    if (!args.length) return 'nothing to add'
    const task = {
      desc: args.join(' '),
    }
    const result = model.AddTask(task)
    return `➕${TaskToString(result)}`
  } else if ('finish'.startsWith(cmd) || 'complete'.startsWith(cmd)) {
    if (!args.length) return 'specify a task to complete'
    const task = model.TaskById(args[0])
    if (task) {
      task.done = true
      model.UpdateTask(task)
      return `✅${TaskToString(task)}`
    } else {
      return `unknown task ${args.join(' ')}`
    }
  } else if ('schedule'.startsWith(cmd)) {
    let task, otherArgs
    if (task = model.TaskById(args[0])) { 
      otherArgs = args.slice(1)
    } else if (task = model.TaskById(args[args.length-1])) {
      otherArgs = args.slice(0,-1)
    } else {
      return `specify a task to schedule`
    }
    task.when = Date.now() // get date from otherArgs
    const result = model.UpdateTask(task)
    return `scheduled ${TaskToString(result)} for ${result.when}`
  } else {
    return `unknown command ${cmd}`
  }
}

module.exports = {
  Interpret,
}