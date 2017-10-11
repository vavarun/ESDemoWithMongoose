const AgentSchema = require('./Agent');
const AppointmentSchema = require('./Appointment');
const CustomerSchema = require('./Customer');

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
