const Model = require('./model')
const { CreateHandler } = require('./handler')
const readline = require('readline');

if (require.main === module) {
  main()
}

function main() {
  const model = new Model()
  const handler = CreateHandler(model)
  const port = 4000
  handler.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

  // stdin
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  rl.on('line', function(line){
    console.log(line);
  })
}