import { globals } from './Globals';
import { Logger } from './helpers/logger';
import PusherSingleton from './logic/third-parties/pusher';
const queue = require("./queue");
class App {

    async __init__() {
        globals.verify();
        await globals.__init__();
        Logger.success("Online");
        return ;
    }

    start(){
        this.__init__().then(()=>{
            const Controllers = require('./api/controllers');
            for(let indexController in Controllers) {
                for(let indexSubController in  Controllers[indexController]){
                    queue.consume(indexSubController, async message => {
                        await (Controllers[indexController])[indexSubController](JSON.parse(message.content.toString()));
                    })
                }
            }
        });
    }
}

module.exports = (new App()).start();