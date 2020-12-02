const cli = require('./cli')
const model = require('./model/file-model')
const { CreateHandler } = require('./handler')
const readline = require('readline')

function Main() {
  // const handler = CreateHandler(model)
  // const port = 4000
  // handler.listen(port, () => {
  //   console.log(`Listening on port ${port}`)
  // })

  // stdin
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })
  
  rl.on('line', (line) => {
    const out = cli.Interpret(line)
    out && console.log(out)
  })
}

module.exports = {
  Main,
}