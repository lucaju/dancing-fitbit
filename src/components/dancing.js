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

		this.addAudio();
		this.addVideo();

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
		if (state == 'on') {
			this.audioPlayer.volume = 1;
		} else {
			this.audioPlayer.volume = 0;
		}
	};

	this.videoFadeIn = function videoFadeIn() {
		let videoContainer = d3.select('.video-foreground');
		videoContainer
			.style('display', 'none')
			.style('opacity', 0)
			.transition()
			.delay(6000)
			.duration(3000)
			.style('display', 'inline')
			.style('opacity', 1);
	};

	this.videoFadeOut = function videFadeOut() {
		let videoContainer = d3.select('.video-foreground');
		videoContainer
			.transition()
			.duration(2000)
			.style('opacity', 0);
	};

	this.addVideo = function () {

		const _this = this;
		let videoDuration;

		this.videoFadeIn();

		const videoPlayer = new YTPlayer('#video-player',{
			controls: false,
			keyboard: false,
			related: false,
			info: false,
			modestBranding: true,
			annotations: false,
			rel: 0
		});

		videoPlayer.load('E-4gJG3d6Ls');
		videoPlayer.setVolume(0);
		videoPlayer.related = false;
		videoPlayer.info = false;
		// player.autoplay(true);
		videoPlayer.play();

		videoPlayer.on('playing', () => {
			videoDuration = videoPlayer.getDuration();
		});

		videoPlayer.on('timeupdate', () => {
			if (Math.round(videoPlayer.getCurrentTime()) == Math.round(videoDuration)-3) {
				_this.videoFadeOut();
			}
		});

	
	};

	this.videoControl = function audioControl(state) {
		const opacity = (state == 'on') ? 1 : 0;
		d3.select('#video-player').transition()
			.duration(500)
			.style('opacity', opacity);
	};
	

	
}

