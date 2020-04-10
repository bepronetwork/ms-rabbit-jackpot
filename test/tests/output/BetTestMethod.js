module.exports = {
    shoudntBeAbleToBetLacksPayload(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(304);
    },
    shoudntBeAbleToBetLacksBearerToken(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(304);
    },
    shouldntBeAbleToBetInsufficientLiquidity(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(1);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
    shouldntBeAbleToBetBadGame(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(27);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
    shouldntBeAbleToBetBadUser(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(304);
    },
    shouldntBeAbleToBetBadApp(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(12);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
    shouldntBeAbleToBetEmptyResult(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(13);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
    shouldntBeAbleToBetZeroValue(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(13);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
    shouldntBeAbleToBetNegativeValue(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(13);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('string');
    },
}