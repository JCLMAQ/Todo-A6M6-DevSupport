// Wakanda uses mocha/chai modules to run backend tests inside a NodeWorker

// https://mochajs.org/
// Mocha is a feature-rich JavaScript test framework running on Node.js
// and in the browser, making asynchronous testing simple and fun. Mocha
// tests run serially, allowing for flexible and accurate reporting, while
// mapping uncaught exceptions to the correct test cases. 

// http://chaijs.com/
// Chai is a BDD / TDD assertion library for node and the browser
// that can be delightfully paired with any javascript testing framework.

var chai = requireNode('chai');
var expect = chai.expect;

describe('My BDD Unit Tests', function () {
    it('should succeed', function (done) {
        var n = 314;
        expect(n).to.be.a("number");
        expect(n).to.equal(314);
        done();
    });
    it('should fail', function (done) {
        var s = 'Hello';
        expect(s).to.be.a("string");
        expect(s).to.equal("Hi");
        done();
    });

});

