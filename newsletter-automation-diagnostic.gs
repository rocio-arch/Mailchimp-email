// ============================================
// NEWSLETTER AUTOMATION - DIAGNOSTIC VERSION
// ============================================
// This version will help us see exactly what values are being compared

function onEditHandler(e) {
  // ---------- CONFIGURATION ----------
  var WEBHOOK_URL = "https://hook.eu2.make.com/a7kogemsw81uwjdor36n8ps6xk14t5xe";
  var TRIGGER_CELL = "B3";
  var TRIGGER_VALUE = "Ready to Generate";

  // ---------- MAIN LOGIC ----------

  // Exit early if no edit event
  if (!e) {
    Logger.log("No edit event detected");
    return;
  }

  var range = e.range;
  var sheet = range.getSheet();
  var sheetName = sheet.getName();
  var cellAddress = range.getA1Notation();
  var cellValue = range.getValue();

  // DIAGNOSTIC: Log everything about the edit
  Logger.log("=== EDIT DETECTED ===");
  Logger.log("Sheet: " + sheetName);
  Logger.log("Cell: " + cellAddress);
  Logger.log("Value: '" + cellValue + "'");
  Logger.log("Value type: " + typeof cellValue);
  Logger.log("Value length: " + (cellValue ? cellValue.toString().length : 0));

  // DIAGNOSTIC: If it's cell B3, show detailed comparison
  if (cellAddress === TRIGGER_CELL) {
    Logger.log("=== B3 WAS EDITED ===");
    Logger.log("Expected value: '" + TRIGGER_VALUE + "'");
    Logger.log("Expected length: " + TRIGGER_VALUE.length);
    Logger.log("Actual value: '" + cellValue + "'");
    Logger.log("Actual length: " + (cellValue ? cellValue.toString().length : 0));
    Logger.log("Values match (strict): " + (cellValue === TRIGGER_VALUE));
    Logger.log("Values match (after trim): " + (cellValue.toString().trim() === TRIGGER_VALUE.trim()));

    // Character-by-character comparison
    if (cellValue && cellValue.toString().length <= 50) {
      Logger.log("Character codes in actual value:");
      for (var i = 0; i < cellValue.toString().length; i++) {
        Logger.log("  [" + i + "] '" + cellValue.toString()[i] + "' = " + cellValue.toString().charCodeAt(i));
      }
    }
  }

  // Check if this is our trigger cell with trigger value
  // MODIFIED: Use trim() to handle whitespace issues
  if (cellAddress === TRIGGER_CELL && cellValue && cellValue.toString().trim() === TRIGGER_VALUE.trim()) {

    Logger.log("✓ TRIGGER ACTIVATED for sheet: " + sheetName);

    // Update cell to "Processing..." immediately
    sheet.getRange(TRIGGER_CELL).setValue("Processing...");
    SpreadsheetApp.flush(); // Force immediate update

    // Gather data from sheet
    var payload = {
      "sheetName": sheetName,
      "category": sheet.getRange("B2").getValue(),
      "size": sheet.getRange("B5").getValue(),
      "templateId": sheet.getRange("B7").getValue(),
      "nativeAds": sheet.getRange("B4").getValue(),
      "timestamp": new Date().toISOString(),
      "triggerCell": TRIGGER_CELL
    };

    Logger.log("Payload: " + JSON.stringify(payload));

    // Send to Make.com webhook
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };

    try {
      var response = UrlFetchApp.fetch(WEBHOOK_URL, options);
      var responseCode = response.getResponseCode();

      Logger.log("Webhook response code: " + responseCode);

      if (responseCode === 200) {
        Logger.log("SUCCESS: Webhook triggered successfully");
        // Cell will be updated to "Completed" by Make.com workflow
      } else {
        Logger.log("ERROR: Webhook returned code " + responseCode);
        sheet.getRange(TRIGGER_CELL).setValue("Error - Try Again");
      }

    } catch (error) {
      Logger.log("ERROR sending webhook: " + error.toString());
      sheet.getRange(TRIGGER_CELL).setValue("Error - Try Again");
    }

  } else {
    // Not our trigger event
    if (cellAddress === TRIGGER_CELL) {
      Logger.log("✗ B3 was edited but value doesn't match trigger");
    } else {
      Logger.log("Not cell B3, ignoring");
    }
  }
}

// ---------- MANUAL DIAGNOSTIC FUNCTION ----------
// Run this to see what value is actually in B3
function checkB3Value() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var cellValue = sheet.getRange("B3").getValue();
  var TRIGGER_VALUE = "Ready to Generate";

  Logger.log("=== B3 DIAGNOSTIC ===");
  Logger.log("Current value in B3: '" + cellValue + "'");
  Logger.log("Value type: " + typeof cellValue);
  Logger.log("Value length: " + (cellValue ? cellValue.toString().length : 0));
  Logger.log("Expected: '" + TRIGGER_VALUE + "'");
  Logger.log("Expected length: " + TRIGGER_VALUE.length);
  Logger.log("Match (strict): " + (cellValue === TRIGGER_VALUE));
  Logger.log("Match (with trim): " + (cellValue.toString().trim() === TRIGGER_VALUE.trim()));

  // Show character codes
  if (cellValue) {
    Logger.log("\nCharacter-by-character breakdown:");
    var str = cellValue.toString();
    for (var i = 0; i < str.length; i++) {
      var char = str[i];
      var code = str.charCodeAt(i);
      var display = char === ' ' ? '[SPACE]' : char;
      Logger.log("  Position " + i + ": '" + display + "' (code: " + code + ")");
    }
  }

  // Check the dropdown values
  var validation = sheet.getRange("B3").getDataValidation();
  if (validation) {
    Logger.log("\n=== DROPDOWN OPTIONS ===");
    var criteria = validation.getCriteriaValues()[0];
    if (criteria && criteria.length) {
      for (var i = 0; i < criteria.length; i++) {
        Logger.log("Option " + (i+1) + ": '" + criteria[i] + "' (length: " + criteria[i].length + ")");
      }
    }
  }
}

// ---------- MANUAL TEST FUNCTION ----------
function testTrigger() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetName = sheet.getName();
  var TRIGGER_CELL = "B3";

  Logger.log("Testing trigger for sheet: " + sheetName);

  var payload = {
    "sheetName": sheetName,
    "category": sheet.getRange("B2").getValue(),
    "size": sheet.getRange("B5").getValue(),
    "templateId": sheet.getRange("B7").getValue(),
    "nativeAds": sheet.getRange("B4").getValue(),
    "timestamp": new Date().toISOString(),
    "triggerCell": TRIGGER_CELL
  };

  Logger.log("Test payload: " + JSON.stringify(payload));

  var WEBHOOK_URL = "https://hook.eu2.make.com/a7kogemsw81uwjdor36n8ps6xk14t5xe";

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  try {
    var response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    Logger.log("Response code: " + response.getResponseCode());
    Logger.log("Response: " + response.getContentText());
  } catch (error) {
    Logger.log("ERROR: " + error.toString());
  }
}
