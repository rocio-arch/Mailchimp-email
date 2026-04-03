# Google Sheets Newsletter Automation - Setup & Troubleshooting

## Initial Setup

1. **Open your Google Sheet**
2. Go to **Extensions > Apps Script**
3. **Copy and paste** the code from `newsletter-automation-final.gs`
4. **Save** the script (Ctrl+S)

### Create the Trigger

5. Click the **⏰ Triggers** icon (clock on left sidebar)
6. Click **+ Add Trigger** (bottom right)
7. Configure:
   - **Choose which function to run:** `onEditHandler`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On edit`
8. Click **Save**
9. **Grant permissions** when prompted (this is normal!)

### Test It

10. Go back to your spreadsheet
11. Change cell **B3** to **"Ready to Generate"**
12. The automation should trigger immediately

---

## How It Works

- Monitors **all sheets** in the spreadsheet
- When cell **B3** is changed to **"Ready to Generate"**:
  1. Changes B3 to "Processing..."
  2. Gathers data from B2, B4, B5, B7
  3. Sends webhook to Make.com
  4. Make.com workflow updates B3 to "Completed" when done

---

## Troubleshooting

### Problem: Trigger Stopped Working (No Executions)

**Symptoms:**
- You change B3 but nothing happens
- No new executions in **Executions** page
- Last execution was weeks/months ago

**Fix:**
1. Go to **Extensions > Apps Script**
2. Click **⏰ Triggers** (clock icon)
3. Click the **three dots (⋮)** next to your trigger
4. Click **"Edit"**
5. Click **"Save"** (you don't need to change anything)
6. Test immediately by changing B3

This refreshes the authorization and reactivates the trigger.

### Problem: Executions Show But Webhook Not Firing

**Symptoms:**
- Executions appear in the log
- But webhook never receives data
- B3 stays as "Ready to Generate"

**Debug:**
1. Click on the latest execution in **Executions** page
2. Check the logs for errors
3. Look for "TRIGGER ACTIVATED" message
4. If you don't see it, the value might not match exactly

**Common causes:**
- Extra spaces in the dropdown value
- B3 is on a different sheet than you think
- Dropdown was recreated with different text

### Problem: Permission Error

**Error message:**
> "Specified permissions are not sufficient to call UrlFetchApp.fetch"

**Fix:**
Make sure you're using **installable trigger**, not simple trigger:
- Function name must be: `onEditHandler`
- Must have a trigger created via the Triggers page
- Cannot rely on `onEdit` function name for external requests

### Check Trigger Health

Run the `checkTriggerHealth()` function to verify your trigger exists:
1. In Apps Script, select `checkTriggerHealth` from function dropdown
2. Click **Run** (▶️)
3. Check **View > Logs**

---

## Why Triggers Can Break

Google Apps Script installable triggers can stop working due to:
- **Authorization expiration** (typically after 6-12 months of use)
- **Permission revocations** (if Google security policies change)
- **Account changes** (password reset, 2FA changes)
- **Script modifications** (sometimes editing code breaks triggers)

**This is normal behavior** - just re-save the trigger when it happens.

---

## Maintenance Schedule

**Monthly Check:**
- Open **Extensions > Apps Script > Executions**
- Verify recent executions exist
- If not, re-save the trigger (see fix above)

**After Making Code Changes:**
- Always test the trigger after editing the script
- Re-save the trigger if it stops working

---

## Quick Reference

| Issue | Solution |
|-------|----------|
| No executions appearing | Re-save the trigger |
| Webhook not receiving data | Check execution logs for errors |
| Permission error | Verify installable trigger exists |
| Wrong sheet triggering | Check sheet name in logs |

---

## Support

If issues persist:
1. Check **Executions** page for error details
2. Run `checkTriggerHealth()` function
3. Run `testTrigger()` to test webhook manually
4. Verify B3 dropdown contains exact text: "Ready to Generate"
