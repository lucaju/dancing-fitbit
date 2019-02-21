import {select} from 'd3/dist/d3.min';
import Parallax from 'parallax-js/dist/parallax.min';

import ModuleHeart from './heartRate';
import Calories from './calories';
import FootSteps from './footsteps';
import Distance from './distance';

export default function Vis(dancing) {

	this.dancing = dancing;
	this.app = dancing.app;

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

	let width;
	let height;
	let svgDefs;

	this.init = function init() {

		const _this = this;

		this.setup();

		this.setDay(this.day);

		select(window).on('resize', function() {
			_this.resize();
		});

		const scene = document.getElementById('svg-inner');
		const parallaxInstance = new Parallax(scene);

	};

	this.setup = function setup() {

		this.setWindowSize();

		this.svg = select('#visualization').append('svg')
			.attr('id','svg-vis')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);

		const px = (width / 2) + 60;
		const py = (height / 2) - 20;


		svgDefs = this.svg.append('defs');

		this.svg = this.svg.append('g')
			.attr('id','svg-container')
			.attr('transform', 'translate(' + px + ',' + py + ')');

		this.svg = this.svg.append('g')
			.attr('id','svg-inner');
			

		svgDefs
			.append('clipPath')
			.attr('id', 'distanceClip')
			.append('path')
			.attr('d', 'M225,0C100.74,0,0,100.74,0,225S100.74,450,225,450,450,349.26,450,225,349.26,0,225,0Zm0,375A150,150,0,1,1,375,225,150,150,0,0,1,225,375Z')
			.attr('transform', 'translate(-450, -450) scale(2,2)');


		this.distance.setup();
		this.footSteps.setup();
		this.calories.setup();
		this.heart.setup();

	};

	this.setWindowSize = function setWindowSize() {
		width = window.innerWidth - margin.left - margin.right;// - 40;
		height = window.innerHeight - margin.top - margin.bottom;// - 20;
	};

	this.resize = function resize() {
		this.setWindowSize();

		select('#svg-vis').attr('width', width + margin.left + margin.right);
		select('#svg-vis').attr('height', height + margin.top + margin.bottom);

		const px = (width / 2) + 60;
		const py = (height / 2) - 20;

		select('#svg-container').attr('transform', 'translate(' + px + ',' + py + ')');
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
		let data = this.dancing.getMetricByDay(this.day).sleep;
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
			parameter.duration = parameter.duration * 102;//40;
			parameter.angleDuration = parameter.angleDuration * 105;//42;
		}


		this.animationParameters.push(parameter);
	};

	this.getAnimationParametersByDay = function getAnimationParametersByDay(day) {
		const ap = this.animationParameters.find(m => m.day == day);
		return ap;
	};

	this.applyGooeyFX = function applapplyGooeyFXyFX() {
		this.gooeyOn = !this.gooeyOn;
		this.gooeyFX();
	};

	this.gooeyFX = function gooeyFX() {

		let source = this.svg;

		if (this.gooeyOn) {

			source.style('filter', 'url(#gooey)'); //Set the filter on the container svg

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
			source.style('filter', null);

		}
	};

	this.fadeOut = function fadeOut(source) {
		const _this = this;
		const s = select(source);
		const d = this.getAnimationParametersByDay(s.attr('day')).angleDuration / 3;
		s.transition()
			.duration(d)
			.style('opacity', 0.1)
			.on('end', function() {
				if (_this.day > _this.lastDay) {
					_this.dancing.end();
				}
			});

	};

	this.changeDay = function changeDay(newDay) {
		if (this.day != newDay) this.setDay(newDay);
	};

	this.hideMetric = function hideVis(visName) {
		const s = select(`#${visName}`);

		if (s.style('display') == 'block') {

			s.transition()
				.duration(500)
				.style('opacity', 0)
				.on('end', function () {
					select(this).style('display', 'none');
				});

		} else {

			s.transition()
				.duration(500)
				.style('opacity', 1)
				.on('start', function () {
					select(this).style('display', 'block');
				});
		}

	};

	this.restart = function restart() {
		this.day = this.initialDay;
		this.gooeyOn = false;
		this.animationParameters = [];

		select('#visualization').selectAll('*').interrupt();
		select('#visualization').html('');

		this.distance = new Distance(this);
		this.footSteps = new FootSteps(this);
		this.calories = new Calories(this);
		this.heart = new ModuleHeart(this);

		this.init();
	};
}