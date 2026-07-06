# EmailJS Setup Guide

This guide will help you configure the contact form to send emails directly to your inbox.

## What is EmailJS?

EmailJS allows you to send emails directly from client-side JavaScript without a backend server. It's perfect for contact forms in static websites.

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. After logging in, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (Recommended for personal use)
   - **Outlook / Office 365**
   - **Yahoo**
   - **Custom SMTP** (for other providers)

4. For Gmail:
   - Click "Connect Account"
   - Sign in with your Google account
   - Allow EmailJS to send emails on your behalf
   - Click "Create Service"

5. **Note your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Configure the template:

**Template Name:** Portfolio Contact Form

**Subject:**
```
New Message from {{from_name}} via Portfolio
```

**Content (HTML):**
```html
<p>You have received a new message from your portfolio website!</p>

<h3>Contact Details:</h3>
<ul>
  <li><strong>Name:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
</ul>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><em>This email was sent from your portfolio contact form.</em></p>
```

**To Email:**
```
{{to_email}}
```

4. Click **Save**
5. **Note your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (User ID)
3. **Note your Public Key** (e.g., `user_123abc456def`)

### Step 5: Update Your Portfolio Code

Open `components/Contact.tsx` and update these lines:

```typescript
const serviceID = 'service_abc123';      // Your Service ID
const templateID = 'template_xyz789';     // Your Template ID
const userID = 'user_123abc456def';      // Your Public Key
```

**Example:**
```typescript
// EmailJS configuration
const serviceID = 'service_abc123';
const templateID = 'template_xyz789';
const userID = 'user_123abc456def';

const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  to_name: 'Muhammad Haris',
  message: formData.message,
  to_email: personalInfo.email,  // Your email from portfolio-data.ts
};
```

### Step 6: Test the Contact Form

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox

## Environment Variables (Optional - Recommended)

For better security, use environment variables instead of hardcoding IDs.

### 1. Create `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_USER_ID=user_123abc456def
```

### 2. Update Contact.tsx:

```typescript
const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
```

### 3. Add to Deployment Platform:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add the three variables

**Netlify:**
- Go to Site Settings → Environment Variables
- Add the three variables

## Customization Options

### Custom Reply-To Address

Update template to include reply-to:

```typescript
const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  reply_to: formData.email,  // Add this line
  to_name: 'Muhammad Haris',
  message: formData.message,
  to_email: personalInfo.email,
};
```

In EmailJS template settings:
- Reply To: `{{reply_to}}`

### Auto-Reply to User

Create a second template for auto-replies:

**Template Name:** Portfolio Contact - Auto Reply

**To Email:** `{{from_email}}`

**Subject:** `Thank you for contacting me!`

**Content:**
```html
<p>Hi {{from_name}},</p>

<p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>

<p>Best regards,<br>
Muhammad Haris</p>
```

Update Contact.tsx to send two emails:

```typescript
// Send to yourself
await emailjs.send(serviceID, templateID, templateParams, userID);

// Send auto-reply to user
await emailjs.send(serviceID, autoReplyTemplateID, templateParams, userID);
```

### Add reCAPTCHA (Anti-Spam)

1. Get reCAPTCHA key from [Google reCAPTCHA](https://www.google.com/recaptcha)

2. Install package:
   ```bash
   npm install react-google-recaptcha
   ```

3. Add to Contact.tsx:
   ```typescript
   import ReCAPTCHA from "react-google-recaptcha";
   
   const [recaptchaToken, setRecaptchaToken] = useState('');
   
   const handleRecaptcha = (token: string | null) => {
     setRecaptchaToken(token || '');
   };
   
   // In form
   <ReCAPTCHA
     sitekey="YOUR_SITE_KEY"
     onChange={handleRecaptcha}
   />
   ```

## EmailJS Free Plan Limits

- **200 emails/month**
- **1 email service**
- **2 email templates**
- **Basic support**

For higher limits, consider upgrading to a paid plan.

## Troubleshooting

### Emails Not Sending

**Check 1: Service Connected**
- Go to EmailJS → Email Services
- Ensure service status is "Connected"

**Check 2: IDs Correct**
- Double-check Service ID, Template ID, and User ID
- No extra spaces or characters

**Check 3: Console Errors**
- Open browser DevTools → Console
- Look for error messages

**Check 4: Email Quota**
- Check if you've exceeded free plan limit (200/month)

### Emails Going to Spam

**Solution 1: Verify Domain**
- In EmailJS, verify your domain
- Add SPF and DKIM records

**Solution 2: Use Business Email**
- Instead of Gmail, use business email (e.g., contact@yourdomain.com)

**Solution 3: Warm Up Email**
- Start with few emails
- Gradually increase volume

### CORS Errors

EmailJS should handle CORS automatically, but if you see errors:

```typescript
// Add headers
const response = await emailjs.send(
  serviceID,
  templateID,
  templateParams,
  {
    publicKey: userID,
  }
);
```

## Alternative Solutions

If you prefer not to use EmailJS:

### 1. Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

### 2. Netlify Forms (if hosted on Netlify)
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```

### 3. Backend API
Create your own backend with:
- Node.js + Nodemailer
- Next.js API Routes
- Serverless Functions

### 4. Web3Forms
Free form backend service:
```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <!-- form fields -->
</form>
```

## Best Practices

1. **Validate Input**
   - Always validate email format
   - Sanitize user input
   - Add character limits

2. **User Feedback**
   - Show loading state while sending
   - Display success/error messages
   - Clear form after successful send

3. **Error Handling**
   - Catch all errors
   - Provide helpful error messages
   - Log errors for debugging

4. **Security**
   - Use environment variables for keys
   - Never expose secret keys client-side
   - Add rate limiting if possible

5. **Testing**
   - Test on different devices
   - Test with various email formats
   - Test error scenarios

## Support

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Support:** support@emailjs.com
- **Community Forum:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

---

**Your contact form is now ready to receive messages! 📧**
