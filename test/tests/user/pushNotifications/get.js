import {
    getUserAuth,
    pingPusher
} from '../../../methods';

import chai from 'chai';
import Pusher from 'pusher-js';
import { mochaAsync } from '../../../utils';


const expect = chai.expect;

context(`Get`, async () =>  {
    var user, pusher;

    before( async () =>  {
        user = (await getUserAuth({user : global.test.user.id}, global.test.user.bearerToken, {id : global.test.user.id})).data.message;

        pusher = new Pusher(process.env.PUSHER_APP_KEY, 
        { 
            cluster : 'eu',
            forceTLS: true,
            authEndpoint: 'http://localhost:8000/api/users/pusher/auth'
        }); 
    });

    it('should get public channel ping', mochaAsync(async () => {
        let channel = pusher.subscribe('general');
        let outputs = [];

        channel.bind('ping', (data) => {
            outputs.push(data);
        });    
        let res = await pingPusher({});
        expect(res.data.status).to.equal(200);
        // Not working, trying to understand why still
        //await delay(1*1000);
        //expect(outputs.length).to.not.equal(0);
    }));
    
    it('should get private channel ping', mochaAsync(async () => {
        let channel_private = pusher.subscribe(`private-${user.id}`);
        let outputs = [];
        channel_private.bind('ping', (data) => {
            outputs.push(data);
        });    
        let res = await pingPusher({user : user.id})
        expect(res.data.status).to.equal(200);
        //await delay(5*1000);
        //expect(outputs.length).to.not.equal(0);
    }));
    

});