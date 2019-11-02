import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'Jeep',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: '../dist', dest: '../../test/build' }
      ]
    },
    {
      type: 'docs-readme'
    }
  ]
};
