const mongoose = require('mongoose');

const mongodbUri = 'mongodb://vvarun:vvarun123@ds113445.mlab.com:13445/es_demo';
const options = { useMongoClient: true };

mongoose.Promise = global.Promise;

mongoose.connect(mongodbUri, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', () => console.log('Moogose connected.'));

module.exports = {
  db,
  mongoose,
};
