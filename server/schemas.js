const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');

const { GQCType } = require('./types');

module.exports = GQCType.default;
