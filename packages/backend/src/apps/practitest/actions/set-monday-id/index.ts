import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Set Monday ID',
  key: 'setMondayID',
  description: 'Set monday ID',
  arguments: [
    {
      label: 'Project',
      key: 'project',
      type: 'string' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Custom field',
      key: 'customField',
      type: 'dropdown' as const,
      required: true,
      description: 'Which custom field contains the monday ID?',
      variables: false,
      dependsOn: ['parameters.project'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listCustomFields',
          },
          // {
          //   name: 'parameters.project',
          //   value: '{parameters.project}',
          // },
        ],
      },
    },
    {
      label: 'Issue ID',
      key: 'issueId',
      type: 'dropdown' as const,
      required: true,
      variables: true,
    },
    {
      label: 'Monday ID',
      key: 'mondayId',
      type: 'dropdown' as const,
      required: true,
      variables: true,
    },
  ],

  async run($) {
    const project = $.step.parameters.project;
    const issueID = $.step.parameters.issueId;
    const payload = {
      data: {
        type: 'issue',
        attributes: {
          'custom-fields': {
            [<string>$.step.parameters.customField]: $.step.parameters.mondayId,
          },
        },
      },
    };

    const response = await $.http.put(
      `/projects/${project}/issues/${issueID}`,
      payload
    );

    $.setActionItem({
      raw: response.data,
    });
  },
});
