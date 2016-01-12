
console.log('Loading function');
var AWS = require('aws-sdk')
 , zlib = require('zlib')
 , moment = require('moment')
 , request = require('request');

var main = require('./main');

exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  var r = event.Records[0];
  var s3 = new AWS.S3({ region: r.awsRegion });
  var modules = {
    s3: s3,
    zlib: zlib,
    moment: moment,
    request: request
  };

  // main.handler(event, context, modules);
};
