import getConfig from 'next/config';

interface PublicConfig {
  apiUrl: string;
}

// eslint-disable-next-line complexity
const getPublicConfig = (): PublicConfig => {
  const env = getConfig().publicRuntimeConfig || {};

  return {
    apiUrl: process.env.API_URL || '',
  };
};

export { getPublicConfig };