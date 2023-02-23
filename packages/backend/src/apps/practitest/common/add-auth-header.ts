import { TBeforeRequest } from '@automatisch/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.apiToken) {
    const authorizationHeader = `${$.auth.data.apiToken}`;
    requestConfig.headers.PTToken = authorizationHeader;
  }

  requestConfig.headers['Content-Type'] = 'application/json; charset=utf-8';

  return requestConfig;
};

export default addAuthHeader;
