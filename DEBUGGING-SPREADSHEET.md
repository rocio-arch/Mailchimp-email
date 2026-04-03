## Debugging Spreadsheet Automation

### Common Issues & Solutions

#### Issue 1: Trigger Has Expired or Stopped Working

**Symptoms:**
- You change B3 to "Ready to Generate" but nothing happens
- B3 doesn't change to "Processing..."
- No newsletter is generated

**How to Check:**
1. Go to **Extensions > Apps Script**
2. Click **Executions** (▶️ play icon on left sidebar)
3. Look at the "Last run" date - if it's more than a few days old when you know edits were made, the trigger has stopped

**How to Fix:**
1. Go to **Extensions > Apps Script**
2. Click **⏰ Triggers** (clock icon on left sidebar)
3. Find the trigger for `onEditHandler`
4. Click the **three dots (⋮)** next to it
5. Click **"Edit"**
6. Click **"Save"** (even if you didn't change anything)
7. Test immediately by changing B3 to "Ready to Generate"

**Note:** Triggers typically expire every 6-12 months. This is normal Google behavior and requires this quick refresh.

---

#### Issue 2: Cell Value Doesn't Match Exactly

**Symptoms:**
- Executions appear in the log (trigger is running)
- But webhook doesn't fire
- B3 stays as "Ready to Generate" instead of changing to "Processing..."

**Common Causes:**
- Extra spaces before or after the text
- Typing instead of selecting from dropdown
- Dropdown was modified with slightly different text

**How to Fix:**
1. **Always use the dropdown** - don't type manually
2. If issue persists, recreate the dropdown in B3:
   - Select cell B3
   - Go to **Data > Data validation**
   - Ensure the list includes exactly: `Ready to Generate` (no extra spaces)
3. Verify the exact text in `newsletter-automation-final.gs` matches your dropdown

---

#### Issue 3: Wrong Sheet or Cell

**Symptoms:**
- Other sheets work but one specific sheet doesn't trigger

**How to Check:**
1. Verify you're editing cell **B3** (not B2, B4, etc.)
2. Check that B2, B4, B5, and B7 contain valid data:
   - B2: Category name
   - B4: Number of native ads
   - B5: Newsletter size (Small/Medium/Big/Extra big)
   - B7: Template ID

**How to Fix:**
- Ensure the sheet structure matches the template
- Copy structure from a working sheet if needed

---

#### Issue 4: Permission/Authorization Error

**Symptoms:**
- Error message mentioning "permissions" or "authorization" in execution logs

**How to Fix:**
1. Go to **Extensions > Apps Script > Triggers**
2. Delete the existing trigger
3. Create a new trigger:
   - Function: `onEditHandler`
   - Event source: `From spreadsheet`
   - Event type: `On edit`
4. Click **Save** and **grant permissions** when prompted
5. Test the automation

---

#### Issue 5: Multiple People Created Triggers (Duplicate Webhooks)

**Symptoms:**
- Newsletter generates twice
- Webhook receives duplicate calls
- Make.com workflow runs multiple times for one B3 change

**How to Check:**
Each person can only see their own triggers, so coordinate with your team.

**How to Fix:**
1. **Decide who should own the trigger** (ideally the spreadsheet owner)
2. **Everyone else deletes their triggers:**
   - Go to Extensions > Apps Script > Triggers
   - Delete any triggers you created
3. **Only one person keeps their trigger active**
4. Document who owns the trigger in your team wiki/docs

---

### Quick Health Check

Run this monthly to verify everything is working:

1. **Check last execution date:**
   - Extensions > Apps Script > Executions
   - Verify executions appear on days you used it

2. **Test the automation:**
   - Go to any newsletter sheet
   - Change B3 to "Ready to Generate"
   - Verify B3 changes to "Processing..." within 2-3 seconds
   - Check that Make.com workflow receives the webhook

3. **Run health check function (optional):**
   - Extensions > Apps Script
   - Select function: `checkTriggerHealth`
   - Click Run (▶️)
   - Check logs (View > Logs)

---

### Who Can Fix Triggers?

**Important:** Only the person who created the trigger can see and fix it.

- ✅ If **you** created the trigger → You can fix it
- ❌ If **someone else** created it → They must fix it (you can't see their trigger)

**Best Practice:** Have the **spreadsheet owner** create and maintain the trigger. Other editors should not create duplicate triggers.

---

### Getting Help

If the automation still doesn't work after trying these fixes:

1. Check the **execution logs** for error messages:
   - Extensions > Apps Script > Executions
   - Click on the failed execution
   - Read the error message

2. Run the manual test function:
   - Extensions > Apps Script
   - Select function: `testTrigger`
   - Click Run (▶️)
   - Check if webhook reaches Make.com

3. Contact the automation maintainer with:
   - Screenshot of the execution logs
   - Which sheet you're testing on
   - What error message you see
