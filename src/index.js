
console.log('Loading function');
var AWS = require('aws-sdk')
 , moment = require('moment')
 , request = require('request');

var main = require('./main');
var insightsConfig = require('./config');

exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  var r = event.Records[0];
  var s3 = new AWS.S3({ region: r.awsRegion });
  var modules = {
    s3: s3,
    moment: moment,
    request: request
  };
  main.sendS3logToInsights(event, context, modules, insightsConfig);
};
