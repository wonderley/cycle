const model = require('./model')

function Interpret(text) {
  splitText = text.split()
  if (!splitText.length) return
  const cmd  = splitText[0],
        args = splitText.splice(1)
  if (cmd === 'list') {
    return model.GetTasks()
  }
}

module.exports = {
  Interpret,
}