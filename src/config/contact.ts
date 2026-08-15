/**
 * Contact & newsletter email transport (Google Apps Script).
 *
 * Why Google Apps Script instead of an in-bundle API key?
 * -------------------------------------------------------
 * The previous implementation posted the form directly to the Web3Forms API
 * using an access key that was hardcoded in the client bundle. That key was
 * visible to anyone who viewed the page source, turning our form endpoint into
 * an open relay that spammers could abuse to send mail to whatever inbox the
 * key was registered to.
 *
 * Google Apps Script removes that risk entirely: the recipient
 * (`iqrapay2025@gmail.com`) is hardcoded INSIDE the server-side script, so the
 * client never holds a secret, cannot redirect submissions, and spam is rejected
 * server-side (field validation + a hidden honeypot). Google handles the traffic,
 * so it scales with the site.
 *
 * This mirrors the existing `src/config/waitlist.ts` pattern already used by the
 * waitlist modal.
 *
 * Setup:
 * 1. Open https://script.google.com while logged in as iqrapay2025@gmail.com.
 * 2. Create a new project and paste the code from `src/CONTACT_FORM_SETUP.md`.
 * 3. Deploy -> New deployment -> Web app:
 *       Execute as: "Me"
 *       Who has access: "Anyone, even anonymous"
 * 4. Paste the "Web app URL" here, or set it via the VITE_CONTACT_ENDPOINT
 *    environment variable (see .env.example) so it can differ per environment.
 *
 * If the endpoint is left blank/unconfigured, both the contact and newsletter
 * forms fall back to a `mailto:iqrapay2025@gmail.com` link, so a message is
 * still delivered directly to the inbox.
 */
export const CONTACT_EMAIL = "iqrapay2025@gmail.com";

export const CONTACT_ENDPOINT: string =
  (import.meta.env.VITE_CONTACT_ENDPOINT || "").trim() || "";

export const isContactConfigured = () => CONTACT_ENDPOINT !== "";
