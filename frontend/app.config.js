// app.config.js
export default () => ({
    expo: {
      name: 'YourAppName',
      slug: 'your-app-name',
      version: '1.0.0',
      extra: {
        fatsecretClientId: process.env.FATSECRET_CLIENT_ID,
        fatsecretClientSecret: process.env.FATSECRET_CLIENT_SECRET,
      },
    },
  });
  