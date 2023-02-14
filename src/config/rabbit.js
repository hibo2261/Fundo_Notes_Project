import { registerMail } from '../utils/user.util';

const amqplib = require('amqplib/callback_api');

const queue = 'NewUserRegDetails';

export const sender = (data) =>
  amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch1) => {
      if (err) throw err;
      ch1.assertQueue(queue);
      ch1.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    });
  });

export const receiver = () =>
  amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch2) => {
      if (err) throw err;
      ch2.assertQueue(queue);
      ch2.consume(queue, (msg) => {
        if (msg !== null) {
          const data = JSON.parse(msg.content.toString());
          ch2.ack(msg);
          console.log('Message Recieved ', data);
          // console.log("------------------------------------",data.email)
          registerMail(data.email);
        } else {
          console.log('Consumer cancelled by server');
        }
      });
    });
  });
receiver();
