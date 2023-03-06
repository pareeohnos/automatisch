import { IGlobalVariable, IJSONArray, IJSONObject } from '@automatisch/types';

const STATUS_MAPPING: { [index: string]: string } = {
  Reported: 'new',
  'Awaiting Requestor input': 'additional info',
  Assigned: 'assigned',
  'Internal QA': 'fixed',
  'Resolved / completed': 'closed',
  'Rejected appears to work': 'rejected',
  'Rejected <get other reason>': 'rejected',
  Duplicate: 'duplicate',
  'Failed retest': 'opened',
};

const PRIORITY_MAPPING: { [index: string]: string } = {
  Critical: '1-showstopper',
  High: '3-high',
  Medium: '3-normal',
  Low: '4-low',
};

interface IMondayUser extends IJSONObject {
  id: string;
  name: string;
  email: string;
}

const decodePeople = async (
  $: IGlobalVariable,
  value: IJSONObject
): Promise<any> => {
  // We can only send one person so only get the first one
  const valueJSON = JSON.parse(<string>value.value);
  const personsAndTeams: IMondayUser[] = <IMondayUser[]>(
    valueJSON.personsAndTeams
  );
  const person = personsAndTeams.find((p: IMondayUser) => p.kind === 'person');
  if (!person) return null;

  let query = `query { users(ids:[${person.id}]) { id name email }}`;
  const response = await $.http.post('/', { query });
  const user = response.data.data.users[0];

  return user.email;
};

const decodeValue = async (
  $: IGlobalVariable,
  value: IJSONObject
): Promise<any> => {
  if (!value) return null;

  if (value.type === 'multiple-person') {
    return await decodePeople($, value);
  }

  return value.text;
};

export default async (
  $: IGlobalVariable,
  payload: IJSONObject
): Promise<IJSONObject> => {
  let converted = {
    id: null as string,
    name: null as string,
    description: null as string,
    mondayId: payload.id,
    status: null as string,
    priority: null as string,
    assignee: null as string,
    creator: null as string,
  };

  let query = `query {
    items (ids: [${payload.id}]) {
      id
      name
      creator {
        id
        email
      }
      column_values {
        id
        value
        type
        text
      }
    }
  }`;

  const response = await $.http.post('/', { query });
  const item = response.data.data.items[0];
  const values = item.column_values.reduce(
    (out: IJSONObject, col: IJSONObject) => {
      out[<string>col.id] = col;
      return out;
    },
    {}
  );
  const mondayStatus = await decodeValue(
    $,
    values[<string>payload.statusColumn]
  );
  const mondayPriority = await decodeValue(
    $,
    values[<string>payload.priorityColumn]
  );

  converted.id = await decodeValue($, values[<string>payload.practitestId]);
  converted.name = item.name;
  converted.description = await decodeValue(
    $,
    values[<string>payload.descriptionColumn]
  );
  converted.status = STATUS_MAPPING[mondayStatus];
  converted.priority = PRIORITY_MAPPING[mondayPriority];
  converted.assignee = await decodeValue(
    $,
    values[<string>payload.assigneesColumn]
  );

  converted.creator = (<IMondayUser>item.creator)?.email;

  return converted;
};
