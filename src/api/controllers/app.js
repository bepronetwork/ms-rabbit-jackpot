import SecuritySingleton from '../helpers/security';
import MiddlewareSingleton from '../helpers/middleware';
import { BitGoSingleton } from '../../logic/third-parties';
import { getNormalizedTicker } from '../../logic/third-parties/bitgo/helpers';
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

async function test(message) {
    console.log(message);
}

export {
    test
};