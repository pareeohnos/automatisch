import defineAction from '../../../../helpers/define-action';
import getColumnValues from '../../common/column-values';
import arguments from '../arguments';

export default defineAction({
  name: 'Create a new item',
  key: 'createItem',
  description: 'Create a new item',
  arguments: arguments,

  async run($) {
    const board = $.step.parameters.board;
    const group = $.step.parameters.group;

    const columnValues = await getColumnValues($, $.step.parameters);
    const columnValuesJson = JSON.stringify(JSON.stringify(columnValues));
    const query = `mutation { create_item (board_id: ${board}, item_name: \"${$.step.parameters.name}\", group_id: \"${group}\", column_values: ${columnValuesJson}) { id }}`;

    const response = await $.http.post('/', { query });
    console.log(response.data);
    $.setActionItem({
      raw: response.data.data.create_item,
    });
  },
});
