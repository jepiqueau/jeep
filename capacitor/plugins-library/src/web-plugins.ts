import { Plugins, mergeWebPlugins /*¨, mergeWebPlugin, WebPlugin */} from '@capacitor/core';

export * from './web/capacitordatastoragesqlite';
export * from './web/capacitorvideoplayer';

mergeWebPlugins(Plugins);
