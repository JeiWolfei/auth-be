require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../lib/models/User');
const app = require('../lib/app');



describe('app', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can /signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in user', () => {
    return User.create({ email:'test@test.com', password: 'password' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            email: 'test@test.com', password: 'password'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com',
          },
          token: expect.any(String)
        });
      });
  });

  it('can not /signin a user with bad password', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'test@test.com',
            password: 'badPassword'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });
  it('can not /signin a user with bad email', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'badEmail@test.com',
            password: 'password'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });
  it('has a /verify route', () => {
    return User.create({ email: 'test@test.com', password: 'password' })
      .then(user => { 
      })
      .then(token => {

      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com',
          },
          token: expect.any(String)
        });
      });
  });
});
