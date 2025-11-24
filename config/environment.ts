export const config = {
  dev: {
    baseUrl: 'https://www.saucedemo.com/',
    timeout: 10000
  },
  qa: {
    baseUrl: 'https://www.saucedemo.com/',
    timeout: 20000
  },
  prod: {
    baseUrl: 'https://www.saucedemo.com/',
    timeout: 30000
  }
};

export const getEnv = () => {
  const env = process.env.ENV || 'qa';
  return config[env as keyof typeof config];
};
