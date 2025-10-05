// Configuration for Replit Auth and other settings
export const config = {
  // Replit Auth configuration
  replitAuth: {
    // These will be automatically set by Replit when running in their environment
    authUrl: process.env.REPLIT_AUTH_URL || 'http://localhost:3001',
    // Fallback environment variables for development
    userId: process.env.REPLIT_USER_ID,
    userEmail: process.env.REPLIT_USER_EMAIL,
    userFirstName: process.env.REPLIT_USER_FIRST_NAME,
    userLastName: process.env.REPLIT_USER_LAST_NAME,
    userProfileImageUrl: process.env.REPLIT_USER_PROFILE_IMAGE_URL,
  },
  
  // App configuration
  app: {
    name: 'CheckingIn',
    description: 'AI Wellness Coach',
  }
};


