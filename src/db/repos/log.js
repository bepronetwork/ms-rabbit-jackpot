import MongoComponent from './MongoComponent';
import { LogSchema } from '../schemas';

/**
 * Accounts database interaction class.
 *
 * @class
 * @memberof db.repos.accounts
 * @requires bluebird
 * @requires lodash
 * @requires db/sql.accounts
 * @see Parent: {@link db.repos.accounts}
 */


class LogRepository extends MongoComponent{

    constructor(){
        super(LogSchema)
    }
    /**
     * @function setLogModel
     * @param Log Model
     * @return {Schema} LogModel
     */

    setModel = (Log) => {
        return LogRepository.prototype.schema.model(Log)
    }
}

LogRepository.prototype.schema = new LogSchema();

export default LogRepository;