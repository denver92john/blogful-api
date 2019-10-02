process.env.TZ = 'UTC';
require('dotenv').config();
const expect = require('chai').expect;
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;