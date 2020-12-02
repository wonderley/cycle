require('colors')

function TaskToString(task) {
  const shortId = task.id.substring(0, 4)
  return `${shortId.yellow} ${task.desc}`
}

module.exports = {
  TaskToString,
}