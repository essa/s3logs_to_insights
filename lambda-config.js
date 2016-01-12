
module.exports = {
  region: 'ap-northeast-1',
  handler: 'index.handler',
  role: 'arn:aws:iam::726632824334:role/bg_lambda_s3logs',
  functionName: 'S3LogsToInsights',
  timeout: 10
}
