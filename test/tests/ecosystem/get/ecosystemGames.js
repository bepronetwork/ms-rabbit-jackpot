import {
    getEcosystemCasinoGames
} from '../../../methods';

import chai from 'chai';
import { 
    shouldGetAllEcosystemGames
} from '../../output/EcosystemMethod';
import { mochaAsync, detectValidationErrors } from '../../../utils';

const expect = chai.expect;


/* TESTS */

// Admin Normal Registering
context('Games', async () => {
    it('should get All Ecosystem Games', mochaAsync(async () => {
        let res = await getEcosystemCasinoGames();
        detectValidationErrors(res);
        shouldGetAllEcosystemGames(res.data, expect);
    })); 

})

