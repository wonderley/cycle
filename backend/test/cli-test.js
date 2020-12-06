const expect = require('chai').expect
const cli = require('../cli')
const fs = require('fs')
const model = require('../model/file-model')
const colors = require('colors')

describe('cli', () => {
  const testPath = './data/test.json'

  beforeEach(() => {
    model.SetPath(testPath)
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
    colors.disable()
  })

  afterEach(() => {
    model.ResetPath()
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
    colors.enable()
  })

  it('returns nothing for empty input', () => {
    expect(cli.Interpret('')).to.be.undefined
  })

  it('can list empty tasks', () => {
    expect(cli.Interpret('list')).to.equal('')
  })

  it('can list tasks', () => {
    model.AddTask({ desc: 'task 1'})
    model.AddTask({ desc: 'task 2'})
    model.AddTask({ desc: 'task 3'})
    const res = cli.Interpret('list')
    const lines = res.split('\n')
    expect(lines.length).to.equal(3)
    expect(lines[0].match(/[0-9a-f]{4} task 1/)).to.not.be.null
    expect(lines[1].match(/[0-9a-f]{4} task 2/)).to.not.be.null
    expect(lines[2].match(/[0-9a-f]{4} task 3/)).to.not.be.null
  })
})