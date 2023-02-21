import defineApp from '../../helpers/define-app';
import addAuthHeader from './common/add-auth-header';
import auth from './auth';
import actions from './actions';
import dynamicData from './dynamic-data';

export default defineApp({
  name: 'Practitest',
  key: 'practitest',
  iconUrl: '{BASE_URL}/apps/practitest/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/apps/practitest/connection',
  supportsConnections: true,
  baseUrl: 'https://practitest.com',
  apiBaseUrl: 'https://eu1-prod-api.practitest.app/api/v2',
  primaryColor: '316B7C',
  beforeRequest: [addAuthHeader],
  auth,
  actions,
  dynamicData,
});
