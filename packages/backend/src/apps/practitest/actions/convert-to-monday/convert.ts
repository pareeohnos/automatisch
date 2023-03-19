import { IGlobalVariable, IJSONObject } from '@automatisch/types';

const STATUS_MAPPING: IJSONObject = {
  new: 'Reported',
  'additional info': 'Awaiting Requestor input',
  assigned: 'Assigned',
  fixed: 'Internal QA',
  closed: 'Resolved / completed',
  rejected: 'Rejected appears to work',
  'Rejected invalid requirement': 'Rejected invalid requirement',
  duplicate: 'Duplicate',
  opened: 'Failed retest',
};

const PRIORITY_MAPPING: IJSONObject = {
  '1-showstopper': 'Critical',
  '2-high': 'High',
  '3-normal': 'Medium',
  '4-low': 'Low',
};

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

export default async (
  $: IGlobalVariable,
  payload: IJSONObject
): Promise<IJSONObject> => {
  let converted = {
    id: payload.mondayId,
    name: payload.name,
    description: payload.description,
    practitestId: payload.id,
    status: STATUS_MAPPING[<string>payload.status],
    priority: PRIORITY_MAPPING[<string>payload.priority],
    assignee: null as string,
    author: null as string,
  };

  const { authorId, assigneeId } = $.step.parameters;

  if (authorId || assigneeId) {
    const apiUsers = await $.http.get(`/users.json`);
    const userMapping = apiUsers.data.data.reduce(
      (userMap: IJSONObject, user: IPractitestUser) => {
        userMap[user.id] = user.attributes.email;
        return userMap;
      },
      {}
    );

    if (authorId) {
      converted.author = userMapping[<string>authorId];
    }

    if (assigneeId) {
      converted.assignee = userMapping[<string>assigneeId];
    }
  }

  return converted;
};
