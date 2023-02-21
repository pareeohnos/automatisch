import { IGlobalVariable, IJSONObject } from '@automatisch/types';

export default {
  name: 'List boards',
  key: 'listColumns',

  async run($: IGlobalVariable) {
    const board = $.step.parameters.board;
    const query = `
      query {
        boards(ids: ${board}) {
          columns {
            id
            title
          }
        }
      }`;

    const response = await $.http.post('/', { query });
    const columns = response.data.data.boards[0].columns.map(
      (column: IJSONObject) =>
        ({
          value: column.id,
          name: column.title,
        } as IJSONObject)
    );

    return {
      data: columns,
    };
  },
};
