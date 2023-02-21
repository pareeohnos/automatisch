import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  const query = 'query { me { name }}';

  const response = await $.http.post('/', { query });
  const screenName = response.data.data.me.name;

  await $.auth.set({
    screenName,
  });
};

export default verifyCredentials;
