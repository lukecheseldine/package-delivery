import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';
import 'dotenv/config';

if (
  !process.env['AWS_ACCESS_KEY'] ||
  !process.env['AWS_SECRET_ACCESS_KEY'] ||
  !process.env['AWS_QUEUE_URL']
) {
  throw new Error('AWS credentials are not set in the environment variables.');
}
console.log('running!');

const app = Consumer.create({
  queueUrl: process.env['AWS_QUEUE_URL'],
  handleMessage: async (message) => {
    console.log(message);
  },
  sqs: new SQSClient({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    },
  }),
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.on('timeout_error', (err) => {
  console.error(err.message);
});

app.start();
