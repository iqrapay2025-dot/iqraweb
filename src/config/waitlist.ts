/**
 * Waitlist → Google Sheets configuration.
 *
 * 1) Open your Google Sheet.
 * 2) Extensions → Apps Script.
 * 3) Paste the script below, then Deploy → New deployment → Web app
 *    (Execute as: Me, Who has access: Anyone). Copy the Web App URL.
 * 4) Paste that URL as GOOGLE_SHEETS_ENDPOINT below.
 * 5) Make sure your Sheet's first row headers match SHEET_COLUMNS order.
 */

// ===== 🔗 Paste your Google Apps Script Web App URL here =====
export const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyWJ5qJPf3Yt1UwmaoRmPTHkLDeSqdV8QU5-tEtxLeVqTpu42AjbuU79MNeflJBuI8Lzg/exec";

// ===== 📋 Order of columns in your Sheet (must match header row) =====
// The submit payload uses these keys. Align them with your Apps Script
// parsing (see sample script below) and your Sheet's header row.
export const SHEET_COLUMNS = [
  "Timestamp",
  "Name",
  "Email",
  "Source",
  "Referral Code",
] as const;

/**
 * Sample Google Apps Script (paste into Extensions → Apps Script):
 *
 *   const SHEET_ID = "YOUR_SPREADSHEET_ID"; // <-- replace with your Sheet ID
 *
 *   function doPost(e) {
 *     var data = JSON.parse(e.postData.contents || "{}");
 *     var referralCode = data.referralCode || "";
 *     var ss = SpreadsheetApp.openById(SHEET_ID);
 *     var sheet = ss.getSheetByName("Waitlist Responses") || ss.getActiveSheet();
 *     sheet.appendRow([
 *       new Date(),
 *       data.fullName || "",
 *       data.email || "",
 *       data.source || "",
 *       referralCode, // written to the "Referral Code" column (F in the sheet)
 *     ]);
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *
 *  IMPORTANT — deploy as a "Web app":
 *   - Execute as: Me
 *   - Who has access: Anyone, even anonymous  (enables cross-origin POST)
 *   - Copy the *Web app URL* (ends in /exec) into GOOGLE_SHEETS_ENDPOINT.
 *
 *  Debug if the form fails to submit:
 *   - The published URL must end in "/exec" (not "/dev" or the editor URL).
 *   - Test the endpoint directly to rule out CORS:
 *       curl -X POST "WEB_APP_URL" -H "Content-Type: application/json" \
 *            -d '{"fullName":"Test","email":"t@e.com","source":"hero"}'
  *     A green row in the Sheet means the backend is healthy.
 */
