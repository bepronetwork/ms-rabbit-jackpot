import { globals } from './Globals';
import { Logger } from './helpers/logger';
import PusherSingleton from './logic/third-parties/pusher';
const queue = require("./queue");

import { CLOUDAMQP_URL } from './config';
var open = require('amqplib').connect(CLOUDAMQP_URL);


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

            // Consumer
            open.then(function(conn) {
                var ok = conn.createChannel();
                ok = ok.then(function(ch) {
                    for(let indexController in Controllers) {
                        for(let indexSubController in  Controllers[indexController]){
                            ch.assertQueue(indexSubController);
                            ch.consume(indexSubController, async function(msg) {
                                if (msg !== null) {
                                    await (Controllers[indexController])[indexSubController](JSON.parse(msg.content.toString()));
                                    ch.ack(msg);
                                }
                            });
                        }
                    }
                });
                return ok;
            }).then(null, console.warn);
        });
    }
}

module.exports = (new App()).start();