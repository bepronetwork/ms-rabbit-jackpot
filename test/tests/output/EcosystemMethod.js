module.exports = {
    getAllDataFromTheEcosystem(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(200);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('object');
        expect(data.message.currencies).to.not.be.null;
        expect(data.message.currencies).to.be.an('array');
        expect(data.message.blockchains).to.not.be.null;
        expect(data.message.blockchains).to.be.an('array');
        expect(data.message.addresses).to.not.be.null;
        expect(data.message.addresses).to.be.an('array');
    },
    shouldGetAllEcosystemGames(data, expect){
        expect(data.status).to.not.be.null;
        expect(data.status).to.equal(200);
        expect(data.message).to.not.be.null;
        expect(data.message).to.be.an('array');
    },
}