const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const Users = require("./auth-router.js");

describe("authentication server", () => {

  describe("Registration", () => {

    //clear the test db before every test
    beforeEach(async () => {
        await db("users").truncate();
    });

    const userData = { username: "user", password: "pass" };

    it("should return a status code 201", () => {
        let response
        return request(server).post('/api/auth/register').send(userData).then(res => {
            response = res
            expect(response.status).toBe(201)
        })
    });

    it('should return a welcome message', () => {
        const message = "Created user. Generated token"
        let response
        return request(server).post('/api/auth/register').send(userData).then(res => {
            response = res
            expect(response.body.message).toEqual(message)
        })
    })
  });

  describe('Login', () => {
    const userData = { username: "user", password: "pass" };   

    it('should return a successful status code', () => {
        let response
        return request(server).post('/api/auth/login').send(userData).then(res => {
            response = res
            expect(response.status).toBe(200)
        })
    })

    it('should return a welcome message', () => {
        let message = 'Welcome user!'
        let response
        return request(server).post('/api/auth/login').send(userData).then(res => {
            response = res
            expect(response.body.message).toEqual(message)
        })
    })
  })
});