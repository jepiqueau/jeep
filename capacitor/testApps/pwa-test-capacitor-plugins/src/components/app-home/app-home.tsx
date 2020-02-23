import { Component, h, Element } from '@stencil/core';
import { CapacitorVideoPlayer, CapacitorDataStorageSqlite } from '@jeepq/capacitor';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @Element() el:HTMLAppHomeElement;

  private _card:HTMLIonCardElement;
  private _web: HTMLElement;

  componentDidLoad() {
    this._card = this.el.querySelector('.card');
    this._web = this.el.querySelector('.web');

  }
  handleClick(event: UIEvent,plugin: string) {
    console.log('event ',event)
    if(!this._card.classList.contains("hidden")) this._card.classList.add('hidden');
    if(!this._web.classList.contains("hidden")) this._web.classList.add('hidden');

    if(plugin === "videoplayer") this.testVideoPlayerPlugin();
    if(plugin === "datastorage") this.testDataStoragePlugin();
  }
  async testVideoPlayerPlugin() { 
    const videoPlayer:any = CapacitorVideoPlayer;
    const url:string = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
    document.addEventListener('jeepCapVideoPlayerPlay', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail)}, false);
    const res:any  = await videoPlayer.initPlayer({mode:"fullscreen",url:url});
    console.log('result of echo ', res)
  }

  async testDataStoragePlugin() {
    const storage: any = CapacitorDataStorageSqlite;
    if(this._card.classList.contains("hidden")) this._card.classList.remove('hidden');
    if(this._web.classList.contains("hidden")) this._web.classList.remove('hidden');
  //populate some data
    //string
    let retpopulate: boolean = false;
    let retiskey = false;
    let retkeys = false;
    let retvalues = false;
    let retkeysvalues = false;
    let retremove = false;
    let retclear = false;
    let resOpen:any = await storage.openStore({});
    if(resOpen) {
      let result:any = await storage.set({key:"session", value:"Session Opened"});
      console.log("Save Data : " + result.result);
      result = await storage.get({key:"session"})
      console.log('result ',result)
      console.log("Get Data : " + result.value);
      let ret1: boolean = false;
      if (result.value === "Session Opened") ret1 = true;
      result = await storage.get({ key: "session1" });
      let ret1a = false;
      if (result.value === null) ret1a = true;
      console.log("** ret1 ret1a ",ret1, ret1a)
    // json 
      let data:any = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}}
      await storage.set({key:'testJson',value:JSON.stringify(data)});
      result = await storage.get({key:"testJson"});
      console.log("Get Data : " + result.value);
      let ret2: boolean = false;
      if (result.value === JSON.stringify(data)) ret2 = true;
      // number
      let data1: any = 243.567
      await storage.set({key:'testNumber',value:data1.toString()})
      result = await storage.get({key:"testNumber"})
      console.log("Get Data : " + result.value);
      let ret3: boolean = false;
      if (result.value === data1.toString()) ret3 = true;
      console.log("** ret3 ",ret3)
      if (ret1 && ret1a && ret2 && ret3) retpopulate = true;
      console.log("** retpopulate ",retpopulate)
      if (retpopulate) {
        document.querySelector('.populate').classList.remove('hidden');
      }
      result = await storage.iskey({key:"testNumber"})
      console.log("isKey testNumber " + result.result)
      ret1 = result.result
      result = await storage.iskey({key:"foo"})
      console.log("isKey foo " + result.result)
      ret2 = result.result
      if (ret1 && !ret2) retiskey = true
      if (retiskey) document.querySelector('.iskey').classList.remove('hidden');
      
      result = await storage.keys()
      console.log("Get keys : " + result.keys);
      console.log("Keys length " + result.keys.length)
      if(result.keys.length === 3 && result.keys[0] === "session" 
          && result.keys[1] === "testJson" && result.keys[2] === "testNumber") {
        retkeys = true;
        document.querySelector('.keys').classList.remove('hidden');
      }
      result = await storage.values()
      console.log("Get values : " + result.values);
      console.log("Values length " + result.values.length)
      if(result.values.length === 3 && result.values[0] === "Session Opened"
          && result.values[1] === JSON.stringify(data) && result.values[2] === data1.toString()) {
        retvalues = true;
        document.querySelector('.values').classList.remove('hidden');
      }
  
      storage.keysvalues().then((result) => {
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
          storage.remove({key:"testJson"}).then((result) => {
            if(result.result) {
              storage.keysvalues().then(async (res) => {
                if(res.keysvalues.length === 2 && 
                  res.keysvalues[0].key === "session" && res.keysvalues[0].value === "Session Opened" &&
                  res.keysvalues[1].key === "testNumber" && res.keysvalues[1].value === data1.toString()) {
                  retremove = true;
                  document.querySelector('.remove').classList.remove('hidden');
                }
                result = await storage.clear()
                if(result.result) {
                  let res = await storage.keysvalues()
                  console.log("after clear res.keysvalues.length " + res.keysvalues.length)
                  if(res.keysvalues.length === 0) {
                    retclear = true;
                    document.querySelector('.clear').classList.remove('hidden');
                  }
                  if(retpopulate && retiskey && retkeys && retvalues && retkeysvalues && retremove && retclear) {
                    document.querySelector('.success').classList.remove('hidden');      
                  } else {
                    document.querySelector('.failure').classList.remove('hidden');                    
                  }
                } else {
                  document.querySelector('.failure').classList.remove('hidden');                                    
                }                   
              });
            } else {
              document.querySelector('.failure').classList.remove('hidden');                    
            }
          });
        } else {
          document.querySelector('.failure').classList.remove('hidden');                    
        }
      });  
    } else {
      document.querySelector('.failure').classList.remove('hidden');                    
    }

  }
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire
          apps with web components using Stencil and ionic/core! Check out the
          README for everything that comes in this starter out of the box and
          check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
        <ion-button expand="block" onClick={ (event: UIEvent) => this.handleClick(event,"videoplayer")}>Test Video Player Plugin</ion-button>
        <ion-button expand="block" onClick={ (event: UIEvent) => this.handleClick(event,"datastorage")}>Test Data Storage Plugin</ion-button>
        <ion-card class="card hidden">
          <p class="native hidden">
            In Native Storage
          </p>
          <p class="web hidden">
            In Web Storage
          </p>
          <p>
            {navigator.userAgent}
          </p>
          <p class="populate hidden">
            Storing data successful
          </p>
          <p class="iskey hidden">
            Iskey successful
          </p>
          <p class="keys hidden">
            Get keys successful
          </p>
          <p class="values hidden">
            Get values successful
          </p>
          <p class="keysvalues hidden">
            Get keys/values successful
          </p>
          <p class="remove hidden">
            Remove key successful
          </p>
          <p class="clear hidden">
            Clear keys successful
          </p>
          <p class="success hidden">
            The test was successful
          </p>
          <p class="failure hidden">
            The test failed
          </p>
        </ion-card>
      </ion-content>
    ];
  }
}
