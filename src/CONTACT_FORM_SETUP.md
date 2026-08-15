# 📧 Contact Form Setup — Google Apps Script (direct to iqrapay2025@gmail.com)

The contact and newsletter forms email **directly** to `iqrapay2025@gmail.com`
through a small Google Apps Script web app. There is **no API key in the client
bundle**, the **recipient is fixed inside the script** (so it cannot be
redirected by an attacker), and Google handles the traffic.

## 1. Create the script

1. While logged in as **iqrapay2025@gmail.com**, open https://script.google.com.
2. Start a new project (`+` → **New project**).
3. Replace the placeholder editor content with the code below.
4. Save (e.g. as `IqraPay Forms`).

```js
/**
 * IqraPay — contact & newsletter email handler.
 *
 * Sends submissions DIRECTLY to iqrapay2025@gmail.com via GmailApp.
 * Recipient is fixed in code (cannot be overridden from the client), and all
 * input is validated server-side as a defence-in-depth against spam.
 */
const RECIPIENT = "iqrapay2025@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  let data = {};
  try {
    data = JSON.parse(e.postData.contents || "{}");
  } catch (err) {
    return _json({ success: false, message: "Invalid request." });
  }

  // Honeypot: a real field named "website" is hidden off-screen on the form.
  // Bots fill it; humans cannot see it. If it has a value, discard silently.
  if (data.website && String(data.website).trim() !== "") {
    return _json({ success: true });
  }

  const action = (data.action || "contact").toString().trim().toLowerCase();
  const email = (data.email || "").toString().trim();

  // Truncate lengths to prevent abuse / oversized payloads.
  const name = (data.name || "").toString().trim().slice(0, 100);
  const subject = (data.subject || "").toString().trim().slice(0, 150);
  const message = (data.message || "").toString().trim().slice(0, 3000);

  let subjectLine = "";
  let body = "";

  if (action === "subscribe") {
    if (!EMAIL_RE.test(email)) {
      return _json({ success: false, message: "Please enter a valid email address." });
    }
    subjectLine = "New IqraPay newsletter subscription";
    body = `New newsletter subscription from: ${email}`;
  } else {
    // contact
    if (!name) return _json({ success: false, message: "Please enter your name." });
    if (!EMAIL_RE.test(email)) return _json({ success: false, message: "Please enter a valid email address." });
    if (!subject) return _json({ success: false, message: "Please enter a subject." });
    if (!message) return _json({ success: false, message: "Please enter a message." });
    subjectLine = subject;
    body =
      `IqraPay contact form message\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}`;
  }

  try {
    GmailApp.sendEmail(
      RECIPIENT,
      `[IqraPay] ${subjectLine}`,
      body,
      {
        htmlBody: body.replace(/\n/g, "<br>").replace(/  /g, "&nbsp; "),
        replyTo: email, // so the recipient can reply directly to the sender
        name: "IqraPay Website",
      }
    );
    return _json({ success: true, message: "OK" });
  } catch (err) {
    // Log server-side for debugging; return a generic message to the client.
    console.error("IqraPay form delivery failed:", err);
    return _json({
      success: false,
      message: "Server error. Please try again later or email us directly at iqrapay2025@gmail.com.",
    });
  }
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
}
```

## 2. Deploy as a Web App

1. In the Apps Script editor: **Deploy → New deployment**.
2. Select **Type: Web app**.
3. Settings:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone, even anonymous` (enables cross-origin POST)
4. Click **Deploy**. Authorise the scopes (`gmail` + `script`) when prompted.
5. Copy the **Web app URL** (it ends in `/exec`).

## 3. Wire it to the site

Open a terminal in the project root:

```bash
# 1. Create a real .env from the template (only if you haven't already)
cp .env.example .env

# 2. Paste your script's Web app URL
#    (edit .env and uncomment/set this line)
VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/AKf.../exec

# 3. Restart the dev server
npm run dev
```

The same endpoint handles **both** the Contact page form (`action: "contact"`)
and the newsletter form (`action: "subscribe"`), and both deliver to
`iqrapay2025@gmail.com`.

## 4. Safety net

If `VITE_CONTACT_ENDPOINT` is empty, the form does **not** break: it falls back
to a `mailto:iqrapay2025@gmail.com` link that opens the visitor's email client
pre-addressed to the inbox. So a message always reaches us, even before the
script is deployed.

## 5. Test

- Fill the Contact form, click **Send Message** → a success toast appears and an
  email lands in `iqrapay2025@gmail.com` (check Spam if not in Inbox).
- Leave the `website` honeypot blank as a human; the server should accept it.
- Try submitting with an invalid email → server returns a validation error.
