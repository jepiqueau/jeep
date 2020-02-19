import { Component } from '@angular/core';
import { setStorage,setVideoPlayer,setSQLite } from '../../utils/util';
import { StorageAPIWrapper } from '../../utils/storageAPIWrapper';

const videoFrom:string = "http";
/*  comment line above and uncomment line below
    to use videos from assets
*/
//const videoFrom:string = "assets";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bPlatform:boolean;
  sbPlatform:boolean;
  private _videoPlayer: any = {};
  private _vpPlatform: string = "web";
  private _url: string;
  private _storage: any = {};
  private _stPlatform: string = "web";
  private _wrapperStorage: any = {};
  private _sqlite: any = {};
  private _sqPlatform: string = "web";
  private _cardStorage: HTMLIonCardElement;
  private _cardSQLite: HTMLIonCardElement;


  constructor() {}

  async ngAfterViewInit() {
    // setup the video player
    const player:any = await setVideoPlayer();
    this._videoPlayer = player.plugin;
    this._vpPlatform = player.platform;
    this.bPlatform = false;
    if(this._vpPlatform === "ios") {
      this._url = "public/assets/video/video.mp4";
    } else if (this._vpPlatform === "android") {
      this._url ="raw/video";
    } else {
      this.bPlatform = true;
      this._url = "assets/video/video.mp4";
    }
    if (videoFrom === "http") {
      this._url = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
    }
    // setup the storage
    const store:any = await setStorage();
    this._storage = store.plugin;
    this._stPlatform = store.platform;
    // setup the storage with wrapper
    this._wrapperStorage = new StorageAPIWrapper();

    // setup the SQLite plugin
    this.sbPlatform = true;
    const sqlite:any = await setSQLite();
    this._sqlite = sqlite.plugin;
    this._sqPlatform = sqlite.platform;
    if(this._sqPlatform === "web") this.sbPlatform = false;

    this._cardStorage = document.querySelector('.card-storage');
    this._cardSQLite = document.querySelector('.card-sqlite');
  }
  async testVideoPlayerPlugin() {
    this._cardStorage.style.display = "contents";
    this._cardSQLite.style.display = "contents";
    if(!this._cardStorage.classList.contains("hidden")) this._cardStorage.classList.add('hidden');
    if(!this._cardSQLite.classList.contains("hidden")) this._cardSQLite.classList.add('hidden');
    document.addEventListener('jeepCapVideoPlayerPlay', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail)}, false);
    const res:any  = await this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url});
  }
  async testStoragePlugin() {
    this._cardStorage.style.display = "initial";
    this._cardSQLite.style.display = "contents";
    if(this._cardStorage.classList.contains("hidden")) this._cardStorage.classList.remove('hidden');
    if(!this._cardSQLite.classList.contains("hidden")) this._cardSQLite.classList.add('hidden');
    await this.resetStorageDisplay();
    await this.resetSQLiteDisplay();
    const result:any = await this._storage.echo({value:"Hello from Jeep"});
    console.log('in testPlugin value ',JSON.stringify(result));
    const divEchoEl = document.querySelector('.echo');
    divEchoEl.innerHTML = result.value;
    const retTest1 = await this.testFirstStore();

    const retTest2 = await this.testSecondStore();
    const retTest3 = await this.testThirdStore();
    var retEncrypted: Boolean = true;
    if(this._stPlatform != "web") {      
      const retTest4 = await this.testEncryptSecondStore();
      const retTest5 = await this.testSecondStoreReOpenWithWrongSecret();
      const retTest6 = await this.testSecondStoreReOpenWithGoodSecret(); 
      const retTest7 = await this.testSecondStoreChangeSecret(); 
      const retTest8 = await this.testSecondStoreReOpenWithNewSecret(); 
      const retTest9 = await this.testNewEncryptedFourthStore();
      if (!retTest4 || !retTest5 
        || !retTest6 || !retTest7 || !retTest8 || !retTest9) retEncrypted = false;
    } 
   if(retTest1 && retTest2 && retTest3 && retEncrypted) {
      document.querySelector('.success').classList.remove('display');
      return true;
    } else {
      document.querySelector('.failure').classList.remove('display');
      return false;
    }
  }
  async resetStorageDisplay(): Promise<void> {
    for (let i:number=0;i< this._cardStorage.childElementCount;i++) {
      if(!this._cardStorage.children[i].classList.contains('display')) this._cardStorage.children[i].classList.add('display');
    }
  }

  async testStoragePluginWithWrapper() {
    this._cardStorage.style.display = "initial";
    this._cardSQLite.style.display = "contents";
    if(this._cardStorage.classList.contains("hidden")) this._cardStorage.classList.remove('hidden');
    let ret1: boolean = false;
    let ret2: boolean = false;
    let ret3: boolean = false;
    let ret4: boolean = false;
    let ret5: boolean = false;
    let ret6: boolean = false;
    let result: boolean = await this._wrapperStorage.openStore({});
    if(result){
//      this.platform = this.storage.platform;
      await this._wrapperStorage.clear();
      await this._wrapperStorage.setItem("key-test", "This is a test");
      let value:string = await this._wrapperStorage.getItem("key-test")
      console.log("Get Data : " + value);
      if (value === "This is a test") ret1 = true;
      let keys:Array<string> = await this._wrapperStorage.getAllKeys();
      console.log("Get All Keys : " + keys);
      if (keys[0] === "key-test") ret2 = true;     
      await this._wrapperStorage.removeItem("key-test");
      keys = await this._wrapperStorage.getAllKeys();
      console.log("Get All Keys : " + keys);
      if (keys.length === 0) ret3 = true;           
      result = await this._wrapperStorage.openStore({database:"testStore",table:"table1"});
      if(result) {
        await this._wrapperStorage.clear();
        await this._wrapperStorage.setItem("key1-test", "This is a new store");
        value = await this._wrapperStorage.getItem("key1-test")
        console.log("Get Data : " + value);
        if (value === "This is a new store") ret4 = true;
        let statusTable: any = await this._wrapperStorage.setTable({table:"table2"}); 
        console.log('statusTable[0] ',statusTable[0])
        console.log('statusTable[1] ',statusTable[1])
        if(statusTable[0]) ret5 = true;
        await this._wrapperStorage.clear();
        await this._wrapperStorage.setItem("key2-test", "This is a second table");
        value = await this._wrapperStorage.getItem("key2-test")
        console.log("Get Data : " + value);
        if (value === "This is a second table") ret6 = true;
      }
    }
    if(ret1 && ret2 && ret3 && ret4 && ret5 && ret6) {
      console.log('testPlugin2 is successful');
      document.querySelector('.wrapper-success').classList.remove('display');
    } else {
      document.querySelector('.wrapper-failure').classList.remove('display');
    }
  }

  async testFirstStore(): Promise<boolean> {
    //populate some data
    //string
    let retTest1: boolean = false;
    let retpopulate: boolean = false;
    let retiskey = false;
    let retkeys = false;
    let retvalues = false;
    let retkeysvalues = false;
    let retremove = false;
    let retclear = false;
    console.log('in testFirstStore ***** ')
    let result:any = await this._storage.openStore({});
    console.log('storage retCreate ',result.result)
    if (result.result) {
      await this._storage.clear();
      // store data in the first store
      result = await this._storage.set({key:"session",value:"Session Opened"});
      console.log("Save Data : " + result.result);
      result = await this._storage.get({key:"session"})
      console.log('result ',result)
      console.log("Get Data : " + result.value);
      let ret1: boolean = false;
      if (result.value === "Session Opened") ret1 = true;
      // json
      let data: any = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}}
      await this._storage.set({key:'testJson',value:JSON.stringify(data)})
      result = await this._storage.get({key:"testJson"})
      console.log("Get Data : " + result.value);
      let ret2: boolean = false;
      if (result.value === JSON.stringify(data)) ret2 = true;
      // number
      let data1: any = 243.567
      await this._storage.set({key:'testNumber',value:data1.toString()})
      result = await this._storage.get({key:"testNumber"})
      console.log("Get Data : " + result.value);
      let ret3: boolean = false;
      if (result.value === data1.toString()) ret3 = true;
      if (ret1 && ret2 && ret3) retpopulate = true;
      if (retpopulate) document.querySelector('.populate').classList.remove('display');
      console.log(" before isKey testNumber ") 
      result = await this._storage.iskey({key:"testNumber"})
      console.log("isKey testNumber " + result.result)
      ret1 = result.result
      result = await this._storage.iskey({key:"foo"})
      console.log("isKey foo " + result.result)
      ret2 = result.result
      if (ret1 && !ret2) retiskey = true
      if (retiskey) document.querySelector('.iskey').classList.remove('display');
      
      result = await this._storage.keys()
      console.log("Get keys : " + result.keys);
      console.log("Keys length " + result.keys.length)
  
      if(result.keys.length === 3 && result.keys[0] === "session"
          && result.keys[1] === "testJson" && result.keys[2] === "testNumber") {
        retkeys = true;
        document.querySelector('.keys').classList.remove('display');
      }
      result = await this._storage.values()
      console.log("Get values : " + result.values);
      console.log("Values length " + result.values.length)
      if(result.values.length === 3 && result.values[0] === "Session Opened"
          && result.values[1] === JSON.stringify(data) && result.values[2] === data1.toString()) {
        retvalues = true;
        document.querySelector('.values').classList.remove('display');
      }
  
      result = await this._storage.keysvalues();
      result.keysvalues.forEach(element => {
        console.log(element)
      });
      console.log("KeysValues length " + result.keysvalues.length)
      if(result.keysvalues.length === 3 &&
          result.keysvalues[0].key === "session" && result.keysvalues[0].value === "Session Opened" &&
          result.keysvalues[1].key === "testJson" && result.keysvalues[1].value === JSON.stringify(data) &&
          result.keysvalues[2].key === "testNumber" && result.keysvalues[2].value === data1.toString()) {
        retkeysvalues = true;
        document.querySelector('.keysvalues').classList.remove('display');
      }
      result = await this._storage.remove({key:"testJson"});
      if(result.result) {
        let res: any = await this._storage.keysvalues();
        if(res.keysvalues.length === 2 && 
          res.keysvalues[0].key === "session" && res.keysvalues[0].value === "Session Opened" &&
          res.keysvalues[1].key === "testNumber" && res.keysvalues[1].value === data1.toString()) {
          retremove = true;
          document.querySelector('.remove').classList.remove('display');
        }
      }
      result = await this._storage.clear();
      if(result.result) {
        let res: any = await this._storage.keysvalues();
        console.log("after clear res.keysvalues.length " + res.keysvalues.length)
        if(res.keysvalues.length === 0) {
          retclear = true;
          document.querySelector('.clear').classList.remove('display');
          if(retpopulate && retiskey && retkeys && retvalues && retkeysvalues && retremove && retclear) {
            retTest1 = true;
            document.querySelector('.success1').classList.remove('display');
          } else {
            document.querySelector('.failure1').classList.remove('display');
          }
        }
      } else {
          document.querySelector('.failure1').classList.remove('display');
      }
  
    }
    console.log('in testFirstStore end ***** ')

    return retTest1;
  }
  async testSecondStore(): Promise<boolean> { 
    // open a second store
    console.log('in testSecondStore ***** ')
    if(this._stPlatform === "ios" || this._stPlatform === "android") {
      this._storage.deleteStore({database:"myStore"});
    }

    let result: any = await this._storage.openStore({database:"myStore",table:"saveData"});
    result = await this._storage.clear();
    // store data in the second store
    result = await this._storage.set({key:"app", value:"App Opened"});
    console.log("Save Data : " + result.result);
    let data:any = {'age':40,'name':'jeep','email':'jeep@example.com'}
    await this._storage.set({key:'user',value:JSON.stringify(data)});
    result = await this._storage.get({key:"user"});
    console.log("Get Data in Second Store: " + result.value);
    if (result.value === JSON.stringify(data)) {
      const res:any = await this._storage.get({key:"app"});
      if (res.value === "App Opened") {
        document.querySelector('.success2').classList.remove('display');
        console.log('in testSecondStore end true ***** ')
        return true;
      } else {
        document.querySelector('.failure2').classList.remove('display');
        console.log('in testSecondStore end false ***** ')
        return false;
      }
    } else {
      document.querySelector('.failure2').classList.remove('display');
      console.log('in testSecondStore end false ***** ')
      return false;
    }
  }
  async testThirdStore(): Promise<boolean> {
    let ret: boolean = false;
    let retKey1: boolean = false; 
    let retKey2: boolean = false; 
    let retKey3: boolean = false;
    let result: any;
    console.log('in testThirdStore ***** ')
    // open a third store
    result = await this._storage.setTable({table:"otherData"});
    console.log('storage2 retCreate ',result.result.toString())
    result = await this._storage.clear();
    // store data in the third store
    result = await this._storage.set({key:"key1", value:"Hello World!"});
    let res:any = await this._storage.get({key:"key1"});
    console.log("Get Data in Third Store key1: " + res.value);
    if (res.value === "Hello World!") retKey1 = true;
    let data:any = {'a':60,'pi':'3.141516','b':'cool'}
    result = await this._storage.set({key:'key2',value:JSON.stringify(data)});
    res= await this._storage.get({key:"key2"});
    console.log("Get Data in Third Store key2: " + res.value);
    if (res.value === JSON.stringify(data)) retKey2 = true;

    // store data in the second store
    result = await this._storage.setTable({table:"saveData"});    
    result = await this._storage.set({key:"message", value:"Welcome from Jeep"});
    console.log("Save Data : " + result.result);
    res = await this._storage.get({key:"message"});
    console.log("Get Data in Second Store message: " + res.value);
    if (res.value === "Welcome from Jeep") {
      let data:any = {'age':50,'name':'jeep','email':'jeep@example.com'}
      result = await this._storage.set({key:'user',value:JSON.stringify(data)});
      res = await this._storage.get({key:"user"});
      console.log("Get Data in Second Store user: " + res.value);
      if (res.value === JSON.stringify(data)) {
        retKey3 = true;
      }
    } 
    if(retKey1 && retKey2 && retKey3) {
      document.querySelector('.success3').classList.remove('display');
      console.log('in testThirdStore end true ***** ')
      return true;
    } else {
      document.querySelector('.failure3').classList.remove('display');
      console.log('in testThirdStore end false ***** ')
      return false;
    }
  }
  async testEncryptSecondStore(): Promise<boolean> {
    console.log("*** start testEncryptSecondStore ***")
    let ret: boolean = false;
    var ret1: boolean = false;
    var ret2: boolean = false;
    var ret3: boolean = false;
    var retKey1: boolean = false;
    var retKey2: boolean = false;
    let resultOpen: any = await this._storage.openStore({database:"myStore",table:"saveData",encrypted:true,mode:"encryption"});
    if(resultOpen.result) {

      var res:any = await this._storage.get({key:"app"});
      if (res.value === "App Opened") ret1 = true;
      let data:any = {'age':50,'name':'jeep','email':'jeep@example.com'}

      res = await this._storage.get({key:"user"});
      if(res.value === JSON.stringify(data)) ret2 = true;
      res = await this._storage.get({key:"message"});
      if (res.value === "Welcome from Jeep")  ret3 = true;  
      // open a third store
      const result: boolean = await this._storage.setTable({table:"otherData"});
      res = await this._storage.get({key:"key1"});
      console.log("Get Data in Third Store key1: " + res.value);
      if (res.value === "Hello World!") retKey1 = true;
      data = {'a':60,'pi':'3.141516','b':'cool'}
      res= await this._storage.get({key:"key2"});
      console.log("Get Data in Third Store key2: " + res.value);
      if (res.value === JSON.stringify(data)) retKey2 = true;
      if(ret1 && ret2 && ret3 && retKey1 && retKey2) {
      ret = true
      }
  
    }
    if(ret) {
      document.querySelector('.success4').classList.remove('display');
      console.log("*** end testEncryptSecondStore true *** ")
    } else {
      document.querySelector('.failure4').classList.remove('display');
      console.log("*** end testEncryptSecondStore false *** ")
    }
    return ret
  }
  async testSecondStoreReOpenWithWrongSecret() : Promise<boolean> {
    console.log("*** start testSecondStoreReOpenWithWrongSecret ***")
    let ret: boolean = false;
    let resultOpen: any = await this._storage.openStore({database:"myStore",table:"saveData",encrypted:true,mode:"wrongsecret"});
    if (resultOpen.result) {
      console.log("in testSecondStoreReOpenWithWrongSecret true")
    } else {
      console.log("in testSecondStoreReOpenWithWrongSecret false")
    }
    if (!resultOpen.result) {
      ret = true
    }
    if(ret) {
      document.querySelector('.success5').classList.remove('display');
      console.log("*** end testSecondStoreReOpenWithWrongSecret true *** ")
    } else {
      console.log("*** end testSecondStoreReOpenWithWrongSecret false *** ")
      document.querySelector('.failure5').classList.remove('display');
    }
    return ret
  }
  async testSecondStoreReOpenWithGoodSecret(): Promise<boolean> {
    console.log("*** start testSecondStoreReOpenWithGoodSecret ***")
    let ret: boolean = false;
    var ret1: boolean = false;
    var ret2: boolean = false;
    var ret3: boolean = false;
    let resultOpen: any = await this._storage.openStore({database:"myStore",table:"saveData",encrypted:true,mode:"secret"});
    if(resultOpen.result) {

      var res:any = await this._storage.get({key:"app"});
      if (res.value === "App Opened") ret1 = true;
      let data:any = {'age':50,'name':'jeep','email':'jeep@example.com'}

      res = await this._storage.get({key:"user"});
      if(res.value === JSON.stringify(data)) ret2 = true;
      res = await this._storage.get({key:"message"});
      if (res.value === "Welcome from Jeep") ret3 = true;      
      if(ret1 && ret2 && ret3) {
        ret = true
      }
  
    }
    if(ret) {
      document.querySelector('.success6').classList.remove('display');
    } else {
      document.querySelector('.failure6').classList.remove('display');
    }
    console.log("*** end testSecondStoreReOpenWithGoodSecret *** ",ret)
    return ret
  }
  async testSecondStoreChangeSecret(): Promise<boolean> {
    console.log("*** start testSecondStoreChangeSecret ***")
    let ret: boolean = false;
    var ret1: boolean = false;
    var ret2: boolean = false;
    var ret3: boolean = false;
    let resultOpen: any = await this._storage.openStore({database:"myStore",table:"saveData",encrypted:true,
      mode:"newsecret"});
    if(resultOpen.result) {

      var res:any = await this._storage.get({key:"app"});
      if (res.value === "App Opened") ret1 = true;
      let data:any = {'age':50,'name':'jeep','email':'jeep@example.com'}

      res = await this._storage.get({key:"user"});
      if(res.value === JSON.stringify(data)) ret2 = true;
      res = await this._storage.get({key:"message"});
      if (res.value === "Welcome from Jeep") ret3 = true;      
      if(ret1 && ret2 && ret3) {
        ret = true
      }
    }
    if(ret){
      document.querySelector('.success7').classList.remove('display');
    } else {
      document.querySelector('.failure7').classList.remove('display');
    }
    console.log("*** end testSecondStoreChangeSecret *** ",ret)
    return ret
  }
  async testSecondStoreReOpenWithNewSecret(): Promise<boolean> {
    console.log("*** start testSecondStoreReOpenWithNewSecret ***");
    let ret: boolean = false;
    var ret1: boolean = false;
    var ret2: boolean = false;
    var ret3: boolean = false;
    let resultOpen: any = await this._storage.openStore({database:"myStore",table:"saveData",encrypted:true,
      mode:"secret"});
    if(resultOpen.result) {

      var res:any = await this._storage.get({key:"app"});
      if (res.value === "App Opened") ret1 = true;
      let data:any = {'age':50,'name':'jeep','email':'jeep@example.com'}

      res = await this._storage.get({key:"user"});
      if(res.value === JSON.stringify(data)) ret2 = true;
      res = await this._storage.get({key:"message"});
      if (res.value === "Welcome from Jeep") ret3 = true;      
      if(ret1 && ret2 && ret3) {
        ret = true
      }
  
    }
    if (ret) {
      document.querySelector('.success8').classList.remove('display');
    } else {
      document.querySelector('.failure8').classList.remove('display');
    }
    console.log("*** end testSecondStoreReOpenWithNewSecret *** ",ret);
    return ret
  }
  async testNewEncryptedFourthStore(): Promise<boolean> {
    console.log("*** start testNewEncryptedFourthStore *** ");
    let ret: boolean = false;
    var result: boolean = false;
    var retKey1: boolean = false;
    var retKey2: boolean = false;
    if(this._stPlatform === "ios" || this._stPlatform === "android") {
      this._storage.deleteStore({database:"fourthStore"});
    }    
    let resultOpen: any = await this._storage.openStore({database:"fourthStore",table:"test1_table",encrypted:true,
      mode:"secret"});
    if(resultOpen.result) {
      // store data in the fourth store
      result = await this._storage.set({key:"my_key1", value:"Hello World from Jeep!"});
      let res:any = await this._storage.get({key:"my_key1"});
      console.log("Get Data in Fourth Store key1: " + res.value);
      if (res.value === "Hello World from Jeep!") retKey1 = true;
      let data:any = {'radius':100,'x':10,'y':50,'color':'red',}
      result = await this._storage.set({key:'my_key2',value:JSON.stringify(data)});
      res= await this._storage.get({key:"my_key2"});
      console.log("Get Data in Fourth Store key2: " + res.value);
      if (res.value === JSON.stringify(data)) retKey2 = true;
      if(retKey1 && retKey2) ret = true;
    }
    if (ret) {
      document.querySelector('.success9').classList.remove('display');
    } else {
      document.querySelector('.failure9').classList.remove('display');
    }
    console.log("*** end testNewEncryptedFourthStore *** ",ret);
    return ret
  }
  async testSQLitePlugin() {
    console.log("***** testSQLITE Started")
    this._cardStorage.style.display = "contents";
    this._cardSQLite.style.display = "initial";
    if(!this._cardStorage.classList.contains("hidden")) this._cardStorage.classList.add('hidden');
    if(this._cardSQLite.classList.contains("hidden")) this._cardSQLite.classList.remove('hidden');
    await this.resetStorageDisplay();
    await this.resetSQLiteDisplay();
    const retTest1 = await this.testDatabase();
    const retTest2 = await this.testEncryptionDatabase(); 
    const retTest3 = await this.testEncryptedDatabase();
    const retTest4 = await this.testWrongSecret();
    const retTest5 = await this.testChangePassword();
    const retTest6 = await this.testDatabaseNewPassword();
    
    if(!retTest1 || !retTest2 || !retTest3 || !retTest4 || !retTest5 || !retTest6) {     
      document.querySelector('.sql-allfailure').classList.remove('display');
    } else {
      document.querySelector('.sql-allsuccess').classList.remove('display');
    }
  }
  async resetSQLiteDisplay(): Promise<void> {
    for (let i:number=0;i< this._cardSQLite.childElementCount;i++) {
      if(!this._cardSQLite.children[i].classList.contains('display')) this._cardSQLite.children[i].classList.add('display');
    }
  }
  async testDatabase(): Promise<Boolean> {
    let retTest:Boolean = false;
    //populate some data
    //string
    let retOpenDB: boolean = false;
    let retExecute1: boolean = false;
    let retExecute2: boolean = false;
    let retExecute3: boolean = false;
    let retQuery1: boolean = false;
    let retQuery2: boolean = false;
    let retQuery3: boolean = false;
    let retQuery4: boolean = false;
    let retRun1: boolean = false;
    let retRun2: boolean = false;
    let retClose: boolean = false;
    let echo:any = await this._sqlite.echo({value:"Hello from JEEP"});
    console.log("echo ",echo)
    // Delete the Database to enable restart
    // as after the first pass the database is encrypted
    if(this._sqPlatform === "ios" || this._sqPlatform === "android") {
      const resDel: any = await this._sqlite.deleteDatabase({database:"testsqlite"});
      console.log("Delete database testsqlite ", resDel.result.toString());
    }

    // Open Database
    let result:any = await this._sqlite.open({database:"testsqlite"});
    console.log("Open database : " + result.result.toString());
    retOpenDB = result.result;
    if(retOpenDB) {
      document.querySelector('.openDB').classList.remove('display');
      // Create Tables if not exist
      let sqlcmd: string = `
      BEGIN TRANSACTION;
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY NOT NULL,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          age INTEGER
      );
      CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          body TEXT NOT NULL
      );
      PRAGMA user_version = 1;
      COMMIT TRANSACTION;
      `;
      console.log('sqlcmd ',sqlcmd)
      var retExe: any = await this._sqlite.execute({statements:sqlcmd});
      console.log('retExe ',retExe.changes)
      retExecute1 = retExe.changes === 0 || retExe.changes === 1 ? true : false;
      if (retExecute1) {
        document.querySelector('.execute1').classList.remove('display');        
      }
      // Insert some Users
      sqlcmd = `
      BEGIN TRANSACTION;
      DELETE FROM users;
      INSERT INTO users (name,email,age) VALUES ("Whiteley","Whiteley;Bill.com",30);
      INSERT INTO users (name,email,age) VALUES ("Jones","Jones.com",44);
      COMMIT TRANSACTION;
      `;
      retExe = await this._sqlite.execute({statements:sqlcmd});
      retExecute2 = retExe.changes >= 1 ? true : false;
      if (retExecute2) {
        document.querySelector('.execute2').classList.remove('display');        
      }
      // Insert some Messages
      sqlcmd = `
      BEGIN TRANSACTION;
      DELETE FROM messages;
      INSERT INTO messages (title,body) VALUES ("test post 1","content test post 1");
      INSERT INTO messages (title,body) VALUES ("test post 2","content test post 2");
      COMMIT TRANSACTION;
      `;
      retExe = await this._sqlite.execute({statements:sqlcmd});
      console.log('retExe.changes ',retExe.changes)
      retExecute3 = retExe.changes >= 1 ? true : false;
      if (retExecute3) {
        document.querySelector('.execute3').classList.remove('display');        
      }
      // Select all Users
      sqlcmd = "SELECT * FROM users";
      var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect.values.length ',retSelect.values.length)
      retQuery1 = retSelect.values.length === 2 ? true : false;
      const row1: any = retSelect.values[0];
      console.log("row1 users ",JSON.stringify(row1))
      const resQueryRow1:boolean = (row1.id === 1 && row1.name === "Whiteley" && row1.email === "Whiteley.com")  ? true : false;
      const row2: any = retSelect.values[1];
      console.log("row2 users ",JSON.stringify(row2))
      const resQueryRow2:boolean = (row2.id === 2 && row2.name === "Jones" && row2.email === "Jones.com")  ? true : false;
      console.log("retQuery1 resQueryRow1 resQueryRow2 ",retQuery1,resQueryRow1,resQueryRow2)
      if (retQuery1 && resQueryRow1 && resQueryRow2) {
        document.querySelector('.query1').classList.remove('display');        
      }
      // Select all Messages
      sqlcmd = "SELECT * FROM messages";
      var retSelect1: any = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect1.values.length ',retSelect1.values.length)
      retQuery2 = retSelect1.values.length === 2 ? true : false;
      const rowM1: any = retSelect1.values[0];
      console.log("row1 messages ",JSON.stringify(rowM1))
      const resQueryMRow1:boolean = (rowM1.id === 1 && rowM1.title === "test post 1" && rowM1.body === "content test post 1")  ? true : false;
      const rowM2: any = retSelect1.values[1];
      console.log("row2 messages ",JSON.stringify(rowM2))
      const resQueryMRow2:boolean = (rowM2.id === 2 && rowM2.title === "test post 2" && rowM2.body === "content test post 2")  ? true : false;
      console.log("retQuery2 resQueryMRow1 resQueryMRow2 ",retQuery2,resQueryMRow1,resQueryMRow2)
      if (retQuery2 && resQueryMRow1 && resQueryMRow2) {
        document.querySelector('.query2').classList.remove('display');        
      }
      // Insert a new User with SQL and Values

      sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
      let values: Array<any>  = ["Simpson","Simpson@example.com",69];
      var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
      retRun1 = retRun.changes === 1 ? true : false;
      if (retRun1) {
        document.querySelector('.run1').classList.remove('display');        
      }

      // Insert a new User with SQL
      sqlcmd = `INSERT INTO users (name,email,age) VALUES ("Brown","Brown@example.com",15)`;
      retRun = await this._sqlite.run({statement:sqlcmd,values:[]});
      retRun2 = retRun.changes === 1 ? true : false;
      if (retRun2) {
        document.querySelector('.run2').classList.remove('display');        
      }

      // Select all Users
      sqlcmd = "SELECT * FROM users";
      retSelect = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect ',retSelect.values.length)
      retQuery3 = retSelect.values.length === 4 ? true : false;
      for (let i:number =0; i< retSelect.values.length; i++) {
        console.log("results : ",i,retSelect.values[i]);
      }
      if (retQuery3) {
        document.querySelector('.query3').classList.remove('display');        
      }
      // Select Users with age > 35
      sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
      retSelect = await this._sqlite.query({statement:sqlcmd,values:["35"]});
      console.log('retSelect ',retSelect.values.length)
      retQuery4 = retSelect.values.length === 2 ? true : false;
      for (let i:number =0; i< retSelect.values.length; i++) {
        console.log("results : ",i,retSelect.values[i]);
      }
      if (retQuery4) {
        document.querySelector('.query4').classList.remove('display');        
      }

      // close database
      console.log('closing the db')
      const res = await this._sqlite.close({database:"testsqlite"});
      if(res.result) retClose = true;
      if(!retExecute1 || !retExecute2 || !retExecute3 || !retQuery1 || !retRun1 || 
        !retRun2 || !retQuery2 || !retQuery3 || !retQuery4 || !retClose) {
        document.querySelector('.sql-failure1').classList.remove('display');
      } else {
        console.log("***** End testDatabase *****")
        document.querySelector('.sql-success1').classList.remove('display');
        retTest = true;
      }
    } else {
      document.querySelector('.sql-failure1').classList.remove('display');
    }

    return retTest;
  }
  async testEncryptedDatabase(): Promise<Boolean> {
    let retTest:Boolean = false;
    let retOpenDB: boolean = false;
    let retClose: boolean = false;
    // Delete the Database to enable restart
    // as after the first pass the secret phrase is set to the new secret phrase
    if(this._sqPlatform === "ios" || this._sqPlatform === "android") {
      const resDel: any =  await this._sqlite.deleteDatabase({database:"encryptedsqlite"});
      console.log("Delete database encryptedsqlite ", resDel.result.toString());
    }
    // Open Database

    let result:any = await this._sqlite.open({database:"encryptedsqlite",encrypted:true,mode:"secret"});
    console.log("Open database : " + result.result);
    retOpenDB = result.result;
    if(retOpenDB) {
      // Create Tables if not exist
      let sqlcmd: string = `
      BEGIN TRANSACTION;
      CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY NOT NULL,
          email TEXT UNIQUE NOT NULL,
          name TEXT
      );
      PRAGMA user_version = 1;
      COMMIT TRANSACTION;
      `;
      console.log('sqlcmd ',sqlcmd)
      var retExe: any = await this._sqlite.execute({statements:sqlcmd});
      console.log('retExe ',retExe.changes)
      const retExecute1:Boolean  = retExe.changes === 0 || retExe.changes === 1 ? true : false;
      // Insert some Contacts
      sqlcmd = `
      BEGIN TRANSACTION;
      DELETE FROM contacts;
      INSERT INTO contacts (name,email) VALUES ("Whiteley","Whiteley.com");
      INSERT INTO contacts (name,email) VALUES ("Jones","Jones.com");
      COMMIT TRANSACTION;
      `;
      retExe = await this._sqlite.execute({statements:sqlcmd});
      const retExecute2: Boolean = retExe.changes >= 1 ? true : false;
      // Select all Contacts
      sqlcmd = "SELECT * FROM contacts";
      const retSelect = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect ',retSelect.values.length)
      const retQuery1 = retSelect.values.length === 2 ? true : false;
      // close database
      const res:any = await this._sqlite.close({database:"encryptedsqlite"});
      if(res.result) retClose = true;

      if(!retExecute1 || !retExecute2 || !retQuery1 || !retClose) {
        document.querySelector('.sql-failure3').classList.remove('display');
      } else {
        document.querySelector('.sql-success3').classList.remove('display');
        retTest = true;
      }


    } else {
      document.querySelector('.sql-failure3').classList.remove('display');
    }
    return retTest;
  }
  async testWrongSecret(): Promise<Boolean> {
    let retTest:Boolean = false;
    let resultOpen:any = await this._sqlite.open({database:"encryptedsqlite",encrypted:true,mode:"wrongsecret"});

    if (!resultOpen.result) {
      document.querySelector('.sql-success4').classList.remove('display');
      retTest = true
    } else {
      document.querySelector('.sql-failure4').classList.remove('display');

    }

    return retTest;
  }
  async testChangePassword(): Promise<Boolean> {
    let retTest:Boolean = false;
    let retClose:Boolean = false;
    let resultOpen:any = await this._sqlite.open({database:"encryptedsqlite",encrypted:true,mode:"newsecret"});
    if(resultOpen.result) {
      // Select all Contacts
      const sqlcmd: string = "SELECT * FROM contacts";
      const retSelect = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect ',retSelect.values.length)
      const retQuery1 = retSelect.values.length === 2 ? true : false;
      // close database
      const res:any = await this._sqlite.close({database:"encryptedsqlite"});
      if(res.result) retClose = true;
      if(!retQuery1 || !retClose) {
        document.querySelector('.sql-failure5').classList.remove('display');
      } else {
        document.querySelector('.sql-success5').classList.remove('display');
        retTest = true;
      }
    } else {
      document.querySelector('.sql-failure5').classList.remove('display');
    }
    return retTest;
  }
  async testDatabaseNewPassword(): Promise<Boolean> {
    let retTest:Boolean = false;
    let retClose: Boolean = false;
    let resultOpen:any = await this._sqlite.open({database:"encryptedsqlite",encrypted:true,mode:"secret"});
    if(resultOpen.result) {
      // Select all Contacts
      const sqlcmd: string = "SELECT * FROM contacts";
      const retSelect = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect ',retSelect.values.length)
      const retQuery1 = retSelect.values.length === 2 ? true : false;
      // close database
      const res = await this._sqlite.close({database:"encryptedsqlite"});
      if(res.result) retClose = true;
      if(!retQuery1 || !retClose) {
        document.querySelector('.sql-failure6').classList.remove('display');
      } else {
        document.querySelector('.sql-success6').classList.remove('display');
        retTest = true;
      }
    } else {
      document.querySelector('.sql-failure6').classList.remove('display');
    }    
    return retTest;
  }
  async testEncryptionDatabase(): Promise<Boolean> {
    let retQuery1: Boolean = false;
    let retQuery2: Boolean = false;
    let retTest:Boolean = false;
    let retClose: Boolean = false;
    let resultOpen:any = await this._sqlite.open({database:"testsqlite",encrypted:true,mode:"encryption"});
    if(resultOpen.result) {
      // Select all Users
      let sqlcmd:string = "SELECT * FROM users";
      var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect.result.length ',retSelect.values.length)
      retQuery1 = retSelect.values.length === 4 ? true : false;
      // Select all Messages
      sqlcmd = "SELECT * FROM messages";
      var retSelect1: any = await this._sqlite.query({statement:sqlcmd,values:[]});
      console.log('retSelect1.result.length ',retSelect1.values.length)
      retQuery2 = retSelect1.values.length === 2 ? true : false;
      // close database
      const res = await this._sqlite.close({database:"testsqlite"});
      if(res.result) retClose = true;
      if (!retQuery1 || !retQuery2 || !retClose) {
        document.querySelector('.sql-failure2').classList.remove('display');
      } else {
        document.querySelector('.sql-success2').classList.remove('display');
        retTest = true;
      }
    } else {
      document.querySelector('.sql-failure2').classList.remove('display');
    }
    return retTest;
  }
 
}
