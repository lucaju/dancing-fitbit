import visMustache from './vis.html';
// import scaleRadial from './d3-scale-radial';
// import {extent,sum} from 'd3-array/dist/d3-array.min';
// import {nest} from 'd3-collection/dist/d3-collection.min';
// import {easeLinear} from 'd3-ease/dist/d3-ease.min';
// import {scaleTime, scaleLinear} from 'd3-scale/dist/d3-scale.min';
// import {select,selection,selectAll} from 'd3-selection/dist/d3-selection.min';
// import {arc,lineRadial,curveMonotoneX,curveBasis} from 'd3-shape/dist/d3-shape.min';
// import {timeFormat,timeParse} from 'd3-time-format/dist/d3-time-format.min';

// import {transition} from 'd3-transition';
// require('d3-transition/dist/d3-transition.min');

import * as d3 from 'd3';
// import { throws } from 'assert';

import YTPlayer from 'yt-player';

import ModuleHeart from './heartRate';
import Calories from './calories';
import FootSteps from './footsteps';
import Distance from './distance';

export default function Vis(app) {

	this.app = app;

	this.svg;

	this.distance = new Distance(this);
	this.footSteps = new FootSteps(this);
	this.calories = new Calories(this);
	this.heart = new ModuleHeart(this);

	this.initialDay = 10; //min 10: 
	this.lastDay = 16; // max 20 //16
	this.day = this.initialDay;

	this.gooeyOn = false;
	this.animationParameters = [];
	
	const margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	};

	const width = window.innerWidth - margin.left - margin.right - 105 - 40;
	const height = window.innerHeight - margin.top - margin.bottom - 20;

	let svgDefs;

	

	this.init = function init() {

		// data
		const pageData = {
			title: '',
		};

		// buid page
		const html = visMustache(pageData);
		d3.select('#app').append('div').attr('id', 'visualization');
		d3.select('#visualization').html(html);

		this.setup();

		this.setDay(this.day);

		this.addVideo();

	};

	this.setDay = function setDay(day) {
		this.day = day;

		if (this.day <= this.lastDay) {

			this.calculateSleepMetrics();

			this.distance.addDay(this.day);
			this.footSteps.addDay(this.day);
			this.heart.addDay(this.day);
			this.calories.addDay(this.day);
		}
	};

	this.calculateSleepMetrics = function calculateSleepMetrics() {

		//data
		let data = this.app.getMetricByDay(this.day).sleep;
		let mainSleep;

		let parameter = {};
		parameter.day = this.day;

		//direction and main sleep
		if (data.length > 1) {
			parameter.direction = 1;

			for (const s of data) {
				if (s.isMainSleep == true) {
					mainSleep = s;
					break;
				}
			}

		} else {
			parameter.direction = -1;
			mainSleep = data[0];
		}

		//angle
		if (data.length == 0) {
			parameter.direction = -1;
			parameter.angle = this.getAnimationParametersByDay(this.day - 1).angle;
			parameter.duration = this.getAnimationParametersByDay(this.day - 1).duration;
			parameter.angleDuration = this.getAnimationParametersByDay(this.day - 1).angleDuration;
		} else {
			parameter.angle = mainSleep.minutesAwake * parameter.direction * 1.5;

			//duration
			parameter.duration = mainSleep.minutesAsleep;
			parameter.angleDuration = mainSleep.timeInBed;

			//velocity
			parameter.duration = parameter.duration * 40;
			parameter.angleDuration = parameter.angleDuration * 42;
		}


		this.animationParameters.push(parameter);
	};

	this.getAnimationParametersByDay = function getAnimationParametersByDay(day) {
		const ap = this.animationParameters.find(m => m.day == day);
		return ap;
	};

	this.setup = function setup() {

		this.svg = d3.select('#vis').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);


		svgDefs = this.svg.append('defs');

		this.svg = this.svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		svgDefs
			.append('clipPath')
			// .append('mask')
			.attr('id', 'distanceClip')
			// .append('circle')
			// .attr('cx','50%')
			// .attr('cy','50%') 
			// .attr('r',850)
			// .attr('stroke','black')
			// .attr('stroke-width','30')
			// .attr('fill','none')

			.append('path')
			.attr('d', 'M225,0C100.74,0,0,100.74,0,225S100.74,450,225,450,450,349.26,450,225,349.26,0,225,0Zm0,375A150,150,0,1,1,375,225,150,150,0,0,1,225,375Z')
			.attr('transform', 'translate(-450, -450) scale(2,2)');


		this.distance.setup();
		this.footSteps.setup();
		this.calories.setup();
		this.heart.setup();

	};

	this.applyGooeyFX = function applapplyGooeyFXyFX() {

		this.gooeyOn = !this.gooeyOn;
		this.gooeyFX();

		if (this.gooeyOn) {
			d3.select('#button-gooey').style('opacity', 1);
		} else {
			d3.select('#button-gooey').style('opacity', .5);
		}
	};


	this.gooeyFX = function gooeyFX() {

		let source = this.svg;

		if (this.gooeyOn) {

			source.style('filter', 'url(#gooey)'); //Set the filter on the container svg

			// let defs = svg.append('defs');
			let filter = svgDefs.append('filter').attr('id', 'gooey');

			filter.append('feGaussianBlur')
				.attr('in', 'SourceGraphic')
				.attr('stdDeviation', '3')
				.attr('color-interpolation-filters', 'sRGB')
				.attr('result', 'blur');
			filter.append('feColorMatrix')
				.attr('in', 'blur')
				.attr('mode', 'matrix')
				.attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7')
				.attr('result', 'gooey');

		} else {
			//remove FX
			// source.select('defs').remove();
			source.style('filter', null);

		}
	};



	this.fadeOut = function fadeOut(source) {
		const s = d3.select(source);
		const d = this.getAnimationParametersByDay(s.attr('day')).angleDuration / 3;

		s.transition()
			.duration(d)
			.style('opacity', 0.1);

	};

	this.hideMetric = function hideVis(visName) {

		const s = d3.select(`#${visName}`);

		if (s.style('display') == 'inline') {

			s.transition()
				.duration(500)
				.style('opacity', 0)
				.on('end', function () {
					d3.select(this).style('display', 'none');
				});

			d3.select(`#button-${visName}`).style('opacity', .5);

		} else {

			s.transition()
				.duration(500)
				.style('opacity', 1)
				.on('start', function () {
					d3.select(this).style('display', 'inline');
				});

			d3.select(`#button-${visName}`).style('opacity', 1);

		}

	};

	this.addVideo = function () {
		const player = new YTPlayer('#player',{
			controls: false,
			keyboard: false,
			related: false,
			info: false,
			modestBranding: true,
			annotations: false
		});

		// player.load('5m7n1SizP3E');
		player.load('E-4gJG3d6Ls');
		player.seek(180);
		player.setVolume(10);
		// player.autoplay(true);
		player.play();
		player.seek('180');


		player.on('playing', () => {
			console.log(player.getDuration()); // => 351.521
		});

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

}