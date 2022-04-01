import fetch from 'node-fetch';

export default async ({
  from, to, subject, text, html,
}) => {
  await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.EMAIL_API_TOKEN,
    },
    body: JSON.stringify({
      From: from || '',
      To: to || '',
      Subject: subject || '',
      TextBody: text || '',
      HtmlBody: html || '',
      MessageStream: 'outbound',
    }),
  });
};
