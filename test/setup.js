process.env.TZ = 'UTC';
require('dotenv').config();
const expect = require('chai').expect;
const request = require('supertest');

global.expect = expect;
global.request = request;