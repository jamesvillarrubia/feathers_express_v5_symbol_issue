
// mocha --watch flag requires CJS imports
// See here: https://github.com/mochajs/mocha/issues/4374
const assert = require('assert');
const request = require('supertest');
const feathers = require('f5');
const express = require('f5_exp');
const services = require('../service.js')

describe('Express Feathers Parser', () => {
  it('middleware should not interrupt normal requests', async () => {
    const app = express(feathers());
    app.use(express.cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.configure(express.rest());
    app.configure(services);
    request(app)
      .post('/messages')
      .expect(201)
      .end((err, res) => {
        if (err) console.log(err);
        assert.strictEqual(res.body.data, 'create');
      });
  });
});
