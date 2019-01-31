import dancingMustache from './dancing.html';

import * as d3 from 'd3';
import AudioPlayer from 'web-audio-player';
import YTPlayer from 'yt-player';

import Sidebar from './sidebar';
import Vis from './vis';

export default function dancing(app) {

	this.app = app;

	let pageData = {};

	this.audioPlayer;
	this.videoPlayer;

	this.init = function init() {

		this.pageData = {};

		d3.select('#app').append('div').attr('id', 'dancing');
		const html = dancingMustache(pageData);
		d3.select('#dancing').html(html);

		this.sidebar = new Sidebar(this);
		this.sidebar.init();

		// this.addAudio();
		// this.addVideo();

		this.vis = new Vis(this);
		this.vis.init();

	};

	this.getMetricByDay = function getMetricByDay(day) {
		return this.app.getMetricByDay(day);
	};

	this.hideMetric = function hideVis(visName) {
		this.vis.hideMetric(visName);
	};

	this.applyFX = function applyFX(fx) {
		if (fx == 'gooey') {
			this.vis.applyGooeyFX();
		}
	};

	this.addAudio = function addAudio() {
		this.audioPlayer = AudioPlayer('asset/Florence_SC_livemixdown.mp3');
		this.audioPlayer.on('load', () => {
			this.audioPlayer.play();
			this.audioPlayer.node.connect(this.audioPlayer.context.destination);
		});
	};

	this.audioControl = function audioControl(state) {
		console.log(this.audioPlayer.volume)
		if (state == 'on') {
			this.audioPlayer.volume = 1;
		} else {
			this.audioPlayer.volume = 0;
		}
	};

	this.addVideo = function () {
		const videoPlayer = new YTPlayer('#video-player',{
			controls: false,
			keyboard: false,
			related: false,
			info: false,
			modestBranding: true,
			annotations: false
		});

		// player.load('5m7n1SizP3E');
		videoPlayer.load('E-4gJG3d6Ls');
		videoPlayer.setVolume(0);
		// player.autoplay(true);
		videoPlayer.play();


		// videoPlayer.on('playing', () => {
		// 	console.log(videoPlayer.getDuration()); // => 351.521
		// });

		// const player = new YTPlayer('#player', {
		// 	// height: '390',
		// 	// width: '640',
		// 	videoId: 'FeSCXQ5DaTM',
		// 	playerVars: {
		// 		autoplay: 0, //Auto play
		// 		//cc_load_policy: 0,        //Close Captiuon
		// 		// disablekb: 1,            //Keyboard Control
		// 		enablejsapi: 1, //API Control
		// 		fs: 0, //Full Screen
		// 		iv_load_policy: 3, //Annotation
		// 		loop: 1, //loop
		// 		rel: 0, //List of related videos in the end
		// 		modestbranding: 1, //detail
		// 		showinfo: 0, //Video info
		// 		start: 0 //Starting point in (s). We acna also define where it should end (using the 'end' parameter)

		// 	},
		// 	events: {
		// 		// 'onReady': onPlayerReady,
		// 		// 'onStateChange': onPlayerStateChange
		// 	}
		// });
	};

	this.videoControl = function audioControl(state) {

		let display = 'inline';
		
		if (state == 'on') {
			display = 'inline';
		} else {
			display = 'none';
		}

		d3.select('#video-player').style('display', display);
	};
	

	
}

