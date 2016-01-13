'use strict';

const Bacon = require('baconjs');
const AWS_ICON = 'https://a0.awsstatic.com/main/images/logos/aws_logo_105x39.png';

const processS3Events = function (event, context, modules, callback=null) {
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

exports.processS3Events = processS3Events;
