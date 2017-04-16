const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

function setup() {
    beforeAll(function(done) {
        mockgoose.prepareStorage().then(function() {
            mongoose.connect('mongodb://127.0.0.1:27017/TestingDB', function(err) {
                done(err);
            });
        });
    });

    afterAll(function(done) {
        mongoose.connection.close(function () {
            done();
        })
    });

    beforeEach(function(done) {
        mockgoose.helper.reset().then(function() {
            done();
        });
    });
}

module.exports = setup;