import { IGlobalVariable, IJSONObject } from '@automatisch/types';
import getUsers from './get-users';

export default async (
  $: IGlobalVariable,
  parameters: IJSONObject
): Promise<IJSONObject> => {
  let payload = {
    item_name: parameters.name,
    [<string>parameters.descriptionColumn]: parameters.description,
    [<string>parameters.statusColumn]: {
      label: parameters.status,
    },
    [<string>parameters.priorityColumn]: {
      label: parameters.priority,
    },
    [<string>parameters.practitestColumn]: parameters.practitestId,
  };

  if (parameters.assignee) {
    const users = await getUsers($);
    const user = users.find((u: IJSONObject) => u.email == parameters.assignee);
    if (user) {
      payload[<string>parameters.assigneesColumn] = {
        personsAndTeams: [
          {
            id: user.id,
            kind: 'person',
          },
        ],
      };
    }
  }

  return payload;
};
