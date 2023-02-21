import { TBeforeRequest } from '@automatisch/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.apiKey) {
    const authorizationHeader = `${$.auth.data.apiKey}`;
    requestConfig.headers.Authorization = authorizationHeader;
  }

  return requestConfig;
};

export default addAuthHeader;
