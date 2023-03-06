import { IJSONObject } from '@automatisch/types';
import defineAction from '../../../../helpers/define-action';

interface IPractitestUser extends IJSONObject {
  id: string;
  type: string;
  attributes: {
    'first-name': string;
    'last-name': string;
    'display-name': string;
    email: string;
    'time-zone': string;
    'created-at': string;
  };
}

export default defineAction({
  name: 'Create issue',
  key: 'createIssue',
  description: 'Create a new issue',
  arguments: [
    {
      label: 'Project',
      key: 'project',
      type: 'dropdown' as const,
      required: true,
      description: 'Which project should issues be created in?',
      variables: false,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listProjects',
          },
        ],
      },
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
          {
            name: 'parameters.project',
            value: '{parameters.project}',
          },
        ],
      },
    },
    {
      label: 'Name',
      key: 'name',
      type: 'string' as const,
      required: true,
      description: 'What is the name of the issue',
      variables: true,
    },
    {
      label: 'Status',
      key: 'status',
      type: 'string' as const,
      required: false,
      description: 'The status of the issue',
      variables: true,
    },
    {
      label: 'Description',
      key: 'description',
      type: 'string' as const,
      required: false,
      description: 'The description of the issue',
      variables: true,
    },
    {
      label: 'Priority',
      key: 'priority',
      type: 'string' as const,
      required: false,
      description: 'The priority of the issue',
      variables: true,
    },
    {
      label: 'Owner',
      key: 'owner',
      type: 'string' as const,
      required: false,
      description: 'The owner email address',
      variables: true,
    },
    {
      label: 'Creator',
      key: 'creator',
      type: 'string' as const,
      required: false,
      description: 'The creator email address',
      variables: true,
    },
    {
      label: 'Monday ID',
      key: 'mondayId',
      type: 'string' as const,
      required: false,
      description: 'The ID of the story on monday',
      variables: true,
    },
  ],

  async run($) {
    const project = $.step.parameters.project;
    const { owner, creator } = $.step.parameters;
    const attributes: IJSONObject = {
      title: $.step.parameters.name,
      priority: $.step.parameters.priority,
      'custom-fields': {
        [<string>$.step.parameters.customField]: $.step.parameters.mondayId,
      },
    };

    if (owner || creator) {
      const apiUsers = await $.http.get(`/users.json`);
      const userMapping = apiUsers.data.data.reduce(
        (userMap: IJSONObject, user: IPractitestUser) => {
          userMap[user.id] = user.attributes.email;
          return userMap;
        },
        {}
      );

      if (creator) {
        attributes['author-id'] = userMapping[<string>creator];
      }

      if (owner) {
        attributes['assigned-to-id'] = userMapping[<string>owner];
        attributes['assigned-to-type'] = 'user';
      }
    }

    const response = await $.http.post(`/projects/${project}/issues.json`, {
      data: {
        type: 'issues',
        attributes,
      },
    });

    $.setActionItem({
      raw: response.data,
    });
  },
});
