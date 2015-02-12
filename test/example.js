
var assert = require('assert');

// We're testing Math right now
describe('Math', function() {
    // And in Math, we have Addition
  describe('Addition', function() {
  	// Then we provide specific test cases
    it('should equal 2 when 1 is added to 1', function() {
      var result = 1 + 1;
      assert.equal(result, 2);
    });
    it('should not equal 5 when 3 is added to 3', function() {
      var result = 3 + 3;
      assert.notEqual(result, 5);
    });
  });
  describe('Subtraction', function() {
    it('should subtract 1 from the value', function() {
      var value = 5;
      var result = 5 - 1;
      assert.equal(result, 4);
    });
  });
});