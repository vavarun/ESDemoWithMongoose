const AgentSchema = require('./Agent');
const AppointmentSchema = require('./Appointment');
const CustomerSchema = require('./Customer');

Agent.esSynchronize().then(function() {
  console.log('end.');
});

Appointment.esSynchronize().then(function() {
  console.log('end.');
});

Customer.esSynchronize().then(function() {
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

const { GQC } = require('graphql-compose');
require('./Query'); // create query type with all required models
const gqcSchema = GQC.buildSchema();
module.exports = gqcSchema;

/*
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const extraSchema = makeExecutableSchema({
  typeDefs: `
    type Query {
      gqlTools: String
    }
  `,
  resolvers: {
    Query: {
      gqlTools: () => 'Hi from gqlTools'
    }
  }
});
const schema = mergeSchemas({
  schemas: [extraSchema, gqcSchema]
  // if your type conflict
  // onTypeConflict: () => ({

  // })
})

module.exports = schema;
*/
