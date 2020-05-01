import { CLOUDAMQP_URL } from './config';
const amqplib = require('amqplib');
function connect(){
    return amqplib.connect(CLOUDAMQP_URL).then(conn => conn.createChannel());
  }
  function createQueue(channel, queue){
    return new Promise((resolve, reject) => {
      try{
        channel.assertQueue(queue, { durable: true });
        resolve(channel);
      }
      catch(err){ reject(err) }
    });
  }
  function consume(queue, callback){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.consume(queue, callback, { noAck: true }))
      .catch(err => console.log(err));
  }
  module.exports = {
    consume
  }