const request = require('supertest');
const app = require('./app');
const MongoClient = require('mongodb/lib/mongo_client');
const url=require('./password.js');

beforeAll(async () => {
   const connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('users');
    
    
  });
  
  

app.route('/users')
describe('GET /users', () => {
  test('should return an array of users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /users', () => {
  test('should add a new user', async () => {
    const newUser = { name: 'Niel' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(newUser.name);
  });
});

describe('PUT /users', () => {
  test('should update an existing user', async () => {
    const updatedUser = { _id: '646dd5e9bd72155d4d74574e', name: 'Peter' };
    const response = await request(app)
      .put('/users')
      .send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
  });
});


afterAll(async () => {
    const connection = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
     await connection.close();
  });
















