var expect  = require("chai").expect;
var request = require("request");

  describe("Test Registration", function() {
      const formData={
       userName: "Test",
       email: "test@gmail.com",
       password: "test@123"
      }
   
    var url = "http://localhost:3000/api/user/signup";
    it("should return status 200", function(done) {
        request.post({uri:url, formData:formData}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("should return success message", function(done) {
        request.post({uri:url, formData:formData}, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.message).to.be.a('string', 'success');
            done()
          });
    });
  });

  describe("Test Login", function() {
      const formData={
       email: "test@gmail.com",
       password: "test@123"
      }
   
    var url = "http://localhost:3000/api/user/login";
    it("should return status 200", function(done) {
        request.post({uri:url, formData:formData}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("should return success message", function(done) {
        request.post({uri:url, formData:formData}, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.message).to.be.a('string', 'success');
            done()
          });
    });
  });

  describe("Get products", function() {
    var url = "http://localhost:3000/api/products";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as array", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data).to.be.a('array');
            done()
          });
    });
  });

  describe("Test Donations", function() {
    const formData={
     name: "test person",
     phoneNumber: "7899878989",
     title: "Iphone",
     description: "test description"
    }
 
  var url = "http://localhost:3000/api/user/donation";
  it("should return status 200", function(done) {
      request.post({uri:url, formData:formData}, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done()
        });
  });
  it("should return success message", function(done) {
      request.post({uri:url, formData:formData}, function(error, response, body) {
          body = JSON.parse(body)
          expect(body.message).to.be.a('string', 'success');
          done()
        });
  });
});