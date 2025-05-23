export class EmailTemplates {
    // HTML email to user
    static userConfirmationHtml(name: string): string {
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Mail Received</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #EAEFEF;
          }
          .main-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1em;
          }
          .main-content-box {
            text-align: center;
            max-width: 500px;
            background: #fff;
            padding: 2em;
            border-radius: 8px;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
          }
          .logo-image {
            max-width: 120px;
            margin: 0 auto 1em;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 1em;
          }
          .message {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="main-content-box">
            <img class="logo-image" src="https://shaf-n.vercel.app/static/img/logo_light.png" alt="Shafn Logo" />
            <p class="title">Message Received</p>
            <div class="message">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
              <p>We appreciate your interest in Shafn.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    // Plain text version for user
    static userConfirmationText(name: string): string {
        return `
Hi ${name},

Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.

We appreciate your interest in Shafn.
    `.trim();
    }

    // HTML email to owner
    static ownerNotificationHtml(name: string, email: string, subject: string, message: string): string {
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Contact Submission</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #EAEFEF;
          }
          .main-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1em;
          }
          .main-content-box {
            max-width: 600px;
            background: #fff;
            padding: 2em;
            border-radius: 8px;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
          }
          .logo-image {
            max-width: 120px;
            margin: 0 auto 1em;
            display: block;
          }
          .title {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 1em;
            text-align: center;
          }
          .info {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
          }
          .info p {
            margin: 0.5em 0;
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="main-content-box">
            <img class="logo-image" src="https://shaf-n.vercel.app/static/img/logo_light.png" alt="Shafn Logo" />
            <p class="title">New Contact Form Submission</p>
            <div class="info">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    // Plain text version for owner
    static ownerNotificationText(name: string, email: string, subject: string, message: string): string {
        return `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
    `.trim();
    }
}
