import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget /*, ValueAccessorConfig*/ } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'Jeep',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@jeepq/core',
      proxiesFile: '../packages/react/src/components.ts',
    }),
    angularOutputTarget({
      componentCorePackage: '@jeepq/core',
      directivesProxyFile: '../packages/angular/src/directives/proxies.ts'/*,
      valueAccessorConfigs: angularValueAccessorBindings,*/
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    { type: 'www',
      dir: 'public',
      serviceWorker: null,
      copy: [
        { src: '../tests', dest: 'tests' }
      ]
    },
    {
      type: 'docs-readme'
    }
  ]
};
