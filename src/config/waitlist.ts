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
export const SHEET_COLUMNS = ["Timestamp", "Name", "Email", "Source"] as const;

/**
 * Sample Google Apps Script (paste into Extensions → Apps Script):
 *
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(),
 *     data.name || "",
 *     data.email || "",
 *     data.source || "",
 *   ]);
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ success: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */
