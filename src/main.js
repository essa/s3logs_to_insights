'use strict';

const Bacon = require('baconjs');
const AWS_ICON = 'https://a0.awsstatic.com/main/images/logos/aws_logo_105x39.png';

function processS3Events(event, context, modules, callback=null) {
  const s3 = modules.s3;
  const request = modules.request;
  const moment = modules.moment;

  console.log('start main');
  // console.log('Received event:', JSON.stringify(event, null, 2));
  var r = event.Records[0];

  var params = {
    Bucket: r.s3.bucket.name,
    Key: r.s3.object.key
  };
  s3.getObject(params, (error, data)=>{
    if (error)
      console.log(err, err.stack);
    else {
      let lines = data.Body.split("\n");
      for (let line of lines) {
        callback(params.Key, line);
      }
    }
  });

  console.log('end of main');
  return true;
};

const S3LogFormat = /^(\S+) (\S+) \[(.+)\] (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) .*/;

function parseDateTime(moment, t) {
  const m = moment.utc(t, 'DD/MMM/YYYY:HH:mm:ss +0000');
  return m;
}

function parseS3Log(modules, key, line) {
  let ret = {};
  const matched = line.match(S3LogFormat);
  console.log(matched);
  if (matched) {
    let[ _, bucketOwner, bucket, time] = matched;
    ret.bucketOwner = bucketOwner;
    ret.bucket = bucket;
    const t = parseDateTime(modules.moment, time);
    ret.time = t.unix();
    ret.datetime = t.format();
    ret.key = key;
  }
  return ret;
};

exports.processS3Events = processS3Events;
exports.parseS3Log = parseS3Log;
