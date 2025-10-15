# IqraPay Quick Start Guide

## 🎯 What's New

### ✅ Completed Features

1. **9 Ambassadors Carousel** - Automatic sliding showcase on Ambassadors page
2. **Secure Admin Portal** - Hidden from public view with protected credentials
3. **Working Blog System** - Posts created in admin now show on public blog
4. **Production-Ready Security** - No demo credentials displayed

## 🔐 Admin Portal Access

### Desktop: Keyboard Shortcut
Press **`Ctrl + Shift + A`** (or **`Cmd + Shift + A`** on Mac) from anywhere on the website.

### Mobile: Logo Tap Gesture
Quickly tap the **IqraPay logo** in the top-left corner **3 times** (within 5 seconds) to access admin.

### Credentials
```
Email: admin@iqrapay.com
Password: iqrapay2025
```

**⚠️ IMPORTANT:** Keep these credentials private. The site is going live soon!

## 📝 Blog Management

### How It Works Now
- **Create posts** in Admin Panel → They **immediately appear** on the public blog
- **Draft posts** are hidden from public view
- **Published posts** show on `/blog` page instantly
- Posts persist during the session (refresh will reset to defaults)

### Creating a Post

1. Access admin portal (`Ctrl + Shift + A`)
2. Login with credentials
3. Click **"New Post"** or navigate to **New Post** in sidebar
4. Fill in all required fields:
   - Title (required)
   - Category (required)
   - Excerpt (required, 150-200 chars recommended)
   - Featured Image URL (optional, defaults to placeholder)
   - Content (required, supports markdown)
   - Read Time (optional, defaults to "5 min read")
5. Choose:
   - **Save Draft** - Saves but doesn't publish
   - **Publish** - Makes post live immediately

### Markdown Support
```markdown
# Main Heading
## Subheading
**Bold text**
> Blockquote
- List item
1. Numbered item
```

## 🎨 Ambassador Carousel

Located on the **Ambassadors** page, featuring:
- **9 ambassadors** from around the world
- Auto-advances every 5 seconds
- Responsive (3 cards desktop, 2 tablet, 1 mobile)
- Manual navigation with arrows
- Shows: Name, Location, Title, Referrals, Join Date

### Adding More Ambassadors
Edit `/data/mockAmbassadors.ts` and add new ambassador objects.

## 🚀 Before Going Live

### Security Checklist
- [ ] All admin credentials are secure
- [ ] No demo information is visible
- [ ] Staff Portal links are removed from public view
- [ ] Admin access only via keyboard shortcut

### Recommended: Supabase Integration
For production, integrate Supabase to:
- **Persist blog posts** to database
- **Secure authentication** with real backend
- **Image uploads** for blog featured images
- **User management** and roles

## 📚 Admin Features

### Dashboard
- Overview statistics
- Recent posts preview
- Quick action buttons

### All Posts
- View all blog posts
- Search and filter
- Edit or delete posts
- See status (draft/published)

### New Post / Edit
- Rich content editor
- Live preview mode
- Markdown formatting
- Image URL support
- Auto-slug generation

### Settings
- Profile management
- Notification preferences
- Password change
- Site configuration

## 🔗 Important Links

- **Public Blog**: Click "Blog" in navigation
- **Admin Portal**: Press `Ctrl + Shift + A`
- **Ambassadors**: Click "Ambassadors" in navigation

## 💡 Tips

1. **Always preview** posts before publishing
2. **Use descriptive titles** for better SEO
3. **Add images** to make posts more engaging
4. **Write compelling excerpts** to attract readers
5. **Categories help** users find relevant content

## 🆘 Support

For technical assistance:
- Email: admin@iqrapay.com
- WhatsApp: [Join Community](https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8)

---

**May Allah bless this project and make it a means of spreading beneficial knowledge!** ☪️

*IqraPay - Learn the Deen. Earn for the Dunyā.*
