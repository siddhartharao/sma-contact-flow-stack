import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class SmaContactFlowStackStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new NodejsFunction(this, 'sma-contact-flow-lambda', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/lambda/index.ts`),
    });

    const amazonConnectPolicy = new iam.PolicyStatement({
      actions: ['connect:*'],
      resources: ['*']
    });

    const s3Policy = new iam.PolicyStatement({
      actions: ['s3:*'],
      resources: ['*']
    });

    myFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'amazonconnect-policy', {
        statements: [amazonConnectPolicy, s3Policy],
      }),
    );
  }
}