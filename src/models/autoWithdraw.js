import { AutoWithdrawLogic } from '../logic';
import { AutoWithdrawRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class AutoWithdraw extends ModelComponent {

    constructor(params) {

        let db = new AutoWithdrawRepository();

        super(
            {
                name: 'AutoWithdraw',
                logic: new AutoWithdrawLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: [
                ]
            }
        );
    }

    async register() {
        try {
            return await this.process('Register');
        } catch (err) {
            throw err;
        }
    }

}

export default AutoWithdraw;