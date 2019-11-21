export function requestFullscreen(ele: any) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};

export function exitFullscreen () {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};



