const request = require('supertest')
const expect = require('chai').expect;
const { createApp } = require('../app')

describe('Our server', function() {
  let app, server

  // Called once before any of the tests in this block begin.
  before(function(done) {
    app = createApp()
    server = app.listen(function(err) {
      if (err) { return done(err) }
      done()
    })
  })

  after(() => {
    server.close()
  })

  it('should send back tasks', function(done) {
    request(app)
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