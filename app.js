const feathers = require('f5');
const express = require('f5_exp');
// const feathers = require('@feathersjs/feathers');
// const express = require('@feathersjs/express');
const services = require('./service')
const request = require('supertest');
const axios = require('axios');

const app = express(feathers());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());


// Register the message service on the Feathers application
app.configure(services)

// Log every time a new message has been created
app.service('messages').on('created', (message) => {
  console.log('A new message has been created', message)
})

// A function that creates messages and then logs
// all existing messages on the service
const main = async () => {
  // Create a new message on our message service
  await app.service('messages').create({
    text: 'Hello Feathers'
  })

  // And another one
  await app.service('messages').create({
    text: 'Hello again'
  })

  // Find all existing messages
  const messages = await app.service('messages').find()

  console.log('All messages', messages)


  // WITH SUPERTEST
  return request(app)
  .post('/messages')
  .expect(201)
  .catch(e=>{
    console.log(e)
  })

  // WITH AXIOS
  // app.listen(3000)
  
  
  // axios.get('http://localhost:3000/messages')
  // .then(res => {
  //   const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  //   console.log('Status Code:', res.status);
  //   console.log('Date in Response header:', headerDate);

  //   const users = res.data;

  //   for(user of users) {
  //     console.log(`Got user with id: ${user.id}, name: ${user.name}`);
  //   }
  // })
  // .catch(err => {
  //   console.log('Error: ', err.message);
  // });

     
}

main()