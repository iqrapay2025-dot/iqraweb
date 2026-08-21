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
export const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwUzAgt8TpnD-Y418kHeFHktPcanmo4NRqyNcCKR9-iZ5nm1Sc2W_956ik6L59XbRtO/exec";

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
 *     // Normalised copies are used ONLY for duplicate comparison; the row is
 *     // still stored exactly as submitted.
 *     var emailNorm = String(data.email || "").trim().toLowerCase();
 *     var nameNorm = String(data.fullName || "").trim().toLowerCase();
 *
 *     var ss = SpreadsheetApp.openById(SHEET_ID);
 *     var sheet = ss.getSheetByName("Waitlist Responses") || ss.getActiveSheet();
 *     var lastRow = sheet.getLastRow();
 *
 *     // CHECK 1 — Email (column C)
 *     if (lastRow > 1) {
 *       var emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
 *       for (var i = 0; i < emails.length; i++) {
 *         if (String(emails[i][0]).trim().toLowerCase() === emailNorm) {
 *           return jsonResponse({ "result": "duplicate_email" });
 *         }
 *       }
 *     }
 *
 *     // CHECK 2 — Name (column B), only reached when the email is new
 *     if (lastRow > 1) {
 *       var names = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
 *       for (var j = 0; j < names.length; j++) {
 *         if (String(names[j][0]).trim().toLowerCase() === nameNorm) {
 *           return jsonResponse({ "result": "duplicate_name" });
 *         }
 *       }
 *     }
 *
 *     // Neither duplicate → append the row normally
 *     sheet.appendRow([
 *       new Date(),
 *       data.fullName || "",
 *       data.email || "",
 *       data.source || "",
 *       data.referralCode || "", // written to the "Referral Code" column (E)
 *     ]);
 *     return jsonResponse({ "result": "success" });
 *   }
 *
 *   function jsonResponse(obj) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify(obj))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *
 *  IMPORTANT — deploy as a "Web app":
 *   - Execute as: Me
 *   - Who has access: Anyone, even anonymous  (enables cross-origin POST)
 *   - Copy the *Web app URL* (ends in /exec) into GOOGLE_SHEETS_ENDPOINT.
 *   - After EDITING an existing script (e.g. adding these duplicate checks),
 *     Deploy → Manage deployments → ✏️ → Version: New version → Deploy.
 *     The live /exec URL keeps running the old code until a new version is
 *     published.
 *
 *  Debug if the form fails to submit:
 *   - The published URL must end in "/exec" (not "/dev" or the editor URL).
 *   - Test the endpoint directly to rule out CORS:
 *       curl -X POST "WEB_APP_URL" -H "Content-Type: application/json" \
 *            -d '{"fullName":"Test","email":"t@e.com","source":"hero"}'
  *     A green row in the Sheet means the backend is healthy.
 */
