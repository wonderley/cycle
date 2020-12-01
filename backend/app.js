const Model = require('./model')
const { CreateHandler } = require('./handler')

if (require.main === module) {
  const model = new Model()
  const handler = CreateHandler(model)
  const port = 4000
  handler.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}