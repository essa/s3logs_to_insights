
const zlib = require('zlib');
const moment = require('moment');
const assert = require('power-assert');
const sinon = require('sinon');
const sprintf = require('sprintf');

const main = require('./main')

describe('testPowerAssert', ()=>{
  it('should fail', ()=>{
    let a = 1;
    let b = 2;
    let c = 3;
    assert.deepEqual([1, 5], [a, b + c])
  })
});

/*
describe('', ()=>{
  it('', ()=>{
  });
});
*/

const SampleEvent =
{
  "Records": [
        {
            "eventVersion": "2.0",
            "eventSource": "aws:s3",
            "awsRegion": "ap-northeast-1",
            "eventTime": "2016-01-12T03:46:05.900Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "A2XXXXXXXXXX"
            },
            "requestParameters": {
                "sourceIPAddress": "10.115.xx.yy"
            },
            "responseElements": {
                "x-amz-request-id": "307FA6227B18DA35",
                "x-amz-id-2": "XXXXXXX"
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "XXXXXXXXXX",
                "bucket": {
                    "name": "degica2-logs",
                    "ownerIdentity": {
                        "principalId": "XXXXXXXXX"
                    },
                    "arn": "arn:aws:s3:::degica2-logs"
                },
                "object": {
                    "key": "s3/logs/product-files/2016-01-12-03-46-05-XXXXXXXXXX",
                    "size": 5985,
                    "eTag": "e635396d7f406870ff75ea9670d8aaf8",
                    "sequencer": "00569476FDD402F1B6"
                }
            }
        }
    ]
};


describe('S3lotsToInsights', ()=>{
  const context = {
    succeed: ()=>true,
    maxMessageCount: 3
  };
  const modules = {
    s3: {
      getObject: (params, callback)=>true
    },
    request: {
      post: (options, callback)=>callback()
    }
  };

  it('should define function', ()=>{
    assert.equal('function', typeof main.handler);
  });

  it('should return true', ()=>{
    assert.equal(true, main.handler(SampleEvent, context, modules));
  });

  describe('calling getObject', ()=>{
    let spy;
    beforeEach(()=> spy = sinon.spy(modules.s3, 'getObject'));
    afterEach(()=> modules.s3.getObject.restore());

    it('should call getObject', ()=>{
      assert.equal(true, main.handler(SampleEvent, context, modules));
      modules.s3.getObject();
      assert(spy.called);
      let s = SampleEvent.Records[0].s3;
      let arg = spy.lastCall.args[0];
      // assert.equal(s.object.key, arg.Key);
      //assert.equal(s.bucket.name, arg.Bucket);
    });
  });
});
