import MiddlewareSingleton from "./middleware";
import { AdminsRepository, PermissionRepository } from "../../db/repos";

class Security{

    constructor() {}

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

    verify = async ({type, req, permissions=[]}) => {
        try{
            let id = req.body[type];
            if(type=="admin") {
                if(!(await this.checkPermission(permissions, id))){
                    throw new Error();
                }
            }
            var bearerHeader = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
            var payload = JSON.parse(req.headers['payload']); // Payload with Id
            if(typeof bearerHeader !== 'undefined'){
                // Split the Space
                const bearer = bearerHeader.split(' ');
                // Get Token From Array
                const bearerToken = bearer[1];
                let verified = MiddlewareSingleton.verify({token : bearerToken, payload, id, isUser: (type=="user")});
                if(!verified){throw new Error()}
                return verified;
            } else {
                throw new Error();
            }
        }catch(err){
            if(err.code!=undefined) {
                throw err;
            } else {
                throw {
                    code : 304,
                    messsage : 'Forbidden Access'
                }
            }
        }
    }

}

let SecuritySingleton = new Security();

export default SecuritySingleton;