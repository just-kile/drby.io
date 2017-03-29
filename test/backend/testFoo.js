describe("Test Foo", function () {

    var foo = require('../../src/backend/foo');

    it("should be defined", function () {
        expect(foo.foo(1)).toEqual(1)
    });

});