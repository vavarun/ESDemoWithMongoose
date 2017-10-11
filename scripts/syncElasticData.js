const { Agent } = require('../server/schema/Agent');
const { Appointment } = require('../server/schema/Appointment');
const { Customer } = require('../server/schema/Customer');

module.exports = Promise.all([
  Agent.esSynchronize().then(function() {
    console.log('Agent sync end.');
  }),

  Appointment.esSynchronize().then(function() {
    console.log('Appointment sync end.');
  }),

  Customer.esSynchronize().then(function() {
    console.log('Customer sync end.');
  }),
]);
