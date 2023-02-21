import defineAction from '../../../../helpers/define-action';
import convert from './convert';

export default defineAction({
  name: 'Convert to monday.com',
  key: 'convertToMondayPayload',
  description: 'Convert webhook content to Monday.com payload',
  arguments: [
    {
      label: 'ID',
      key: 'id',
      type: 'string' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Name',
      key: 'name',
      type: 'string' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Description',
      key: 'description',
      type: 'string' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Status',
      key: 'status',
      type: 'string' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Author ID',
      key: 'authorId',
      type: 'string' as const,
      required: false,
      variables: true,
    },
    {
      label: 'Assignee ID',
      key: 'assigneeId',
      type: 'string' as const,
      required: false,
      variables: true,
    },
    {
      label: 'Priority',
      key: 'priority',
      type: 'string' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Monday ID',
      key: 'mondayId',
      type: 'string' as const,
      required: false,
      variables: true,
    },
  ],

  async run($) {
    let mondayPayload = await convert($, $.step.parameters);

    $.setActionItem({
      raw: mondayPayload,
    });
  },
});
