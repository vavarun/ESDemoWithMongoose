const mexp = require('mongoose-elasticsearch-xp');
const { generate } = require('mongoose-elasticsearch-xp/lib/mapping');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { composeWithElastic } = require('graphql-compose-elasticsearch');
const { db, mongoose } = require('../mongoose');
const elasticClient = require('../elasticClient');

const AppointmentSchema = new mongoose.Schema(
  {
    agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    time: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
  {
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

AppointmentSchema.plugin(mexp, {
  client: elasticClient,
  index: 'appointments',
  type: 'appointment',
});

const Appointment = db.model('Appointment', AppointmentSchema, 'Appointments');

const AppointmentTC = composeWithMongoose(Appointment);

const AppointmentEsTC = composeWithElastic({
  graphqlTypeName: 'AppointmentES',
  elasticIndex: 'appointments',
  elasticType: 'appointment',
  elasticMapping: { properties: generate(AppointmentSchema) },
  elasticClient,
  pluralFields: [],
});

AppointmentEsTC.getResolver('search')
  .getTypeComposer()
  .getFieldTC('hits')
  .addRelation('fromMongo', {
    resolver: () => AppointmentTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source._id,
    },
    projection: { _id: true },
  });

module.exports = {
  AppointmentSchema,
  Appointment,
  AppointmentTC,
  AppointmentEsTC,
};
