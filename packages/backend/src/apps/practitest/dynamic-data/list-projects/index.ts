import { IGlobalVariable, IJSONObject } from '@automatisch/types';

export default {
  name: 'List project',
  key: 'listProjects',

  async run($: IGlobalVariable) {
    const response = await $.http.get(`/projects.json`);

    const projects = response.data.data.map((project: IJSONObject) => ({
      value: project.id,
      name: (<IJSONObject>project.attributes).name,
    }));

    return {
      data: projects,
    };
  },
};
