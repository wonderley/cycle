const expect = require('chai').expect
const assert = require('chai').assert
const cli = require('../cli')
const fs = require('fs')
const model = require('../model/file-model')

describe('cli', () => {
  const testPath = './data/test.json'

  beforeEach(() => {
    model.SetPath(testPath)
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
  })

  afterEach(() => {
    model.ResetPath()
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
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
    assert.equal(lines.length, 3)
    assert(lines[0].match(/[0-9a-f]{4} task 1/))
    assert(lines[1].match(/[0-9a-f]{4} task 2/))
    assert(lines[2].match(/[0-9a-f]{4} task 3/))
  })
})