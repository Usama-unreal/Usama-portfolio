# 🚀 Render.com پر آپ کی VFX Portfolio Deploy کریں

یہ guide آپ کو step-by-step بتائے گی کہ آپ اپنی VFX portfolio website کو Render.com پر کیسے deploy کریں۔

## 📋 Prerequisites / ضروری چیزیں

- GitHub account
- Render.com account (free)
- آپ کا project GitHub repository میں ہونا چاہیے

## 🔧 Step 1: Repository تیار کریں

### Option A: GitHub Repository بنائیں (اگر ابھی نہیں ہے)

1. GitHub.com پر جائیں اور نیا repository بنائیں
2. Repository name: `vfx-portfolio` (یا کوئی اور نام)
3. Public repository رکھیں (free deployment کے لیے)

### Option B: Code کو GitHub پر push کریں

```bash
git add .
git commit -m "Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 🌐 Step 2: Render.com Account بنائیں

1. **Render.com** پر جائیں: https://render.com
2. **"Get Started for Free"** پر کلک کریں
3. GitHub account سے sign up کریں (یہ آسان ہے)
4. GitHub repositories کو access دیں

## 🚀 Step 3: Static Site بنائیں

1. Render dashboard میں **"New"** button پر کلک کریں
2. **"Static Site"** select کریں
3. آپ کا GitHub repository choose کریں

## ⚙️ Step 4: Build Settings Configure کریں

### Important Settings:

```
Name: vfx-portfolio (یا کوئی unique name)
Branch: main
Root Directory: (خالی چھوڑیں)
Build Command: npm run build
Publish Directory: dist/public
```

### Advanced Settings:
- **Auto Deploy**: Yes (automatic updates کے لیے)
- **Node Version**: 18 یا latest

## 🔄 Step 5: Client-Side Routing Setup

آپ کی website React Router استعمال کرتی ہے، تو یہ setting ضروری ہے:

1. Deploy ہونے کے بعد، آپ کے site کے **Settings** میں جائیں
2. **"Redirects/Rewrites"** tab پر کلک کریں
3. نیا rule add کریں:

```
Source: /*
Destination: /index.html
Action: Rewrite
```

## 📧 Step 6: Contact Form Configuration

آپ کے contact form کے لیے:

### Formspree Setup (Recommended):
1. Formspree.io پر جائیں
2. Free account بنائیں
3. Form ID copy کریں
4. Code میں `YOUR_FORM_ID` replace کریں:

```javascript
// ContactForm.tsx میں
https://formspree.io/f/YOUR_ACTUAL_FORM_ID
```

### Email Configuration:
```javascript
// ContactForm.tsx میں
mailto:REPLACE_WITH_YOUR_EMAIL@gmail.com
```
اپنی actual email address سے replace کریں۔

## 🔄 Step 7: Deploy!

1. **"Create Static Site"** پر کلک کریں
2. Render automatically build شروع کر دے گا
3. 2-5 minutes میں آپ کی site live ہو جائے گی

## 🌍 Step 8: Your Live Website

آپ کی website یہاں available ہوگی:
```
https://YOUR-SITE-NAME.onrender.com
```

## 🔄 Automatic Updates

جب بھی آپ GitHub repository میں changes push کریں گے، Render automatically آپ کی site کو update کر دے گا!

## 🛠️ Troubleshooting

### Build Fail ہو رہا ہے?
1. Build logs check کریں
2. `npm run build` locally test کریں
3. Dependencies properly install ہو رہیں ہیں

### 404 Error پر refresh?
Client-side routing rule add کریں (Step 5)

### Contact Form کام نہیں کر رہا?
1. Formspree setup properly کریں
2. Email address correct ہے check کریں

## 🎯 Performance Features

Render.com آپ کو یہ features free میں دیتا ہے:
- ⚡ Global CDN (fast loading worldwide)
- 🔒 Free SSL certificate (HTTPS)
- 🔄 Automatic deployments
- 📱 Mobile optimization

## 💰 Cost

- **Static sites**: Completely FREE!
- **Bandwidth**: 100GB/month free
- **Build time**: 500 minutes/month free

## 🎉 Done!

آپ کی professional VFX portfolio اب live ہے تمام features کے ساتھ:
- ✨ Custom cursor effects
- 🧲 Magnetic buttons
- 🎬 Interactive animations
- 📱 Responsive design
- 🌙 Dark/light mode

Your website URL: `https://YOUR-SITE-NAME.onrender.com`

## 🔧 Next Steps

1. Custom domain add کر سکتے ہیں (optional)
2. Analytics setup کر سکتے ہیں
3. Social links update کریں
4. Real contact information add کریں

Happy deploying! 🚀