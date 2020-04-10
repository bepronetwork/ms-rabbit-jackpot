import {ErrorHandler} from './codes';
import _ from 'lodash';

// Private Use
let libraries;

class ErrorManager {
    constructor(){
        libraries = {
            handler : new ErrorHandler(),
            throwError : function (err){
                throw err; 
            }
        }
    }

    jackpot = function (object, type){
        try{
            switch(type){
            }
        }catch(err){
            throw err
        }
    }
}

export default ErrorManager;


const throwError = (typeError='UNKNOWN') => {
    throw libraries.throwError(libraries.handler.getError(libraries.handler.KEYS[typeError]));
}

export {
    throwError
}