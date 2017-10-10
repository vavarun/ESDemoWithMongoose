const mongoose = require('mongoose');
const AgentSchema = require('./Agent');
const AppointmentSchema = require('./Appointment');
const CustomerSchema = require('./Customer');
const mexp = require('mongoose-elasticsearch-xp');
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

const Agent = mongoose.model('Agent', AgentSchema.plugin(mexp, { client: elasticClient, index: 'agents', type: 'agent' }), 'Agents');
const Appointment = mongoose.model('Appointment', AppointmentSchema.plugin(mexp, { client: elasticClient, index: 'appointments', type: 'appointment' }), 'Appointments');
const Customer = mongoose.model('Customer', CustomerSchema.plugin(mexp, { client: elasticClient, index: 'customers', type: 'customer' }), 'Customers');

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

const AgentTC = composeWithMongoose(Agent);
const AppointmentTC = composeWithMongoose(Appointment);
const CustomerTC = composeWithMongoose(Customer);

const AgentEsTC = composeWithElastic({
  graphqlTypeName: 'AgentES',
  elasticIndex: 'agents',
  elasticType: 'agent',
  elasticMapping: { properties: generate(AgentSchema) },
  elasticClient,
  pluralFields: ['appointment_ids'],
});

const AppointmentEsTC = composeWithElastic({
  graphqlTypeName: 'AppointmentES',
  elasticIndex: 'appointments',
  elasticType: 'appointment',
  elasticMapping: { properties: generate(AppointmentSchema) },
  elasticClient,
  pluralFields: [],
});

const CustomerEsTC = composeWithElastic({
  graphqlTypeName: 'CustomerES',
  elasticIndex: 'customers',
  elasticType: 'customer',
  elasticMapping: { properties: generate(CustomerSchema) },
  elasticClient,
  pluralFields: ['appointment_ids'],
});

AgentEsTC.getResolver('search').getTypeComposer().getFieldTC('hits').addRelation('fromMongo', {
  resolver: () => AgentTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source._id,
  },
  projection: { _id: true },
});

AppointmentEsTC.getResolver('search').getTypeComposer().getFieldTC('hits').addRelation('fromMongo', {
  resolver: () => AppointmentTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source._id,
  },
  projection: { _id: true },
});

CustomerEsTC.getResolver('search').getTypeComposer().getFieldTC('hits').addRelation('fromMongo', {
  resolver: () => CustomerTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source._id,
  },
  projection: { _id: true },
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
