# Google OAuth Setup Instructions

## Redirect URI Configuration

To fix the "Error 400: redirect_uri_mismatch" error, you need to add the following redirect URIs to your Google Cloud Console OAuth 2.0 Client ID configuration:

### Required Redirect URIs:

1. **For Local Development:**
   ```
   http://localhost:5000/api/auth/google/callback
   ```

2. **For Replit Development Environment:**
   ```
   https://5b4c48d7-4236-472a-9a09-b580c363f0c4-00-6qcc57zxpi8l.picard.replit.dev/api/auth/google/callback
   ```

3. **For Custom Domain (if configured):**
   ```
   https://gariyangu.replit.app/api/auth/google/callback
   ```

## Steps to Add Redirect URIs:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID (the one with ID: `955395502828-pj4cbgcrkkehsjcsigst2jcn60t9qttm.apps.googleusercontent.com`)
5. Click on it to edit
6. Under "Authorized redirect URIs", add all the URIs listed above
7. Click "Save"

## Important Notes:

- The redirect URI must match EXACTLY what the application uses
- Include both HTTP (for local) and HTTPS (for production) versions
- The Replit domain changes when the Repl is forked or moved, so you may need to update it
- Always include the full path including `/api/auth/google/callback`

## Current Configuration:

- **Client ID:** `955395502828-pj4cbgcrkkehsjcsigst2jcn60t9qttm.apps.googleusercontent.com`
- **Client Secret:** Stored in environment variable `GOOGLE_CLIENT_SECRET`
- **Callback Path:** `/api/auth/google/callback`

## Testing:

After adding the redirect URIs, test the authentication flow:
1. Click any "Sign in with Google" button in the application
2. You should be redirected to Google's login page
3. After authentication, you should be redirected back to the application