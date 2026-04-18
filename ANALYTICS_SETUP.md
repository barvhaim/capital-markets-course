# Google Analytics Setup Guide

This guide will help you set up Google Analytics (GA4) to track visitors on your Capital Markets Course website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** (gear icon)
4. Click **"Create Account"**
5. Enter an account name (e.g., "Capital Markets Course")
6. Configure data sharing settings (optional)
7. Click **"Next"**

## Step 2: Create a Property

1. Enter a property name (e.g., "Capital Markets Course Website")
2. Select your reporting time zone: **Asia/Jerusalem (GMT+03:00)**
3. Select currency: **ILS (₪)**
4. Click **"Next"**

## Step 3: Set Up Data Stream

1. Select platform: **"Web"**
2. Enter your website URL: `https://barvhaim.github.io`
3. Enter stream name: "Capital Markets Course"
4. Click **"Create stream"**

## Step 4: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX` (starts with "G-")
3. **Copy this ID** - you'll need it in the next step

## Step 5: Configure Your Project

### Option A: Using Environment Variable (Recommended for Production)

1. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. **Important**: Never commit `.env` to Git (it's already in `.gitignore`)

### Option B: Direct Configuration (For Testing)

Edit `src/App.jsx` and replace the placeholder:
```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your actual ID
```

## Step 6: Deploy Your Changes

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "feat: configure Google Analytics tracking"
   git push
   ```

2. GitHub Actions will automatically deploy your site with analytics enabled

## Step 7: Verify Analytics is Working

1. Visit your live site: `https://barvhaim.github.io/capital-markets-course/`
2. Go back to Google Analytics
3. Click on **"Reports"** → **"Realtime"**
4. You should see yourself as an active user within 30 seconds

## What Data Will You See?

Once set up, Google Analytics will track:

### Real-time Data
- Active users right now
- Pages being viewed
- Traffic sources
- Geographic location

### Audience Insights
- Total visitors (users)
- New vs. returning visitors
- Session duration
- Bounce rate
- Demographics (age, gender, interests)
- Technology (devices, browsers, OS)
- Geographic data (countries, cities)

### Behavior Tracking
- Page views per lesson
- Most popular lessons
- User flow through the course
- Time spent on each lesson
- Completion rates

### Acquisition Data
- How users found your site (direct, search, social, referral)
- Which marketing channels work best
- Campaign performance

## Accessing Your Analytics Dashboard

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property: "Capital Markets Course Website"
3. Explore the reports:
   - **Home**: Overview dashboard
   - **Reports**: Detailed analytics
   - **Explore**: Custom analysis
   - **Advertising**: Marketing insights

## Privacy Considerations

The implementation includes:
- ✅ Respects user privacy
- ✅ No personal data collection without consent
- ✅ Compliant with GDPR guidelines
- ✅ Anonymous IP tracking
- ✅ Cookie consent (consider adding a banner)

### Optional: Add Cookie Consent Banner

For full GDPR compliance, consider adding a cookie consent banner. Popular options:
- [CookieYes](https://www.cookieyes.com/)
- [Osano](https://www.osano.com/)
- [Cookiebot](https://www.cookiebot.com/)

## Troubleshooting

### Analytics Not Showing Data

1. **Check Measurement ID**: Ensure it's correct in `.env` or `App.jsx`
2. **Wait 24-48 hours**: Initial data may take time to appear
3. **Check Real-time Reports**: Should show data within 30 seconds
4. **Verify Deployment**: Ensure the latest code is deployed
5. **Check Browser Console**: Look for any JavaScript errors
6. **Ad Blockers**: Some ad blockers prevent analytics tracking

### Common Issues

**Issue**: "G-XXXXXXXXXX" still showing
- **Solution**: Replace with your actual Measurement ID

**Issue**: No data in reports
- **Solution**: Check Real-time reports first, then wait 24 hours

**Issue**: Analytics not loading
- **Solution**: Check browser console for errors, verify Measurement ID

## Additional Resources

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Best Practices](https://support.google.com/analytics/topic/9303319)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google Analytics documentation
3. Open an issue in the GitHub repository

---

**Happy Tracking! 📊**
