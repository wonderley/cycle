const model = require('./model/file-model')
const { FormattedTime, TaskToString } = require('./task')

let colorEnabled = true

function Interpret(text) {
  const out = interpret(text)
  if (!out || colorEnabled) return out
  // Remove ANSI CSI sequence
  return out.replace(/\x1b\[[0-9;]*m/g, '')
}

function interpret(text) {
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
  } else if ('finish'.startsWith(cmd) || 'complete'.startsWith(cmd) || 'done'.startsWith(cmd)) {
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
    // schedule for an hour from now
    // todo: get date from otherArgs
    task.when = Date.now() + 3600
    model.UpdateTask(task)
    return `scheduled ${TaskToString(task)} for ${FormattedTime(task.when)}`
  } else {
    return `unknown command ${cmd}`
  }
}

function SetColorEnabled(enabled) {
  colorEnabled = enabled
}

module.exports = {
  Interpret,
  SetColorEnabled,
}