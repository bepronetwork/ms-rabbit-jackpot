import {
    getEcosystemData
} from '../../../methods';
import chai from 'chai';
import { 
    getAllDataFromTheEcosystem
} from '../../output/EcosystemMethod';
import { mochaAsync, detectValidationErrors } from '../../../utils';
const expect = chai.expect;


/* TESTS */

// Admin Normal Registering
context('Data', async () => {
    it('get all data from the Ecosystem', mochaAsync(async () => {
        var res = await getEcosystemData();
        detectValidationErrors(res);
        getAllDataFromTheEcosystem(res.data, expect);
    }));
})

