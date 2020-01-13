export const httpVideos: Array<string> = [
    "https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Bike720.mp4",
    "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    "https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Bubbles720.mp4",
    "https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Fireworks720.mp4",
    "https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Hurricane720.mp4",
    "https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Stream720.mp4",
    "https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Waterfall720.mp4",
]
export const assetsVideos: Array<string> = [
    "video.mp4"
]

export const getVideoNames = (videoURL:Array<string>): Array<string> => {
    var names:Array<string> = [];
    for(let i: number =0; i< videoURL.length;i++) {
        let parts: Array<string> = videoURL[i].split('/');
        let lastSegment:string  = parts.pop();
        parts = lastSegment.split('.');
        names.push(parts[0].replace(/\_/g,''));
    }
    return names;
}

export const getAssetsVideoPathes = (type: string ,videoList: Array<string>): Array<string> => {
    var assetList: Array<string> = []
    if(type === "ios") {
        let path:string = "public/assets/video/";
        for(let i: number =0; i< videoList.length;i++) {
            assetList = [...assetList,path + videoList[i]];
        }
    } else if (type === "android") {
        let path:string = "raw/";
        for(let i: number =0; i< videoList.length;i++) {
            let parts = videoList[i].split('.');
            assetList = [...assetList,path+parts[0]];
        }
    } else {
        let path:string = "assets/video/"
        for(let i: number =0; i< videoList.length;i++) {
            assetList = [...assetList,path + videoList[i]];
        }
    }
    return assetList;
}