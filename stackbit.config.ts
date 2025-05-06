import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
  contentSources: [
    {
      type: 'git',
      name: 'content',
      models: [
        {
          name: 'page',
          label: 'Page',
          isPage: true,
          fields: [
            { name: 'title', type: 'string', label: 'Title' },
            { name: 'urlPath', type: 'string', label: 'URL Path' },
            { name: 'layout', type: 'string', label: 'Layout' },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        }
      ]
    }
  ]
});
