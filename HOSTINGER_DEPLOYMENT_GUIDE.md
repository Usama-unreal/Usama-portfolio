# 🚀 Deploy Your VFX Portfolio to Hostinger

Your portfolio has been converted to work perfectly with Hostinger shared hosting! Follow these steps:

## 📁 Step 1: Build Your Site

The production build has been created in the `client/dist` folder. This contains all the optimized static files.

## 🌐 Step 2: Setup Form Handling (Optional but Recommended)

### Option A: Use Formspree (Recommended - Free)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your Form ID
3. Replace `YOUR_FORM_ID` in the contact form with your actual Formspree Form ID
4. Rebuild the site: `cd client && npm run build`

### Option B: Use Mailto Fallback (Works Immediately)
The contact form will automatically fall back to opening the user's email client with the message pre-filled. No setup required!

## 📤 Step 3: Upload to Hostinger

### Method 1: Using Hostinger File Manager (Easiest)
1. Log into your Hostinger control panel
2. Go to **Website** → **File Manager**
3. Navigate to the `public_html` folder
4. **Delete any existing files** in `public_html` (like default index.html)
5. Upload **ALL contents** from your `client/dist` folder to `public_html`
   
   **Important:** Upload the CONTENTS of the `dist` folder, not the `dist` folder itself!
   
   Your file structure should look like:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── css files
   │   └── js files
   ├── attached_assets/
   ├── .htaccess
   └── other files...
   ```

### Method 2: Using FTP (Alternative)
1. Use an FTP client like FileZilla
2. Connect using your Hostinger FTP credentials (found in your Hostinger control panel):
   - **Host:** Your FTP server address
   - **Username:** Your FTP username  
   - **Password:** Your FTP password
3. Navigate to `public_html` directory
4. Upload all contents from `client/dist` folder

## ✅ Step 4: Test Your Website

Visit your Hostinger domain: **https://lightsalmon-tapir-445610.hostingersite.com**

Your VFX portfolio should load with all the amazing features:
- ✨ Custom cursor with particle trails
- 🧲 Magnetic button effects
- 🎬 Interactive particle background
- 📱 Responsive design
- 🌙 Dark/light mode toggle
- 📝 Working contact form

## 🛠️ Customization Before Upload

### Required: Update Your Contact Information
**IMPORTANT:** Before uploading, you must update these placeholders:

1. **Email Address** - In `client/src/components/ContactForm.tsx`, find and replace:
   ```javascript
   mailto:REPLACE_WITH_YOUR_EMAIL@gmail.com
   ```
   Replace with your actual email address.

2. **Formspree Form ID** (Optional but recommended) - Replace:
   ```javascript
   https://formspree.io/f/YOUR_FORM_ID
   ```
   With your actual Formspree form endpoint.

3. **Social Links** - Update the URLs in the socialLinks array:
   ```javascript
   const socialLinks = [
     { icon: <Linkedin />, label: "LinkedIn", url: "https://linkedin.com/in/YOUR_USERNAME" },
     { icon: <Instagram />, label: "Instagram", url: "https://instagram.com/YOUR_USERNAME" }, 
     { icon: <Youtube />, label: "YouTube", url: "https://youtube.com/@YOUR_CHANNEL" },
   ];
   ```

4. **Rebuild after changes:**
   ```bash
   cd client && npm run build
   ```

## 🔧 Technical Notes

- **No Backend Required:** Your site is now 100% static and works on shared hosting
- **React Router Enabled:** The `.htaccess` file handles client-side routing
- **Optimized:** All assets are minified and optimized for fast loading
- **SEO Friendly:** Includes meta tags and proper structure

## 🚨 Troubleshooting

### Issue: "Page not found" on refresh
**Solution:** Make sure the `.htaccess` file is in your `public_html` folder

### Issue: Contact form not working
**Solution:** 
1. Check if you've set up Formspree correctly
2. The mailto fallback should work immediately as a backup

### Issue: Assets not loading
**Solution:** Ensure you uploaded the `assets` folder and all contents from `dist`

## 🎉 You're Done!

Your professional VFX portfolio is now live on Hostinger with all the unique mouse interactions and cinematic effects intact!