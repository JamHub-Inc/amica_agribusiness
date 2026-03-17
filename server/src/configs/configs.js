import dotenv from 'dotenv';
dotenv.config();

export const config = {
  db: { url: process.env.DATABASE_URL },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '30m',
  },

  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  },

  google: { clientId: process.env.GOOGLE_OAUTH_CLIENT_ID },

  cookies: {
    refreshName: 'refreshToken',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
  },
    email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  admin: {
    email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER 
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  },
  weather: {
    apiKey: process.env.WEATHER_API_KEY
  }
};