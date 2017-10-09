const { GQC } = require('graphql-compose');
const {
  AgentEsTC,
  AgentTC,
  AppointmentEsTC,
  AppointmentTC,
  CustomerEsTC,
  CustomerTC
} = require('../models');

GQC.rootQuery().addFields({
  agentEsConnection: AgentEsTC.getResolver('search'),
  agentMongoConnection: AgentTC.getResolver('connection'),
  agentMany: AgentTC.getResolver('findMany'),
  agent: AgentTC.getResolver('findOne'),
  agentById: AgentTC.getResolver('findById'),
  appointmentEsConnection: AppointmentEsTC.getResolver('search'),
  appointmentMongoConnection: AppointmentTC.getResolver('connection'),
  appointmentMany: AppointmentTC.getResolver('findMany'),
  appointment: AppointmentTC.getResolver('findOne'),
  appointmentById: AppointmentTC.getResolver('findById'),
  customerEsConnection: CustomerEsTC.getResolver('search'),
  customerMongoConnection: CustomerTC.getResolver('connection'),
  customerMany: CustomerTC.getResolver('findMany'),
  customer: CustomerTC.getResolver('findOne'),
  customerById: CustomerTC.getResolver('findById'),
});

const schema = GQC.buildSchema();
module.exports = schema;
