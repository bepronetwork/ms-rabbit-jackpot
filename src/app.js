import { PORT, QUOTA_GUARD_URL } from './config';
import { globals } from './Globals';
import { Logger } from './helpers/logger';
import PusherSingleton from './logic/third-parties/pusher';
const queue = require("./queue");
class App {

    async __init__() {
        globals.verify();
        await globals.__init__();
        Logger.success("Listening in port", PORT);
    }

    start(){
        this.__init__().then(()=>{
            const Controllers = require('./api/controllers');
            for(let indexController in Controllers) {
                for(let indexSubController in  Controllers[indexController]){
                    queue.consume(indexSubController, async message => {
                        console.log("processing " + message.content.toString());
                        await (Controllers[indexController])[indexSubController](message.content.toString());
                    })
                }
            }
        });
    }
}

module.exports = (new App()).start();