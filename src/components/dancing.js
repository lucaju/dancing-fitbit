import {select} from 'd3/dist/d3.min';
import AudioPlayer from 'web-audio-player';
import YTPlayer from 'yt-player';

import Sidebar from './sidebar';
import Vis from './vis';

import dancingMustache from './dancing.html';

export default function dancing(app) {

	this.app = app;

	this.pageData;

	this.sidebar;
	this.audioPlayer_sine;
	this.audioPlayer_boat;
	this.videoPlayer;

	this.init = function init() {

		this.pageData = {
			restart: 'Restart'
		};

		select('#app').append('div').attr('id', 'dancing');
		const html = dancingMustache(this.pageData);
		select('#dancing').html(html);

		this.sidebar = new Sidebar(this);
		this.sidebar.init();

		this.addAudios();
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

	this.addAudios = function addAudios() {
		this.audioPlayer_sine = AudioPlayer('asset/SINEWAVE_mixdown.mp3');
		this.audioPlayer_sine.on('load', () => {
			this.audioPlayer_sine.play();
			this.audioPlayer_sine.node.connect(this.audioPlayer_sine.context.destination);
		});

		this.audioPlayer_boat = AudioPlayer('asset/SAILBOAT_mixdown.mp3');
		this.audioPlayer_boat.on('load', () => {
			this.audioPlayer_boat.play();
			this.audioPlayer_boat.node.connect(this.audioPlayer_boat.context.destination);
		});


	};

	this.audioControl = function audioControl(type,state) {
		const audioPlayerType = `audioPlayer_${type}`;
		this[audioPlayerType].volume = state;
	};

	this.audioStop = function audioStop() {
		this.audioPlayer_sine.stop();
		this.audioPlayer_boat.stop();
	};

	this.videoFadeIn = function videoFadeIn() {
		let videoContainer = select('.video-foreground');
		videoContainer
			.style('display', 'none')
			.style('opacity', 0)
			.transition()
			.delay(6000)
			.duration(3000)
			.style('display', 'block')
			.style('opacity', 1);
	};

	this.videoFadeOut = function videFadeOut() {
		let videoContainer = select('.video-foreground');
		videoContainer
			.transition()
			.duration(2000)
			.style('opacity', 0);
	};

	this.addVideo = function () {

		const _this = this;
		let videoDuration;

		this.videoFadeIn();

		this.videoPlayer = new YTPlayer('#video-player',{
			controls: false,
			keyboard: false,
			related: false,
			info: false,
			modestBranding: true,
			annotations: false,
			rel: 0
		});

		this.videoPlayer.load('0O17unTq4XQ');
		this.videoPlayer.setVolume(0);
		this.videoPlayer.related = false;
		this.videoPlayer.info = false;
		// player.autoplay(true);
		this.videoPlayer.play();

		this.videoPlayer.on('playing', () => {
			videoDuration = this.videoPlayer.getDuration();
		});

		this.videoPlayer.on('timeupdate', () => {
			if (Math.round(this.videoPlayer.getCurrentTime()) == Math.round(videoDuration)-3) {
				_this.videoFadeOut();
			}
		});
	
	};

	this.videoControl = function videoControl(state) {
		const opacity = (state) ? 1 : 0;
		select('#video-player').transition()
			.duration(500)
			.style('opacity', opacity);
	};
	
	this.restart = function restart() {
		this.audioStop();
		this.videoPlayer.pause();
		this.videoPlayer.seek(0);

		this.audioPlayer_sine.play();
		this.audioPlayer_boat.play();
		
		this.videoPlayer.load('0O17unTq4XQ');
		this.videoPlayer.play();
		this.videoFadeIn();

		this.vis.restart();
	};

	this.end = function end() {
		const _this = this;

		this.audioStop();

		const restartButton = select('#restart-button');
		restartButton
			.transition()
			.delay(1000)
			.duration(2000)
			.style('display', 'block')
			.style('opacity', 1);

		restartButton.on('click', function() {
			select(this)
				.transition()
				.duration(1000)
				.style('opacity', 0);

			_this.restart();
			_this.sidebar.restart();
		});
	};
	
}

