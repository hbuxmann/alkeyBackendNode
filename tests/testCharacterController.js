// const { request } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

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
    

});

