'use strict';

const Bacon = require('baconjs');
const AWS_ICON = 'https://a0.awsstatic.com/main/images/logos/aws_logo_105x39.png';

exports.handler = function (event, context, modules) {
  const s3 = modules.s3;
  const request = modules.request;
  const moment = modules.moment;
  const zlib = modules.zlib;
  const maxMessageCount = context.maxMessageCount || 5;

  console.log('start main');
  console.log('Received event:', JSON.stringify(event, null, 2));
  var r = event.Records[0];

  var params = {
    Bucket: r.s3.bucket.name,
    Key: r.s3.object.key
  };
  let records = Bacon.fromNodeCallback(s3.getObject.bind(s3), params)
    .map(".Body")
    .flatMap((data)=>{
      console.log(data);
    })
    ;

  console.log('end of main');
  return true;
};
