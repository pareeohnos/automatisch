import { IGlobalVariable, IJSONObject } from '@automatisch/types';

export default {
  name: 'List boards',
  key: 'listBoards',

  async run($: IGlobalVariable) {
    const query = `
      query {
        boards(limit:1000) {
          id
          name
        }
      }`;

    const response = await $.http.post('/', { query });

    const allBoards = response.data.data.boards.map(
      (board: IJSONObject) =>
        ({
          value: board.id,
          name: board.name,
        } as IJSONObject)
    );

    return {
      data: allBoards,
    };
  },
};
