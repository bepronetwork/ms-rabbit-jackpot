import SecuritySingleton from '../helpers/security';
import MiddlewareSingleton from '../helpers/middleware';
import { BitGoSingleton } from '../../logic/third-parties';
import { getNormalizedTicker } from '../../logic/third-parties/bitgo/helpers';
import { Jackpot } from '../../models';
const perf = require('execution-time')();

/**
 * Description of the function.
 *
 * @class
 * @memberof api.controllers.Apps.postApp
 * @requires lodash
 * @requires helpers/apiError
 * @requires helpers/swagger.generateParamsErrorObject
 * @todo Add description of AppsController
 */

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function betJackpot(message) {
    console.log("Bet jackpot");
    const { req } = JSON.parse(message);
    try {
        await SecuritySingleton.verify( req );
        let params = req.body;

        // check how much is needed for the jackpot
        let jackpot = new Jackpot(params);

        // put it in the jackpot
        await jackpot.bet();

	} catch(err) {
        console.log(err);
	}
}

export {
    betJackpot
}