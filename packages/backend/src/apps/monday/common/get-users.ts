import { IGlobalVariable } from '@automatisch/types';

export default async ($: IGlobalVariable) => {
  const query = 'query { users { id email } }';
  const response = await $.http.post('/', { query });

  return response.data.data.users;
};
