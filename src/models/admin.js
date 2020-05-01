import { AdminLogic } from '../logic';
import ModelComponent from './modelComponent';
import { AdminsRepository } from '../db/repos';
import {
    MapperAddAdminSingleton,
    MapperAuthAdminSingleton,
    MapperEditAdminTypeSingleton,
    MapperGetAdminAllSingleton,
    MapperLoginAdminSingleton,
    MapperLogin2faAdminSingleton,
    MapperRegisterAdminSingleton,
    MapperSet2FASingleton
} from "../controllers/Mapper";
import Security from './security';
import Permission from "./permission";

class Admin extends ModelComponent {

    constructor(params) {

        let db = new AdminsRepository();

        super(
            {
                name: 'Admin',
                logic: new AdminLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: [
                    new Security(params),
                    new Permission(params)
                ]
            }
        );
    }

    async auth() {
        try {
            let res = await this.process('Auth');
            return MapperAuthAdminSingleton.output('Auth', res);
        } catch (err) {
            throw err;
        }
    }

    async getAdminAll() {
        try {
            let res = await this.process('GetAdminAll');
            return MapperGetAdminAllSingleton.output('GetAdminAll', res);
        } catch (err) {
            throw err;
        }
    }

    async login() {
        try {
            let res = await this.process('Login');
            return MapperLoginAdminSingleton.output('Login', res);
        } catch (err) {
            throw err;
        }
    }

    async login2FA() {
        try {
            let res = await this.process('Login2FA');
            return MapperLogin2faAdminSingleton.output('Login2FA', res);
        } catch (err) {
            throw err;
        }
    }

    async set2FA() {
        try {
            let res = await this.process('Set2FA');
            return MapperSet2FASingleton.output('Set2fa', res);
        } catch (err) {
            throw err;
        }
    }

    async addAdmin() {
        try {
            let res = await this.process('AddAdmin');
            return MapperAddAdminSingleton.output('AddAdmin', res);
        } catch (err) {
            throw err;
        }
    }
    async register() {
        try {
            let res = await this.process('Register');
            return MapperRegisterAdminSingleton.output('Register', res);
        } catch (err) {
            throw err;
        }
    }

    async editAdminType() {
        try {
            let res = await this.process('EditAdminType');
            return MapperEditAdminTypeSingleton.output('EditAdminType', res);
        } catch (err) {
            throw err;
        }
    }

}

export default Admin;
