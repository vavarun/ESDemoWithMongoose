const mexp = require('mongoose-elasticsearch-xp');
const { generate } = require('mongoose-elasticsearch-xp/lib/mapping');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { composeWithElastic } = require('graphql-compose-elasticsearch');
const { db, mongoose } = require('../mongoose');
const elasticClient = require('../elasticClient');

const CustomerSchema = new mongoose.Schema(
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

CustomerSchema.plugin(mexp, { client: elasticClient, index: 'customers', type: 'customer' });

const Customer = db.model('Customer', CustomerSchema, 'Customers');

const CustomerTC = composeWithMongoose(Customer);

const CustomerEsTC = composeWithElastic({
  graphqlTypeName: 'CustomerES',
  elasticIndex: 'customers',
  elasticType: 'customer',
  elasticMapping: { properties: generate(CustomerSchema) },
  elasticClient,
  pluralFields: ['appointment_ids'],
});

CustomerEsTC.getResolver('search')
  .getTypeComposer()
  .getFieldTC('hits')
  .addRelation('fromMongo', {
    resolver: () => CustomerTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source._id,
    },
    projection: { _id: true },
  });

module.exports = {
  CustomerSchema,
  Customer,
  CustomerTC,
  CustomerEsTC,
};
