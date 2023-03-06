import defineAction from '../../../../helpers/define-action';
import getColumnValues from '../../common/column-values';
import { actionArguments } from '../arguments';

export default defineAction({
  name: 'Update story',
  key: 'updateStory',
  description: 'Update an existing story',
  arguments: actionArguments,

  async run($) {
    const board = $.step.parameters.board;
    const id = $.step.parameters.id;
    const columnValues = await getColumnValues($, $.step.parameters);
    const columnValuesJson = JSON.stringify(JSON.stringify(columnValues));
    const query = `mutation { change_multiple_column_values (board_id: ${board}, item_id: ${id}, column_values: ${columnValuesJson}) { id }}`;

    const response = await $.http.post('/', { query });

    $.setActionItem({
      raw: response.data.create_item,
    });
  },
});
