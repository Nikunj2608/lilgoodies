# Digital Care Package 📦💕

A beautiful web app for creating and sending digital care packages 
filled with notes, photos, songs, voice memos, drawings, and more!

## 🚀 Quick Setup (VS Code)

### Prerequisites
- VS Code installed
- "Live Server" extension (by Ritwick Dey) installed in VS Code

### Step-by-Step Setup

1. **Download & Extract**
   - Download the zip file
   - Extract it to a folder on your computer

2. **Open in VS Code**
   - Open VS Code
   - Go to `File > Open Folder`
   - Select the `digital-care-package` folder

3. **Install Live Server Extension** (if not already installed)
   - Click the Extensions icon in VS Code sidebar (or press `Ctrl+Shift+X`)
   - Search for "Live Server"
   - Click "Install" on "Live Server" by Ritwick Dey

4. **Run the Project**
   - Right-click on `index.html` in the VS Code file explorer
   - Select **"Open with Live Server"**
   - Your browser will open automatically at `http://127.0.0.1:5500/index.html`

### Alternative: Open Directly
- Simply double-click `index.html` in your file explorer
- Note: Some features (like voice recording) require a server

## 📦 Payment flow and package links

- The app creates a personal digital package by capturing the recipient name, sender name, and all selected goodies.
- Once checkout completes, it generates a unique package ID and stores the full package payload in Supabase.
- The preview link is then built as a recipient-specific URL such as `preview.html?id=friend-someone-abc123`.
- The preview page reads that exact ID and renders that individual package only.
- A UPI QR code is generated from a standard `upi://pay?...` request so users can scan and pay quickly on mobile.

## 🚀 Free deployment options

### Option 1: Cloudflare Pages (best for static websites)
1. Push the project to GitHub.
2. Create a new project in Cloudflare Pages.
3. Connect the repo and deploy from the root folder.
4. Set the build command to blank and publish directory to `.`.
5. This is free, fast, and ideal for a static HTML/CSS/JS app.

### Option 2: Netlify
1. Push the repo to GitHub.
2. Import the repo into Netlify.
3. Deploy with a blank build command and publish directory `.`.
4. Netlify gives free SSL and a CDN.

### Option 3: GitHub Pages
1. Push to GitHub.
2. Enable GitHub Pages in repository settings.
3. Use the root branch or a `docs` folder.
4. Good for simple portfolio or marketing deployments.

### Recommended production setup
- Razorpay is disabled for now. Enter `LOVE$100` in the free coupon field to create a package at ₹0.
- Run the latest `supabase-schema.sql` in Supabase SQL Editor so the public insert policy is enabled.
- Use Cloudflare Pages or Netlify for speed and reliability.
- Keep all static files in one folder.
- For real money collection, integrate a proper backend with Stripe or Razorpay and store package data securely in a database.
- Use HTTPS only; this is required for payment, media access, and QR flows.

## 📁 Project Structure

## Vercel production setup

The project includes lightweight Vercel serverless functions in `api/` for package storage, coupon validation, and Razorpay payment verification.

1. Create a Supabase project and run `supabase-schema.sql` in the SQL Editor.
2. Create Razorpay API keys in test mode first.
3. Import this repository into Vercel with the root directory as `.` and no build command.
4. Add these Vercel environment variables:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-key
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-server-only-secret
FREE_COUPON_CODES=FIRSTPACKAGE,FRIENDPASS
```

`LOVE$100` is always available; `FREE_COUPON_CODES` adds more free codes. Prefer `SUPABASE_SERVICE_ROLE_KEY` in production. Never expose it or `RAZORPAY_KEY_SECRET` in HTML or browser JavaScript. After deployment, packages are available at `preview.html?id=<package-id>` and can be opened from any device.