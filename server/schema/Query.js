const { GQC } = require('graphql-compose');
const { AgentEsTC, AgentTC } = require('./Agent');
const { AppointmentEsTC, AppointmentTC } = require('./Appointment');
const { CustomerEsTC, CustomerTC } = require('./Customer');

const QueryTC = GQC.rootQuery();

QueryTC.addFields({
  agentEsSearch: AgentEsTC.getResolver('search'),
  agentEsConnection: AgentEsTC.getResolver('searchConnection'),
  agentMongoConnection: AgentTC.getResolver('connection'),
  agentMany: AgentTC.getResolver('findMany'),
  agent: AgentTC.getResolver('findOne'),
  agentById: AgentTC.getResolver('findById'),
  appointmentEsSearch: AppointmentEsTC.getResolver('search'),
  appointmentEsConnection: AppointmentEsTC.getResolver('searchConnection'),
  appointmentMongoConnection: AppointmentTC.getResolver('connection'),
  appointmentMany: AppointmentTC.getResolver('findMany'),
  appointment: AppointmentTC.getResolver('findOne'),
  appointmentById: AppointmentTC.getResolver('findById'),
  customerEsSearch: CustomerEsTC.getResolver('search'),
  customerEsConnection: CustomerEsTC.getResolver('searchConnection'),
  customerMongoConnection: CustomerTC.getResolver('connection'),
  customerMany: CustomerTC.getResolver('findMany'),
  customer: CustomerTC.getResolver('findOne'),
  customerById: CustomerTC.getResolver('findById'),
});

module.exports = QueryTC;
