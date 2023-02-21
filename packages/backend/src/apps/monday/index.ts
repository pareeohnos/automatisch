import defineApp from '../../helpers/define-app';
import addAuthHeader from './common/add-auth-header';
import auth from './auth';
import actions from './actions';
import dynamicData from './dynamic-data';

export default defineApp({
  name: 'Monday.com',
  key: 'monday',
  iconUrl: '{BASE_URL}/apps/monday/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/apps/practitest/connection',
  supportsConnections: true,
  baseUrl: 'https://monday.com',
  apiBaseUrl: 'https://api.monday.com/v2',
  primaryColor: '316B7C',
  beforeRequest: [addAuthHeader],
  auth,
  dynamicData,
  actions,
});
