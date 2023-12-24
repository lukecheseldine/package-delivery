import express from 'express';
import 'dotenv/config';
import OpenAI from 'openai';
import { SQS } from '@aws-sdk/client-sqs';

const app = express();
app.use(express.json());

const OpenAIClient = new OpenAI();

const SQSClient = new SQS({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

type isDeliveryEmailStatus = 'Yes' | 'No' | 'Unsure';

const checkIsDeliveryEmail: (
  subject: string,
  body: string
) => Promise<isDeliveryEmailStatus> = async (subject: string, body: string) => {
  // check subject line
  try {
    let completion = await OpenAIClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            "You will receive an email subject line, and you must determine \
            whether the email contains a package arrival notification. \
            Return 'Yes' only if you are 100% sure the email means that a package \
            has been delivered. If you are at all unsure, return 'Unsure'. \
            It is okay to be unsure. \
            If you are certain it is not a delivery notification, return 'No'",
        },
        { role: 'user', content: `${subject}` },
      ],
      model: 'gpt-3.5-turbo',
    });
    let result = completion.choices[0].message.content.trim();
    if (result === 'Yes') {
      return 'Yes';
    } else if (result === 'No') {
      return 'No';
    }

    // check body if subject line is inconclusive
    completion = await OpenAIClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            "You will receive an email and you must determine \
            whether the email contains a package arrival notification. \
            Return 'Yes' only if you are 100% sure the email means that a package \
            has been delivered. If you are at all unsure, return 'Unsure'. \
            It is okay to be unsure. \
            If you are certain it is not a delivery notification, return 'No'",
        },
        { role: 'user', content: `${subject}` },
      ],
      model: 'gpt-3.5-turbo',
    });
    result = completion.choices[0].message.content.trim();
    if (result === 'Yes') {
      return 'Yes';
    } else if (result === 'No') {
      return 'No';
    } else {
      return 'Unsure';
    }
  } catch (error) {
    console.error(`Error communicating with OpenAI: ${error}`);
    return 'No';
  }
};

const sendMessageToSQS = (
  from: string,
  isDeliveryEmail: isDeliveryEmailStatus
) => {
  console.group('Found Delivery Email');
  const message = {
    from: from,
    isDeliveryEmail: isDeliveryEmail,
  };
  const params = {
    QueueUrl: process.env.AWS_QUEUE_URL,
    MessageBody: JSON.stringify(message),
  };
  SQSClient.sendMessage(params, (err, data) => {
    if (err) {
      console.error(`Error sending message ${err}`);
    } else {
      console.log(`Message sent: ${data.MessageId}`);
    }
  });
  console.groupEnd();
};

app.post('/inbound_email', async (req, res) => {
  console.group('Email Received');
  const subject = req.body?.headers?.subject;
  const body = req.body?.envelope?.plain;
  const from = req.body?.headers?.from;
  console.log(`received email from ${from}`);
  console.log(`subject: ${subject}`);
  console.log(`body: ${body}`);

  const isDeliveryEmail = await checkIsDeliveryEmail(subject, body);
  console.log(`isDeliveryEmail: ${isDeliveryEmail}`);
  console.groupEnd();
  if (isDeliveryEmail === 'Yes' || isDeliveryEmail === 'Unsure') {
    sendMessageToSQS(from, isDeliveryEmail);
  }

  res.sendStatus(200);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
