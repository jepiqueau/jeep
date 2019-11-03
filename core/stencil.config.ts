import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'Jeep',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@jeepq/core',
      proxiesFile: '../packages/react/src/components.ts',
    }),
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
