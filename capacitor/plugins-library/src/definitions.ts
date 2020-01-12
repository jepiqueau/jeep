declare module "@capacitor/core" {
  interface PluginRegistry {
    CapacitorDataStorageSqlite: CapacitorDataStorageSqlitePlugin;
    CapacitorVideoPlayer: CapacitorVideoPlayerPlugin;
  }
}
/**
 * Capacitor Data Storage Sqlite Plugin
 */
 
export interface CapacitorDataStorageSqlitePlugin {
  echo(options: { value: string }): Promise<{value: string}>;
  /**
   * Open a store
   * @param {capOpenStorageOptions} options {database: string, table: string}
   * @returns {Promise<capDataStorageResult>} {result:boolean}
   */
  openStore(options: capOpenStorageOptions): Promise<capDataStorageResult>;
  /**
   * Set or Add a table to an existing store
   * @param {capOpenStorageOptions} options {table: string}
   * @returns {Promise<capDataStorageResult>} {result:boolean}
   */
  setTable(options: capOpenStorageOptions): Promise<capDataStorageResult>;
  /**
   * Store a data with given key and value
   * @param {capDataStorageOptions} options {key: string, value: string}
   * @returns {Promise<capDataStorageResult>} {result:boolean}
   */
  set(options: capDataStorageOptions): Promise<capDataStorageResult>;
  /**
   * Retrieve a data value for a given data key
   * @param {capDataStorageOptions} options {key:"foo",value:"foovalue"}
   * @returns {Promise<capDataStorageResult>} {value:string}
   */
  get(options: capDataStorageOptions): Promise<capDataStorageResult>;
  /**
   * Remove a data with given key
   * @param {capDataStorageOptions} options {key:"foo"}
   * @returns {Promise<capDataStorageResult>} {result:boolean}
   */
  remove(options: capDataStorageOptions): Promise<capDataStorageResult>;
  /**
   * Clear the Data Store (delete all keys)
   * @returns {Promise<capDataStorageResult>} {result:boolean}
   */
  clear(): Promise<capDataStorageResult>;
  /**
   * Check if a data key exists
   * @param {capDataStorageOptions} options {key:"foo"}
   * @returns {Promise<capDataStorageResult>} {result:boolean}
   */
  iskey(options: capDataStorageOptions): Promise<capDataStorageResult>; 
  /**
   * Get the data key list
   * @returns {Promise<capDataStorageResult>} {keys:Array<string>}
   */
  keys(): Promise<capDataStorageResult>;
  /**
   * Get the data value list
   * @returns {Promise<capDataStorageResult>} {values:Array<string>}
   */
  values(): Promise<capDataStorageResult>;
  /**
   * Get the data key/value pair list
   * @returns {Promise<capDataStorageResult>} {keysvalues:Array<{key:string,value:string}>}
   */
  keysvalues(): Promise<capDataStorageResult>;
}
export interface capOpenStorageOptions {
  /**
   * The storage database name
   */
  database?: string;  // default: 
                      //  ios, android: storageSQLite
                      //  web : storageIDB
  /**
   * The storage table name
   */
  table?: string;   // default:
                    //  ios, android: storage_table
                    //  web: storage_store
  /**
   * Set to true for database encryption
   */
  encrypted?: boolean;  // only for ios and android
  /***
   * Set the mode for database ancryption
   * ["encryption", "secret","newsecret"]
   */
  mode?: string // only for ios and android

}
export interface capDataStorageOptions {
  /**
   * The data name
   */
  key: string;
  /**
   * The data value when required
   */
  value?: string;
}

export interface capDataStorageResult {
  /**
   * result set to true when successful else false
   */
  result?: boolean;
  /**
   * the data value for a given data key
   */
  value?: string;
  /**
   * the data key list as an Array
   */
  keys?: Array<string>;
  /**
   * the data values list as an Array
   */
  values?: Array<string>;
  /**
   * the data keys/values list as an Array of {key:string,value:string}
   */
  keysvalues?: Array<any>;
  /**
   * a message
   */
  message?: string;
}

/**
 * Capacitor Video Player Plugin
 */
export interface CapacitorVideoPlayerPlugin {
  /**
   * Initialize a video 
   * @param {capVideoPlayerOptions} options { url: string }
   * @returns {Promise<VideoPlayerResult>} {result: boolean}
   */
  initPlayer(options: capVideoPlayerOptions): Promise<capVideoPlayerResult>; 
  /**
   * Play the current video from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  play(options: capVideoPlayerOptions): Promise<capVideoPlayerResult>;
  /**
   * Pause the current video from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  pause(options: capVideoPlayerOptions): Promise<capVideoPlayerResult>;
  /**
   * Get the duration of the current video from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  getDuration(options: capVideoPlayerOptions): Promise<capVideoPlayerResult> 
  /**
   * Get the current time of the current video from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  getCurrentTime(options: capVideoPlayerOptions): Promise<capVideoPlayerResult> 
  /**
   * Set the current time to seek the current video to from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  setCurrentTime(options: capVideoPlayerOptions): Promise<capVideoPlayerResult>
  /**
   * Get the volume of the current video from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  getVolume(options: capVideoPlayerOptions): Promise<capVideoPlayerResult> 
  /**
   * Set the volume of the current video to from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  setVolume(options: capVideoPlayerOptions): Promise<capVideoPlayerResult>
  /**
   * Get the muted of the current video from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  getMuted(options: capVideoPlayerOptions): Promise<capVideoPlayerResult> 
  /**
   * Set the muted of the current video to from a given playerId
   * 
   * @param options 
   * @returns {Promise<VideoPlayerResult>} {result: boolean, method: string, value:string}
   */
  setMuted(options: capVideoPlayerOptions): Promise<capVideoPlayerResult>

}
export interface capVideoPlayerOptions {
  /**
   * The url of the video to play
   */
  mode: string
  url: string;
  playerId: string;
  width: number;
  height: number;
  volume: number;
  seektime: number;
  muted: boolean;
  videoList: Array<any>;
  pageTitle: string;
}
export interface capVideoPlayerResult {
  /**
   * result set to true when successful else false
   */
  result?: boolean;
  method?: string;
  value?: any;
}

