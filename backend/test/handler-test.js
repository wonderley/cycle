const request = require('supertest')
const expect = require('chai').expect;
const { CreateHandler } = require('../handler')
const Model = require('../model')

describe('handler', function() {
  let handler, server

  // Called once before any of the tests in this block begin.
  before(function(done) {
    const model = new Model()
    handler = CreateHandler(model)
    server = handler.listen(function(err) {
      if (err) { return done(err) }
      done()
    })
  })

  after(() => {
    server.close()
  })

  it('should send back tasks', function(done) {
    request(handler)
      .get('/tasks')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) {
          console.error(res)
          return done(err)
        }
        expect(res.body).to.not.be.null
        expect(() => { JSON.parse(res.body) }).not.to.throw;
        // Done
        done()
      })
  })

})