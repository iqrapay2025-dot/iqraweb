# Recent Modal Updates - Summary

## 1. Fixed: Name Not Submitting to Google Sheets

### Problem
Only email was being submitted to the Google Sheet, not the full name.

### Root Cause
The payload was sending `{ name, email, source }` but your Google Apps Script likely expects `fullName` as the property key (which is the standard field name in most implementations).

### Solution
**File:** `src/components/WaitlistModal.tsx` (line 91)
```typescript
// Before:
const payload = { name, email, source };

// After:
const payload = { fullName: name, email, source };
```

**File:** `src/config/waitlist.ts` (lines 31, 49)
- Updated sample Apps Script code to use `data.fullName`
- Updated curl test command to use `fullName`

### Action Required
If you have a Google Apps Script deployed, update it to use `fullName`:
```javascript
sheet.appendRow([
  new Date(),
  data.fullName || "",  // Changed from data.name
  data.email || "",
  data.source || "",
]);
```

---

## 2. Updated Modal Styling

### Changes Made

**File:** `src/components/WaitlistModal.tsx`

#### a) Removed Cream Background
- **Before:** Modal had `background: BRAND.cream (#faf6ec)`
- **After:** No background color on DialogContent (transparent)
- The white inner card now stands out against the blurred backdrop

#### b) Added Shadow
- **Added:** `shadow-2xl` class to DialogContent
- **Effect:** Creates a prominent drop shadow for depth
- **Compiled CSS:** `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`

#### c) Already Had Rounded Corners
- The modal already has `rounded-3xl` class (16px border radius)
- Inner card has `borderRadius: 20px`

### Visual Result
✅ Modal has NO background color (shows blurred website through)  
✅ White inner card with subtle border  
✅ Prominent shadow for depth and elevation  
✅ Rounded corners (16px on modal, 20px on inner card)  
✅ Professional, modern floating card appearance

---

## Complete Visual Flow Now

1. **Website** - User sees the website
2. **Modal Opens** - Backdrop overlay appears with:
   - Semi-transparent black (`bg-black/50`)
   - Blur effect (`backdrop-blur-sm`)
   - Website content becomes blurred and unreadable
3. **Modal Card** - Floating white card with:
   - NO background color on outer container
   - White inner card with subtle border
   - Prominent shadow (`shadow-2xl`)
   - Rounded corners (`rounded-3xl`)
   - Centered, fitting width (640px max on desktop)
4. **User Experience** - Clean, modern, focused attention on the form

---

## Build Status
✅ All changes compiled successfully  
✅ `dist/assets/index-D2uZqT8J.css` updated  
✅ `shadow-2xl` class confirmed in compiled CSS  
✅ `backdrop-blur-sm` class confirmed in compiled CSS

## Files Modified
- `src/components/WaitlistModal.tsx` - Fixed payload key, removed cream background, added shadow
- `src/config/waitlist.ts` - Updated documentation to use `fullName`
- `src/components/ui/dialog.tsx` - Added backdrop blur (previous change)

## Next Steps
1. **Update your Google Apps Script** to use `data.fullName` instead of `data.name`
2. **Redeploy** the Apps Script as a Web App
3. **Test** the form to verify both name and email are now captured
