import { PORT } from './config';
function connect(){
    return require('amqplib').connect(`amqp://localhost:${PORT}`).then(conn => conn.createChannel());
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
  function sendToQueue(queue, message){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))))
      .catch(err => console.log(err))
  }
  function consume(queue, callback){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.consume(queue, callback, { noAck: true }))
      .catch(err => console.log(err));
  }
  module.exports = {
    sendToQueue,
    consume
  }