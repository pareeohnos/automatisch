import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Create issue',
  key: 'createIssue',
  description: 'Create a new issue',
  arguments: [],

  async run($) {
    $.setActionItem({
      raw: { TEST: 'TEST' },
    });
  },
});
