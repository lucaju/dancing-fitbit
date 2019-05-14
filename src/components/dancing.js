import {dispatch,select} from 'd3/dist/d3.min';
import AudioPlayer from 'web-audio-player';
import YTPlayer from 'yt-player';

import sidebar from './sidebar';
import vis from './vis';

import dancingHBS from './dancing.hbs';


export const event = dispatch('changeview');

let audioPlayer_sine;
let audioPlayer_boat;
let videoPlayer;

export const render  = (language) => {
	const pageData = {
		restartButton: language.restartButton
	};

	select('#app').append('div').attr('id', 'dancing');
	const html = dancingHBS(pageData);
	select('#dancing').html(html);
	
	addAudios();
	addVideo();

	sidebar.render();
	sidebar.event.on('videoControl', state => {
		videoControl(state);
	});
	sidebar.event.on('audioControl', (name,state) => {
		audioControl(name,state);
	});
	sidebar.event.on('metricControl', (name) => {
		hideMetric(name);
	});
	sidebar.event.on('fxControl', (name) => {
		applyFX(name);
	});
	sidebar.event.on('restart', () => {
		restart();
	});
	sidebar.event.on('about', () => {
		audioStop();
		event.call('changeview', this, 'home');
	});


	vis.render();
	vis.event.on('end', () => {
		end();
	});
};

const hideMetric = visName => {
	vis.hideMetric(visName);
};

const applyFX = fx => {
	if (fx == 'gooey') vis.applyGooeyFX();
};

const addAudios = () =>{
	audioPlayer_sine = AudioPlayer('asset/SINEWAVE_mixdown.mp3');
	audioPlayer_sine.on('load', () => {
		audioPlayer_sine.play();
		audioPlayer_sine.node.connect(audioPlayer_sine.context.destination);
	});

	audioPlayer_boat = AudioPlayer('asset/SAILBOAT_mixdown.mp3');
	audioPlayer_boat.on('load', () => {
		audioPlayer_boat.play();
		audioPlayer_boat.node.connect(audioPlayer_boat.context.destination);
	});


};

const audioControl = (type, state) => {
	let audioPlayerType;
	if (`audioPlayer_${type}` == 'audioPlayer_sine') {
		audioPlayerType = audioPlayer_sine;
	} else if (`audioPlayer_${type}` == 'audioPlayer_boat') {
		audioPlayerType = audioPlayer_boat;
	}
	audioPlayerType.volume = state;
};

const audioStop = () => {
	audioPlayer_sine.stop();
	audioPlayer_boat.stop();
};

const videoFadeIn = () => {
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

const videoFadeOut = () => {
	let videoContainer = select('.video-foreground');
	videoContainer
		.transition()
		.duration(2000)
		.style('opacity', 0);
};

const addVideo = () => {

	let videoDuration;

	videoFadeIn();

	videoPlayer = new YTPlayer('#video-player', {
		controls: false,
		keyboard: false,
		related: false,
		info: false,
		modestBranding: true,
		annotations: false,
		rel: 0
	});

	videoPlayer.load('0O17unTq4XQ');
	videoPlayer.setVolume(0);
	videoPlayer.related = false;
	videoPlayer.info = false;
	// videoPlayer.autoplay(true);
	videoPlayer.play();

	videoPlayer.on('playing', () => {
		videoDuration = videoPlayer.getDuration();
	});

	videoPlayer.on('timeupdate', () => {
		if (Math.round(videoPlayer.getCurrentTime()) == Math.round(videoDuration) - 3) {
			videoFadeOut();
		}
	});

};

const videoControl = state => {
	const opacity = (state) ? 1 : 0;
	select('#video-player').transition()
		.duration(500)
		.style('opacity', opacity);
};

const restart = () => {
	audioStop();
	videoPlayer.pause();
	videoPlayer.seek(0);

	audioPlayer_sine.play();
	audioPlayer_boat.play();

	videoPlayer.load('0O17unTq4XQ');
	videoPlayer.play();
	videoFadeIn();

	vis.restart();
};

const end = () => {
	audioStop();

	const restartButton = select('#restart-button');
	restartButton
		.transition()
		.delay(1000)
		.duration(2000)
		.style('display', 'block')
		.style('opacity', 1);

	restartButton.on('click', function () {
		select(this)
			.transition()
			.duration(1000)
			.style('opacity', 0);

		restart();
		sidebar.restart();
	});
};

export default {
	render,
	event
};