import Configuration from '@/config/configuration';

export const addAuthHeaders = (headers) => {
  // Add headers only if the request is from the localhost
  const isLocalhost = headers.host === `localhost:${Configuration().port}`;
  if (isLocalhost) {
    const { authorization, apikey } = headers;
    return {
      authorization,
      apikey,
    };
    // if not this values are passed internally
  } else return {};
};
