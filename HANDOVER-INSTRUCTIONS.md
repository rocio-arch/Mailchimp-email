# Handover Checklist: Newsletter Automation

## For You (Current Trigger Owner)

### Step 1: Delete Your Trigger
**Important:** Only ONE person should have an active trigger to avoid duplicate newsletters.

1. Open the Google Sheet
2. Go to **Extensions > Apps Script**
3. Click **⏰ Triggers** (clock icon on left)
4. Find your trigger for `onEditHandler`
5. Click the **three dots (⋮)** → **Delete**
6. Confirm deletion

### Step 2: Share Documentation
Share these files with the new owner:

- **DEBUGGING-SPREADSHEET.md** - User-friendly troubleshooting guide
- **APPS-SCRIPT-SETUP.md** - Technical setup instructions
- **newsletter-automation-final.gs** - The script code (already in Apps Script)

### Step 3: Brief the New Owner
Tell them:
- "The script is already in Extensions > Apps Script"
- "You just need to create the trigger (takes 2 minutes)"
- "Follow the setup instructions in APPS-SCRIPT-SETUP.md"
- "The trigger expires every 6-12 months - just edit and re-save it to fix"

---

## For the New Owner (Sheet Owner)

### Setup Instructions (2 minutes)

1. **Open the Google Sheet**
2. Go to **Extensions > Apps Script**
3. Verify the code is there (should already be)

### Create Your Trigger

4. Click **⏰ Triggers** (clock icon on left sidebar)
5. Click **+ Add Trigger** (bottom right)
6. Configure:
   - **Choose which function to run:** `onEditHandler`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On edit`
7. Click **Save**
8. **Grant permissions** when prompted (this is normal and necessary!)

### Test It Works

9. Go to any newsletter sheet
10. Change cell **B3** to **"Ready to Generate"**
11. Within 2-3 seconds, B3 should change to **"Processing..."**
12. The newsletter should generate normally

✅ **Done!** You now own the automation.

---

## Troubleshooting for New Owner

If the trigger stops working in the future (typically every 6-12 months):

1. Go to **Extensions > Apps Script > Triggers** (⏰)
2. Click the **three dots (⋮)** next to your trigger
3. Click **"Edit"**
4. Click **"Save"** (even if you didn't change anything)
5. Test immediately

**Full troubleshooting guide:** See DEBUGGING-SPREADSHEET.md

---

## Important Notes

### One Owner Only
- Only the **sheet owner** should have an active trigger
- Multiple triggers = duplicate newsletters
- Editors cannot see or manage the owner's trigger

### Regular Maintenance
- Check trigger health monthly (optional)
- When it stops working, just edit + save the trigger
- Takes 30 seconds to fix

### Getting Help
If issues persist after troubleshooting:
1. Check execution logs: Extensions > Apps Script > Executions
2. Look for error messages
3. Reference DEBUGGING-SPREADSHEET.md
4. Run `testTrigger()` function to test webhook manually

---

## Questions?

**"Why does the trigger expire?"**
Normal Google Apps Script behavior. Triggers need periodic re-authorization.

**"Can I prevent it from expiring?"**
No - it's Google's security policy. But fixing it takes 30 seconds.

**"What if I'm on vacation when it breaks?"**
Give another editor temporary access to create their own trigger (delete yours first).

**"How do I know if it's working?"**
Test it once after setup. Then if B3 changes to "Processing..." when you use it, it's working.
