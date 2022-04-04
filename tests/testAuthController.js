let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Auth API Tests', () => {

    /**
     * Test the POST login
     */
    describe("POST /login", () => {
        it("It should POST login", (done) => {
            const login = {
                user: "admin@admin.com",
                password: "1234"
            };
            chai.request(server)
                .post("/api/v1/auth/login")
                .send(login)
                .end((err, response) => {
                     response.should.have.status(200);
                     response.body.should.have.property('token');
                     response.body.should.have.property('success').eq(true);
                     response.body.should.have.property('message').eq('Successful login');                   
                    done();
                });

        });

        it("It should NOT POST login", (done) => {
            const login = {
                user: "wrong@admin.com",
                password: "1234-"
            };
            chai.request(server)
                .post("/api/v1/auth/login")
                .send(login)
                .end((err, response) => {
                     response.should.have.status(401);
                     response.body.should.have.property('success').eq(false);
                     response.body.should.have.property('message').eq('Invalid credentials, please verify your user and/or email');                   
                    done();
                });

        });



    });
    describe("POST /register", () => {
        it("It should POST Register", (done) => {
            const randomName = generateString(5);
            const register = {
                nickname: randomName,
                user: randomName + '@test.com',
                password: "1234"
            };
            chai.request(server)
                .post("/api/v1/auth/register")
                .send(register)
                .end((err, response) => {
                     response.should.have.status(201);
                     response.body.should.have.property('success').eq(true);
                     response.body.should.have.property('message').eq('User registered!');                   
                    done();
                });

        });

        it("It should NOT POST Register", (done) => {
            const register = {
                nickname: 'n/a',
                user: 'admin@admin.com',
                password: "1234"
            };
            chai.request(server)
                .post("/api/v1/auth/register")
                .send(register)
                .end((err, response) => {
                     response.should.have.status(409);
                     response.body.should.have.property('success').eq(false);
                    //  response.body.should.have.property('message.errors[0].message').eq('user must be unique');                   
                    done();
                });

        });




    });
    

});


const characters ='abcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

