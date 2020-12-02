const expect = require('chai').expect
const cli = require('../cli')
const fs = require('fs')

describe('cli', () => {
  const testPath = './data/test.json'

  afterEach(() => {
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
  })

  it('returns nothing for empty input', () => {
    expect(cli.Interpret('')).to.be.undefined
  })

  it('can list empty tasks from a custom path', () => {
    expect(cli.Interpret('list', testPath)).to.equal('')
  })
})