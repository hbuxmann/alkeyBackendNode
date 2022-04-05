// const { request } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let generateString = require('../functions/generateString');

//Assertion Style
chai.should();

chai.use(chaiHttp);
let token = '';

describe('Character API Tests', () => {

    /**
     * Get token key
     */
    
    describe("POST /login", () => {
        it("It should POST login in order to get token key", (done) => {
            const login = {
                user: "admin@admin.com",
                password: "1234"
            };
            chai.request(server)
                .post("/api/v1/auth/login")
                .send(login)
                .end((err, response) => {
                    // token = 'Authorization: Bearer '+ response.body.token;
                    token = response.body.token;
                    response.should.have.status(200);          
                    done();
                });

        });
    });
    //
    describe("GET /characters", () => {
        it("It should GET characters", (done) => {
            chai.request(server)
                .get("/api/v1/characters")
                .auth(token, { type: 'bearer' })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('status_code').eq(200);
                    response.body.should.have.property('message').eq('OK');
                    response.body.should.be.a('object');
                    done();
                });

        });

        it("It should NOT GET characters", (done) => {
            chai.request(server)
                .get("/api/v1/characters")
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.should.have.property('success').eq(false);
                    response.body.should.have.property('status_code').eq(403);
                    response.body.should.be.a('object');
                    done();
                });

        });
    });

    describe("POST /characters create", () => {
        it("It should POST characters", (done) => {

            let nameR = generateString(10);
            const characterNew = {
                "image": nameR + ".png",
                "name": nameR,
                "age": Math.floor(Math.random() * 100),
                "weight": Math.floor(Math.random() * 70),
                "history": "still working on it"
            };
            chai.request(server)
                .post("/api/v1/characters/create")
                .auth(token, { type: 'bearer' })
                .send(characterNew)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('status_code').eq(201);
                    response.body.should.have.property('message').eq('Character was created');
                    response.body.should.be.a('object');
                    done();
                });

        });

        it("It should NOT POST characters", (done) => {
            const characterNew = {
                "age": Math.floor(Math.random() * 100),
                "weight": Math.floor(Math.random() * 70),
                "history": "still working on it"
            };
            chai.request(server)
                .post("/api/v1/characters/create")
                .auth(token, { type: 'bearer' })
                .send(characterNew)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.have.property('success').eq(false);
                    response.body.should.have.property('status_code').eq(401);
                    response.body.should.have.property('message').eq('Missing critical data, please check your request');
                    response.body.should.be.a('object');
                    done();
                });

        });
    });
    
    

});

