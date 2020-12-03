require('colors')

function TaskToString(task) {
  const shortId = task.id.substring(0, 4)
  return `${shortId.yellow} ${task.desc}`
}

function FormattedTime(time) {
  return new Date(time).toLocaleDateString("en-US")
}

module.exports = {
  FormattedTime,
  TaskToString,
}