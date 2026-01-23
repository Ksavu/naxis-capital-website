import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const inboundEmail = req.body;

    console.log('Inbound email received:', inboundEmail);

    try {
      // Forward to Gmail
      await resend.emails.send({
        from: 'contact@naxis.capital',       // your domain
        to: 'nenadv36@gmail.com',            // your Gmail
        subject: `FWD: ${inboundEmail.subject}`,
        html: inboundEmail.html,
        text: inboundEmail.text,
      });

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Error forwarding email:', err);
      return res.status(500).send('Error');
    }
  }

  res.status(405).send('Method Not Allowed');
}
