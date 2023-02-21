import verifyCredentials from './verify-credentials';
import isStillVerified from './is-still-verified';

export default {
  fields: [
    {
      key: 'screenName',
      label: 'Screen Name',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description:
        'Screen name of your connection to be used on Automatisch UI.',
      clickToCopy: false,
    },
    {
      key: 'apiToken',
      label: 'API Token',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description:
        'Enter the API token to authenticate with the practitest API',
      clickToCopy: false,
    },
  ],

  verifyCredentials,
  isStillVerified,
};
