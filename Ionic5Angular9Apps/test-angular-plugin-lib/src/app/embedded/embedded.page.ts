import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { setVideoPlayer } from '../../utils/util';
import { httpVideos, assetsVideos, getAssetsVideoPathes, getVideoNames } from '../../utils/video-utils';

const videoFrom:string = "http";
/*  comment line above and uncomment line below
    to use videos from assets
*/
//const videoFrom:string = "assets";

@Component({
  selector: 'app-embedded',
  templateUrl: 'embedded.page.html',
  styleUrls: ['embedded.page.scss'],
})
export class EmbeddedPage implements AfterViewInit, OnDestroy{
    videoList:Array<string>;
    itemId:Array<string>;
    apiTimeout: any = 0;
    playTimeout: any = 0;
    muteTimeout: any = 0;
    private _results: Array<any> = [];
    private _videoPlayer: any = null;
    private _vpPlatform: string = "web";
  
    constructor() { 
        console.log('Constructor EmbeddedPage')
    }

    async ngAfterViewInit() {
        this.videoList = videoFrom === "http" ? httpVideos : null;
        const player:any = await setVideoPlayer();
        this._videoPlayer = player.plugin;
        this._vpPlatform = player.platform;
        console.log('ngAfterViewInit() EmbeddedPage player.platform ',player.platform)
        if (videoFrom === "assets") {
            if (this._vpPlatform === "ios") {
                this.videoList = getAssetsVideoPathes("ios",assetsVideos );
            } else if(this._vpPlatform === "android") {
                this.videoList = getAssetsVideoPathes("android",assetsVideos );
            } else {
                this.videoList = getAssetsVideoPathes("web",assetsVideos );
            }
        }   
        console.log('ngAfterViewInit() EmbeddedPage this.videoList ',this.videoList)
        document.addEventListener('jeepCapVideoPlayerPlay', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail)}, false);
        document.addEventListener('jeepCapVideoPlayerPause', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail)}, false);
        document.addEventListener('jeepCapVideoPlayerEnded', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail)}, false);
     
        this.itemId = getVideoNames(this.videoList);
        const listEl:HTMLIonListElement = document.querySelector("#videos-list");
        for( let i:number = 0; i< this.itemId.length; i++) {
            const itemEl:HTMLIonItemElement = document.createElement('ion-item');
            const divEl: HTMLDivElement = document.createElement("div");
            divEl.setAttribute('id',this.itemId[i]);
            itemEl.style.setProperty("--inner-padding-top","10px")
            itemEl.style.setProperty("--inner-padding-bottom","10px")
            itemEl.appendChild(divEl);
            listEl.appendChild(itemEl);
            const res:any  = await this._videoPlayer.initPlayer(
                {mode:"embedded",url:this.videoList[i],
                playerId:this.itemId[i],width:480,height:270
            });
            this._results = [...this._results,res];
        }
    
        // Tests the API
        const play = await this._videoPlayer.play({playerId:"bigbuckbunny720psurround"});
        console.log('const play ', play);
        this.apiTimeout = setTimeout(async () => {
            if(this._videoPlayer) {
                const pause = await this._videoPlayer.pause({playerId:"bigbuckbunny720psurround"});
                console.log('const pause ', pause);
                const volume = await this._videoPlayer.getVolume({playerId:"bigbuckbunny720psurround"});
                console.log('const volume ', volume);
                const setVolume = await this._videoPlayer.setVolume({playerId:"bigbuckbunny720psurround",volume:.75});
                console.log('const setVolume ', setVolume);
                const volume1 = await this._videoPlayer.getVolume({playerId:"bigbuckbunny720psurround"});
                console.log('const volume1 ', volume1);
                const currentTime = await this._videoPlayer.getCurrentTime({playerId:"bigbuckbunny720psurround"});
                console.log('const currentTime ', currentTime);
                const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"bigbuckbunny720psurround",seektime:420});
                console.log('const setCurrentTime ', setCurrentTime);
                const currentTime1 = await this._videoPlayer.getCurrentTime({playerId:"bigbuckbunny720psurround"});
                console.log('const currentTime1 ', currentTime1);
                const setMuted = await this._videoPlayer.setMuted({playerId:"bigbuckbunny720psurround",muted:true});
                console.log('const setMuted ', setMuted);
                const muted = await this._videoPlayer.getMuted({playerId:"bigbuckbunny720psurround"});
                console.log('const muted ', muted);
                this.playTimeout = setTimeout(async () => {
                    if(this._videoPlayer) {
                        const play = await this._videoPlayer.play({playerId:"bigbuckbunny720psurround"});
                        console.log('const play ', play);
                        this.muteTimeout = setTimeout(async () => {
                            if(this._videoPlayer) {
                                const setMuted = await this._videoPlayer.setMuted({playerId:"bigbuckbunny720psurround",muted:false});
                                console.log('const setMuted 1 ', setMuted);
                                const muted = await this._videoPlayer.getMuted({playerId:"bigbuckbunny720psurround"});
                                console.log('const muted 1 ', muted);
                            }
                        }, 10000);
                    }
                },10000);
            }
        },50000);
    }

    async ngOnDestroy() {
        if(this._videoPlayer !== null) {
            if( this.apiTimeout ) clearTimeout(this.apiTimeout);
            if( this.playTimeout ) clearTimeout(this.playTimeout);
            if( this.muteTimeout ) clearTimeout(this.muteTimeout);
            for (let i:number = 0; i < this.itemId.length; i++) {
                console.log('in Destroy PlayerId ', this.itemId[i])
                const pause = await this._videoPlayer.pause({playerId:this.itemId[i]});
            }
            this._videoPlayer = null;;    
        }
     
    }
}
