# Authentication Setup Guide

## Overview
This application uses Replit Auth for authentication. The auth system has been configured to work both in Replit's environment and as a fallback for local development.

## Files Modified/Created

### Core Auth Files
- `lib/replitAuth.ts` - Main Replit Auth integration
- `lib/auth.ts` - Auth utilities and middleware
- `lib/config.ts` - Configuration settings
- `components/ReplitAuthProvider.tsx` - React context provider for auth state
- `hooks/useAuth.ts` - Original auth hook (kept for compatibility)

### API Routes
- `app/api/auth/user/route.ts` - Get current user endpoint
- `app/api/login/route.ts` - Login redirect endpoint
- `app/api/logout/route.ts` - Logout redirect endpoint

### Components
- `components/navigation.tsx` - Updated to use Replit Auth
- `app/layout.tsx` - Wrapped with ReplitAuthProvider

### Debug
- `app/debug-auth/page.tsx` - Debug page to test authentication

## How It Works

### In Replit Environment
1. Replit Auth integration is automatically available through the `javascript_log_in_with_replit:1.0.0` integration
2. The `ReplitAuthProvider` detects the Replit environment and uses the global `window.replit.auth` object
3. User authentication state is managed through Replit's built-in auth system

### Fallback for Local Development
1. If not in Replit environment, falls back to API-based authentication
2. Uses environment variables for user data (when available)
3. Provides mock authentication for development

## Configuration

### Environment Variables (Optional)
```bash
REPLIT_AUTH_URL=http://localhost:3001
REPLIT_USER_ID=your_user_id
REPLIT_USER_EMAIL=your_email@example.com
REPLIT_USER_FIRST_NAME=Your
REPLIT_USER_LAST_NAME=Name
REPLIT_USER_PROFILE_IMAGE_URL=https://example.com/avatar.jpg
```

## Testing

1. Visit `/debug-auth` to see authentication status
2. Check browser console for any auth-related errors
3. Test login/logout functionality

## Troubleshooting

### Common Issues
1. **"Not authenticated" errors**: Check if Replit Auth is properly configured in your workspace
2. **Login not working**: Ensure the Replit Auth integration is enabled in your `.replit` file
3. **User data not loading**: Check if the user is properly logged in through Replit

### Debug Steps
1. Open browser dev tools
2. Check if `window.replit.auth` is available
3. Look for any console errors
4. Use the debug page at `/debug-auth` to inspect auth state

## Next Steps

1. Test the authentication flow in your Replit environment
2. Verify that user data is properly stored in the database
3. Test the login/logout functionality
4. Remove the debug page in production


