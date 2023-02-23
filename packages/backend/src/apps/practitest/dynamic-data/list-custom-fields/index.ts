import { IGlobalVariable, IJSONObject } from '@automatisch/types';

export default {
  name: 'List custom fields',
  key: 'listCustomFields',

  async run($: IGlobalVariable) {
    const project = $.step.parameters.project;

    const response = await $.http.get(
      `/projects/${project}/custom_fields.json`
    );

    const customFields = response.data.data.map((customField: IJSONObject) => ({
      value: `---f-${customField.id}`,
      name: (<IJSONObject>customField.attributes).name,
    }));

    return {
      data: customFields,
    };
  },
};
