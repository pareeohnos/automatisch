import { IGlobalVariable, IJSONObject } from '@automatisch/types';

export default {
  name: 'List groups',
  key: 'listGroups',

  async run($: IGlobalVariable) {
    const board = $.step.parameters.board;
    const query = `
      query {
        boards(ids: ${board}) {
          groups {
            id
            title
          }
        }
      }`;

    const response = await $.http.post('/', { query });
    const groups = response.data.data.boards[0].groups.map(
      (group: IJSONObject) =>
        ({
          value: group.id,
          name: group.title,
        } as IJSONObject)
    );

    return {
      data: groups,
    };
  },
};
