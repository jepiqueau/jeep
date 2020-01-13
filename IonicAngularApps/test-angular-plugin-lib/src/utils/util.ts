import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from '@jeepq/capacitor';
const { CapacitorDataStorageSqlite, CapacitorVideoPlayer, Device } = Plugins;

export const setStorage = async (): Promise<any>=> {
  const info = await Device.getInfo();
  console.log('platform ',info.platform)
  if (info.platform === "ios" || info.platform === "android") {
    return {plugin:CapacitorDataStorageSqlite, platform:info.platform};
  }  else {
    return {plugin:PluginsLibrary.CapacitorDataStorageSqlite, platform:"web"};     
  } 
}
export const setVideoPlayer = async (): Promise<any>=> {
  const info = await Device.getInfo();
  console.log('platform ',info.platform)
  if (info.platform === "ios" || info.platform === "android") {
    return {plugin:CapacitorVideoPlayer, platform:info.platform};
  }  else {
    return {plugin:PluginsLibrary.CapacitorVideoPlayer, platform:"web"};     
  } 
}