import MiddlewareSingleton from "./middleware";
import { AdminsRepository, PermissionRepository, JackpotRepository } from "../../db/repos";
import {Security as SecurityCrypt} from "../../controllers/Security";

class Security{

    constructor() {
        this.nonce = 0;
    }

    checkPermission = async (permissions = [], admin) => {
        try {
            if(permissions.includes("all")) {
                return true;
            }
            let adminObject         = await AdminsRepository.prototype.findAdminById(admin);
            let permissionsObject   = await PermissionRepository.prototype.findById(adminObject.permission);
            for(let permission of permissions) {
                if(permissionsObject[permission]) {
                    return true;
                }
            }
        } catch(err) {
            return false;
        }
        return false;
    };

    // async getNonce(app) {
    //     if(this.nonce!=0){
    //         return this.nonce;
    //     }
    //     this.nonce = await JackpotRepository.prototype.findJackpotByApp(app).nonce;
    //     return this.nonce;
    // }
    // async setNonce(app) {
    //     await JackpotRepository.prototype.setNonce(app);
    //     this.nonce++;
    // }
    verify = async (req) => {
        try {
            if( SecurityCrypt.prototype.generateHash( JSON.stringify( req.body ).trim()) != SecurityCrypt.prototype.decryptData(req.hash) ) {
                throw new Error();
            }
        } catch(err) {
            throw {
                code : 304,
                message : 'Forbidden Access'
            }
        }
    }
}

let SecuritySingleton = new Security();

export default SecuritySingleton;