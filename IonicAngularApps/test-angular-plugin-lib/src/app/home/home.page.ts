import { Component } from '@angular/core';
import { setStorage,setVideoPlayer } from '../../utils/util';
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
  private _videoPlayer: any = {};
  private _vpPlatform: string = "web";
  private _url: string;
  private _storage: any = {};
  private _stPlatform: string = "web";
  private _wrapperStorage: any = {};
  private _card: HTMLIonCardElement;


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
      this._url = "https://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
    }
    // setup the storage
    const store:any = await setStorage();
    this._storage = store.plugin;
    this._stPlatform = store.platform;
    // setup the storage with wrapper
    this._wrapperStorage = new StorageAPIWrapper();

    this._card = document.querySelector('.card');
  }
  async testVideoPlayerPlugin() { 
    if(!this._card.classList.contains("hidden")) this._card.classList.add('hidden');
    document.addEventListener('jeepCapVideoPlayerPlay', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail)}, false);
    const res:any  = await this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url});
  }
  async testStoragePlugin() {
    if(this._card.classList.contains("hidden")) this._card.classList.remove('hidden');
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
  async testStoragePluginWithWrapper() {
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
      if (retpopulate) document.querySelector('.populate').classList.remove('hidden');
      console.log(" before isKey testNumber ") 
      result = await this._storage.iskey({key:"testNumber"})
      console.log("isKey testNumber " + result.result)
      ret1 = result.result
      result = await this._storage.iskey({key:"foo"})
      console.log("isKey foo " + result.result)
      ret2 = result.result
      if (ret1 && !ret2) retiskey = true
      if (retiskey) document.querySelector('.iskey').classList.remove('hidden');
      
      result = await this._storage.keys()
      console.log("Get keys : " + result.keys);
      console.log("Keys length " + result.keys.length)
  
      if(result.keys.length === 3 && result.keys[0] === "session"
          && result.keys[1] === "testJson" && result.keys[2] === "testNumber") {
        retkeys = true;
        document.querySelector('.keys').classList.remove('hidden');
      }
      result = await this._storage.values()
      console.log("Get values : " + result.values);
      console.log("Values length " + result.values.length)
      if(result.values.length === 3 && result.values[0] === "Session Opened"
          && result.values[1] === JSON.stringify(data) && result.values[2] === data1.toString()) {
        retvalues = true;
        document.querySelector('.values').classList.remove('hidden');
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
        document.querySelector('.keysvalues').classList.remove('hidden');
      }
      result = await this._storage.remove({key:"testJson"});
      if(result.result) {
        let res: any = await this._storage.keysvalues();
        if(res.keysvalues.length === 2 && 
          res.keysvalues[0].key === "session" && res.keysvalues[0].value === "Session Opened" &&
          res.keysvalues[1].key === "testNumber" && res.keysvalues[1].value === data1.toString()) {
          retremove = true;
          document.querySelector('.remove').classList.remove('hidden');
        }
      }
      result = await this._storage.clear();
      if(result.result) {
        let res: any = await this._storage.keysvalues();
        console.log("after clear res.keysvalues.length " + res.keysvalues.length)
        if(res.keysvalues.length === 0) {
          retclear = true;
          document.querySelector('.clear').classList.remove('hidden');
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


}
