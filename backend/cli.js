const model = require('./model')

function Interpret(text) {
  splitText = text.split(' ')
  if (!splitText.length) return
  const cmd  = splitText[0],
        args = splitText.splice(1)
  if (cmd === 'list') {
    return model.GetTasks()
  }
  if (cmd === 'add') {
    if (!args.length) return 'nothing to add'
    const task = {
      desc: args.join(' '),
    }
    const result = model.AddTask(task)
    return `added task: ${JSON.stringify(result)}`
  }
}

module.exports = {
  Interpret,
}