module.exports = {
    shouldntRegisterTheUser(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(7);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
    GETlast15BetsShouldAllow(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(200);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('array').that.is.empty;
    },
}