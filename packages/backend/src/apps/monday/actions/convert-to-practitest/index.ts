import defineAction from '../../../../helpers/define-action';
import convert from './convert';

export default defineAction({
  name: 'Convert to practitest',
  key: 'convertToPractitestPayload',
  description: 'Convert webhook content to Practitest payload',
  arguments: [
    {
      label: 'Board',
      key: 'board',
      type: 'dropdown' as const,
      required: true,
      description: 'Which board should we connect to?',
      variables: false,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listBoards',
          },
        ],
      },
    },
    {
      label: 'Status column',
      key: 'statusColumn',
      type: 'dropdown' as const,
      required: true,
      description: 'Which column is the status column',
      variables: false,
      dependsOn: ['parameters.board'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listColumns',
          },
          {
            name: 'parameters.board',
            value: '{parameters.board}',
          },
        ],
      },
    },
    {
      label: 'Priority column',
      key: 'priorityColumn',
      type: 'dropdown' as const,
      required: true,
      description: 'Which column is the priority column',
      variables: false,
      dependsOn: ['parameters.board'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listColumns',
          },
          {
            name: 'parameters.board',
            value: '{parameters.board}',
          },
        ],
      },
    },
    {
      label: 'Description column',
      key: 'descriptionColumn',
      type: 'dropdown' as const,
      required: true,
      description: 'Which column is the priority column',
      variables: false,
      dependsOn: ['parameters.board'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listColumns',
          },
          {
            name: 'parameters.board',
            value: '{parameters.board}',
          },
        ],
      },
    },
    {
      label: 'Assignees column',
      key: 'assigneesColumn',
      type: 'dropdown' as const,
      required: true,
      description: 'Which column is the assignees column',
      variables: false,
      dependsOn: ['parameters.board'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listColumns',
          },
          {
            name: 'parameters.board',
            value: '{parameters.board}',
          },
        ],
      },
    },
    {
      label: 'Practitest ID column',
      key: 'practitestId',
      type: 'dropdown' as const,
      required: true,
      description: 'Which column is the practitest column',
      variables: false,
      dependsOn: ['parameters.board'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listColumns',
          },
          {
            name: 'parameters.board',
            value: '{parameters.board}',
          },
        ],
      },
    },
    {
      label: 'ID',
      key: 'id',
      type: 'string' as const,
      description: 'The monday.com ID',
      required: true,
      variables: true,
    },
  ],

  async run($) {
    let practitestPayload = await convert($, $.step.parameters);

    $.setActionItem({
      raw: practitestPayload,
    });
  },
});
