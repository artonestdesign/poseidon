/**
 * Poseidon Waitlist → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet named "Poseidon Waitlist"
 * 2. Rename first tab to "Waitlist" (or keep Sheet1)
 * 3. Put headers in row 1: Timestamp | Email | Source | Status
 * 4. Extensions → Apps Script → paste this file → Save
 * 5. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL into .env.local as GOOGLE_SHEETS_WEBAPP_URL
 */

// Spreadsheet: https://docs.google.com/spreadsheets/d/1cQ1labuEbzT_h-CfIaz41ss9UOLLnubYEeHYytpZPVo
var SPREADSHEET_ID = "1cQ1labuEbzT_h-CfIaz41ss9UOLLnubYEeHYytpZPVo";
var SHEET_NAME = "Poseidon Waitlist";

function doPost(e) {
  try {
    var body = {};
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var email = String(body.email || "")
      .trim()
      .toLowerCase();
    var source = String(body.source || "website").trim();

    if (!email || email.indexOf("@") === -1) {
      return json_({ ok: false, error: "Invalid email" });
    }

    var sheet = getSheet_();
    ensureHeader_(sheet);

    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var existing = sheet.getRange(2, 2, lastRow, 2).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).toLowerCase() === email) {
          return json_({ ok: true, duplicate: true });
        }
      }
    }

    sheet.appendRow([new Date(), email, source, "new"]);
    return json_({ ok: true, duplicate: false });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: "poseidon-waitlist" });
}

function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Email", "Source", "Status"]);
    return;
  }

  var first = sheet.getRange(1, 1, 1, 4).getValues()[0];
  if (!first[0] && !first[1]) {
    sheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Email", "Source", "Status"]]);
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
