const es = require('elasticsearch');

const elasticClient = new es.Client({
  hosts: [
    'https://elastic:elE3ZfUt3yELZPhxwksV7H9B@99f273b74e4986d8d8a95691ba02a404.us-central1.gcp.cloud.es.io:9243'
  ]
});

module.exports = elasticClient;
