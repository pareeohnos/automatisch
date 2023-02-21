import verifyCredentials from './verify-credentials';
import isStillVerified from './is-still-verified';

export default {
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'Monday.com API key of your account',
      docUrl: '',
      clickToCopy: false,
    },
  ],

  verifyCredentials,
  isStillVerified,
};
