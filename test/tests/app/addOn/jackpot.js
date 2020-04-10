import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { addJackpot, editEdgeJackpot} from '../../../methods';
const expect = chai.expect;

context('Jackpot', async () => {
    var app, admin;

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });

    it('should add Jackpot', mochaAsync(async () => {
        let res = await addJackpot({app: app.id, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status } = res.data;
        expect(status).to.be.equal(200);
    }));

    it('should modify edge jackpot to 2', mochaAsync(async () => {
        let res = await editEdgeJackpot({ edge: 2, app: app.id, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status} = res.data;
        expect(status).to.be.equal(200);
    }));

    it('should modify edge jackpot to 1', mochaAsync(async () => {
        let res = await editEdgeJackpot({ edge: 1, app: app.id, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status} = res.data;
        expect(status).to.be.equal(200);
    }));
});
