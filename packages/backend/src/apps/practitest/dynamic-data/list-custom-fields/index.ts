import { IGlobalVariable, IJSONObject } from '@automatisch/types';

export default {
  name: 'List custom fields',
  key: 'listCustomFields',

  async run($: IGlobalVariable) {
    console.log(new Error().stack);
    const project = $.step.parameters.project;
    console.log('HI', $);
    const response = await $.http.get(
      `/projects/${project}/custom_fields.json`
    );
    console.log('GINA', response);

    const customFields = response.data.data.map((customField: IJSONObject) => ({
      value: customField.id,
      name: (<IJSONObject>customField.attributes).name,
    }));

    return {
      data: customFields,
    };
  },
};
