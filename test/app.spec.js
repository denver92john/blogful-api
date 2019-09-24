/*
const expect = require('chai').expect;
const request = require('supertest');
*/
const app = require('../src/app');

describe('App', () => {
    it('GET / respons with 200 containing "Hello, world!"', () => {
        return request(app)
            .get('/')
            .expect(200, 'Hello, world!')
    });
});