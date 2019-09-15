const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe('Jokes Router', () => {
    it('should return a status code of 200 -- with a token', () => {
        const expectedCode = 200
        let response
        request(server).post('/api/auth/login').send({username: 'user', password: 'pass'}).then(res => {
            response = res
            let token = response.token

        let response2
        return request(server).get('/api/jokes').set({authorization, token}).then(res => {
            response2 = res
            expect(response2.status).toEqual(expectedCode)
        })
        })
    })

    it('should return an array of objects -- with a token', () => {

    })

    it('should return status 400 without token', () => {
        const expectedCode = 400
        let response
        return request(server).get('/api/jokes').then(res => {
            response = res
            expect(response.status).toEqual(expectedCode)
        })
    })
}) 