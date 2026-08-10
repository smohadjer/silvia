import nodemailer from 'nodemailer';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  company_website?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  birthday?: unknown;
  email?: unknown;
  phone?: unknown;
  insurance?: unknown;
  message?: unknown;
  privacy?: unknown;
};

type Request = {
  method?: string;
  body?: ContactPayload | string;
};

type Response = {
  setHeader(name: string, value: string | string[]): void;
  status(code: number): Response;
  json(payload: Record<string, unknown>): void;
};

function getBody(body: Request['body']): ContactPayload {
  if (typeof body === 'string') {
    return Object.fromEntries(new URLSearchParams(body));
  }

  return body ?? {};
}

function getString(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(req: Request, res: Response) {
  res.setHeader('Allow', 'POST');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const payload = getBody(req.body);
  const honeypot = getString(payload.company_website, 200);

  if (honeypot) {
    return res.status(200).json({ message: 'Ihre Nachricht wurde erfolgreich gesendet.' });
  }

  const firstName = getString(payload.first_name, 100);
  const lastName = getString(payload.last_name, 100);
  const birthday = getString(payload.birthday, 10);
  const email = getString(payload.email, 254).toLowerCase();
  const phone = getString(payload.phone, 60);
  const insurance = getString(payload.insurance, 20);
  const message = getString(payload.message, 5000);
  const privacyAccepted = payload.privacy === true || payload.privacy === 'true';
  const insuranceLabels: Record<string, string> = {
    gesetzlich: 'Gesetzlich versichert',
    privat: 'Privat versichert',
    selbstzahler: 'Selbstzahler'
  };

  if (!firstName || !lastName || !birthday || !EMAIL_PATTERN.test(email) || !insuranceLabels[insurance] || !message || !privacyAccepted) {
    return res.status(400).json({
      error: 'Bitte füllen Sie alle Pflichtfelder korrekt aus.'
    });
  }

  const user = process.env.email_username;
  const pass = process.env.email_password;
  const recipient = process.env.email_to;

  if (!user || !pass || !recipient) {
    console.error('Missing email_username, email_password, or email_to environment variable.');
    return res.status(500).json({ error: 'Die Nachricht konnte nicht gesendet werden.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });

  const text = [
    `Vorname: ${firstName}`,
    `Nachname: ${lastName}`,
    `Geburtsdatum: ${birthday}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || 'Nicht angegeben'}`,
    `Krankenversicherung: ${insuranceLabels[insurance]}`,
    '',
    'Nachricht:',
    message
  ].join('\n');

  try {
    await transporter.sendMail({
      from: user,
      to: recipient,
      replyTo: email,
      subject: `Kontaktanfrage von ${firstName} ${lastName}`,
      text
    });

    return res.status(200).json({ message: 'Ihre Nachricht wurde erfolgreich gesendet.' });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(500).json({ error: 'Die Nachricht konnte nicht gesendet werden.' });
  }
}
