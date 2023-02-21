import { TBeforeRequest } from '@automatisch/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.apiToken) {
    const authorizationHeader = `${$.auth.data.apiToken}`;
    requestConfig.headers.PTToken = authorizationHeader;
  }

  return requestConfig;
};

export default addAuthHeader;
