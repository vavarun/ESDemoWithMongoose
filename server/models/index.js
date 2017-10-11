const mongoose = require('mongoose');
const AgentSchema = require('./Agent');
const AppointmentSchema = require('./Appointment');
const CustomerSchema = require('./Customer');

const es = require('elasticsearch');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { composeWithElastic } = require('graphql-compose-elasticsearch');
const { generate } = require('mongoose-elasticsearch-xp/lib/mapping');

const mongodbUri = 'mongodb://vvarun:vvarun123@ds113445.mlab.com:13445/es_demo';

mongoose.Promise = global.Promise;

const options = { useMongoClient: true };

const elasticClient = new es.Client({
  hosts: [
    'https://elastic:elE3ZfUt3yELZPhxwksV7H9B@99f273b74e4986d8d8a95691ba02a404.us-central1.gcp.cloud.es.io:9243'
  ]
});

mongoose.connect(mongodbUri, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', () => console.log('Moogose connected.'));

Agent.esSynchronize()
  .then(function () {
    console.log('end.');
  });

Appointment.esSynchronize()
  .then(function () {
    console.log('end.');
  });

Customer.esSynchronize()
  .then(function () {
    console.log('end.');
  });

module.exports = {
  Agent,
  Appointment,
  Customer,
  AgentEsTC,
  AgentTC,
  CustomerEsTC,
  CustomerTC,
  AppointmentEsTC,
  AppointmentTC,
};
