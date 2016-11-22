var request = require("request");
var api = require("../api/app.js");

var base_url = "http://localhost:3000/api/compromissos";

describe("Compromissos API", function() {

    describe('GET /api/compromissos', function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET /api/compromissos', function() {
        it("compare response type json", function(done) {
            request.get(base_url, function(error, response, body) {

                expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
                api.closeServer();
                done();
            });
        });
    });

});
