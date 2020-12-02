const fileModel = require('./model/file-model')

function Interpret(text, model=fileModel) {
  if (!text) return
  splitText = text.split(' ')
  if (!splitText.length) return
  const cmd  = splitText[0],
        args = splitText.splice(1)
  if (cmd === 'list') {
    const tasks = model.GetTasks()
    return tasks.map(t =>
      `${t.id.substring(0, 4)} ${t.desc}`
    ).join('\n')
  } else if (cmd === 'add') {
    if (!args.length) return 'nothing to add'
    const task = {
      desc: args.join(' '),
    }
    const result = model.AddTask(task)
    return `➕${result.id.substring(0, 4)}`
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
      return `✅ ${task.id.substring(0, 4)} ${task.desc}`
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