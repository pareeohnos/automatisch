export default [
  {
    label: 'Board',
    key: 'board',
    type: 'dropdown' as const,
    required: true,
    description: 'Which board should the item be created on',
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
    label: 'Group',
    key: 'group',
    type: 'dropdown' as const,
    required: true,
    description: 'Which group should the story be created in',
    variables: false,
    dependsOn: ['parameters.board'],
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listGroups',
        },
        {
          name: 'parameters.board',
          value: '{parameters.board}',
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
    key: 'practitestColumn',
    type: 'dropdown' as const,
    required: true,
    description: 'Which column is the Practitest ID column',
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
    required: true,
    variables: true,
  },
  {
    label: 'Item name',
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
    label: 'Priority',
    key: 'priority',
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
    label: 'Requestor',
    key: 'requestor',
    type: 'string' as const,
    required: true,
    variables: true,
  },
  {
    label: 'Assignee',
    key: 'assignee',
    type: 'string' as const,
    required: true,
    variables: true,
  },
  {
    label: 'Practitest ID',
    key: 'practitestId',
    type: 'string' as const,
    required: true,
    variables: true,
  },
];
