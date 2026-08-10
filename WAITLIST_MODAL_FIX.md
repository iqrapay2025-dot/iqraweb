# Waitlist Modal Desktop Width Fix

## Problem
The waitlist modal was appearing at 100% width on desktop screens, touching both the left and right viewport edges.

## Solution
Updated `src/styles/globals.css` to add a responsive CSS rule that:

### Mobile (< 640px)
- Uses the base DialogContent styling: `max-width: calc(100% - 2rem)`
- Leaves 1rem padding on each side

### Desktop (≥ 640px)
- **max-width: 640px** - Fixed fitting width instead of full viewport
- **margin-left: auto** - Pushes modal away from left edge
- **margin-right: auto** - Pushes modal away from right edge
- **!important flag** - Overrides the generic `sm:max-w-lg` from DialogContent

## Compiled CSS
```css
@media(min-width:640px){
  .waitlist-modal{
    max-width:640px!important;
    margin-left:auto!important;
    margin-right:auto!important
  }
}
```

## Result
✅ Modal is now a fitting 640px card on desktop  
✅ Automatically centered with auto margins  
✅ Never touches viewport edges  
✅ Maintains mobile responsiveness  
✅ Build successful (dist/assets/index-D2uZqT8J.css)

## Files Modified
- `src/styles/globals.css` - Added responsive waitlist-modal CSS rule
- `src/components/WaitlistModal.tsx` - Already had `waitlist-modal` class on DialogContent
