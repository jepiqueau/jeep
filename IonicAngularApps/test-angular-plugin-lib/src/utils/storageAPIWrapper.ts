import { setStorage } from '../utils/util';

export class StorageAPIWrapper {
    public storage: any = {};
    public platform: string = "web";
    constructor() {

    }
    async init(): Promise<void> {
        const store: any = await setStorage();
        console.log('in StorageAPIWrapper store ',store)
        this.storage = store.plugin;
        this.platform = store.platform;
    }
    public async openStore(options:any): Promise<boolean> {
        await this.init();
        const {result} = await this.storage.openStore(options);
        return result;
    }
    public async setTable(table:any): Promise<any>  {
        const {result,message} = await this.storage.setTable(table);
        return Promise.resolve([result,message]);
    }
    public async setItem(key:string, value:string): Promise<void> {
        await this.storage.set({ key, value });
    return;
    }
    public async getItem(key:string): Promise<string> {
        const {value} = await this.storage.get({ key });
    return value;
    }
    public async getAllKeys(): Promise<Array<string>> {
        const {keys} = await this.storage.keys();
    return keys;
    }
    public async removeItem(key:string): Promise<void> {
        await this.storage.remove({ key });
    return;
    }
    public async clear(): Promise<void> {
        await this.storage.clear();
    return;
    }
  
}