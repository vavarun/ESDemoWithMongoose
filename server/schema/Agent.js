const mexp = require('mongoose-elasticsearch-xp');
const { generate } = require('mongoose-elasticsearch-xp/lib/mapping');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { composeWithElastic } = require('graphql-compose-elasticsearch');
const { db, mongoose } = require('../mongoose');
const elasticClient = require('../elasticClient');

const AgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    city: {
      type: String,
    },
    appointment_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  },
  {
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

AgentSchema.plugin(mexp, { client: elasticClient, index: 'agents', type: 'agent' });

const Agent = db.model('Agent', AgentSchema, 'Agents');

const AgentTC = composeWithMongoose(Agent);

const AgentEsTC = composeWithElastic({
  graphqlTypeName: 'AgentES',
  elasticIndex: 'agents',
  elasticType: 'agent',
  elasticMapping: { properties: generate(AgentSchema) },
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

module.exports = {
  AgentSchema,
  Agent,
  AgentTC,
  AgentEsTC,
};
