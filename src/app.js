import { globals } from './Globals';
import { Logger } from './helpers/logger';
import PusherSingleton from './logic/third-parties/pusher';
require('dotenv').config();
const express = require('express')
const app = express()
const queue = require("./queue");


class App {

    async __init__() {
        globals.verify();
        await globals.__init__();
        Logger.success("Online");
        return ;
    }

    startRabbit(){
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

    startServe(){
        app.get('/', function (req, res) {
            res.send('Welcome')
        });
        const self = this;
        app.listen((process.env.PORT),function () {
            console.log(`Listening on port ${process.env.PORT}!`);
            self.startRabbit();
        });
    }
}

module.exports = (new App()).startServe();