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
 * If the Google Apps Script endpoint is left blank/unconfigured, both the
 * contact and newsletter forms fall back to FormSubmit.co, which delivers
 * directly to iqrapay2025@gmail.com with no API key embedded in the client
 * bundle. If FormSubmit.co also fails, a `mailto:iqrapay2025@gmail.com`
 * link is offered so a message can always reach the inbox.
 */
export const CONTACT_EMAIL = "iqrapay2025@gmail.com";

/**
 * FormSubmit.co fallback endpoint.
 *
 * Used when CONTACT_ENDPOINT (VITE_CONTACT_ENDPOINT) is not configured.
 * FormSubmit.co delivers submissions directly to CONTACT_EMAIL
 * (iqrapay2025@gmail.com) with NO API key embedded in the client bundle —
 * the recipient address is already public via the mailto: fallback and the
 * contact-info display.
 *
 * Trade-offs vs. the Google Apps Script path:
 *   + Zero server-side setup (no script deployment needed)
 *   + Works immediately once the site owner confirms the email (one click)
 *   - Third-party relay (GAS sends via Gmail directly instead)
 *   - Free tier: 50 submissions / month (usually enough for a contact form)
 *
 * If the email is not yet confirmed, FormSubmit.co returns an HTML page
 * (not JSON). The form detects this and gracefully degrades to a
 * mailto:iqrapay2025@gmail.com link.
 */
export const FORM_SUBMIT_ENDPOINT: string = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export const CONTACT_ENDPOINT: string =
  (import.meta.env.VITE_CONTACT_ENDPOINT || "").trim() || "";

export const isContactConfigured = () => CONTACT_ENDPOINT !== "";
