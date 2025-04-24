# Setting Up Environment Variables in Netlify

This guide explains how to set up your EmailJS environment variables in Netlify for both GitHub-connected deployments and drag-and-drop deployments.

## For GitHub-Connected Deployments

1. Log in to your Netlify account and navigate to your site dashboard
2. Click on **Site settings** > **Environment variables**
3. Add each environment variable separately:
   - Key: `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Value: `your_service_id`
   - Key: `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Value: `your_template_id`
   - Key: `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Value: `your_public_key`
4. Save your changes
5. Trigger a new deployment for the changes to take effect

## For Drag-and-Drop Deployments

### Option 1: Configure before building the deployment package

1. Create a `.env` file in your project root with the following content:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
2. Replace the values with your actual EmailJS credentials
3. Run `npm run build-for-deploy` to create your deployment package
4. The script will automatically include your environment variables in the package

### Option 2: Configure directly in Netlify

After deploying your site via drag-and-drop:

1. Navigate to your Netlify site dashboard
2. Go to **Site settings** > **Environment variables**
3. Add each environment variable separately:
   - Key: `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Value: `your_service_id`
   - Key: `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Value: `your_template_id`
   - Key: `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Value: `your_public_key`
4. Save your changes
5. Go to **Deploys** and trigger a new deployment for the changes to take effect

## Important Notes

- Environment variables with the `NEXT_PUBLIC_` prefix are exposed to the browser
- For drag-and-drop deployments, Option 1 is preferred as it ensures the variables are included in the build
- If using Option 2, you'll need to rebuild your site in Netlify after adding the variables 