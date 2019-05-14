import {dispatch,select} from 'd3/dist/d3.min';
import Parallax from 'parallax-js/dist/parallax.min';

import metrics from '../metrics';

import heart from './heartRate';
import calories from './calories';
import footSteps from './footsteps';
import distance from './distance';


const event = dispatch('end');

const initialDay = 10; //min 10: 
const lastDay = 16; // max 20 //16

const margin = {
	top: 10,
	right: 10,
	bottom: 10,
	left: 10
};

let svg;
let day = initialDay;

let gooeyOn = false;
let animationParameters = [];

let width;
let height;
let svgDefs;

const render = () => {

	setup();

	setDay(day);

	select(window).on('resize', () => {
		resize();
	});

	const scene = document.getElementById('svg-inner');
	new Parallax(scene);

};

const setup = () => {

	setWindowSize();

	svg = select('#visualization').append('svg')
		.attr('id', 'svg-vis')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	const px = (width / 2) + 60;
	const py = (height / 2) - 20;


	svgDefs = svg.append('defs');

	svg = svg.append('g')
		.attr('id', 'svg-container')
		.attr('transform', 'translate(' + px + ',' + py + ')');

	svg = svg.append('g')
		.attr('id', 'svg-inner');


	svgDefs
		.append('clipPath')
		.attr('id', 'distanceClip')
		.append('path')
		.attr('d', 'M225,0C100.74,0,0,100.74,0,225S100.74,450,225,450,450,349.26,450,225,349.26,0,225,0Zm0,375A150,150,0,1,1,375,225,150,150,0,0,1,225,375Z')
		.attr('transform', 'translate(-450, -450) scale(2,2)');


	distance.setup(svg);
	distance.event.on('end', element => {
		fadeOut(element);
		changeDay(day+1);
	});

	footSteps.setup(svg);
	footSteps.event.on('end', element => {
		fadeOut(element);
	});

	calories.setup(svg);
	calories.event.on('end', element => {
		fadeOut(element);
	});

	heart.setup(svg);
	heart.event.on('end', element => {
		fadeOut(element);
	});

};

const setWindowSize = () => {
	width = window.innerWidth - margin.left - margin.right; // - 40;
	height = window.innerHeight - margin.top - margin.bottom; // - 20;
};

const resize = () => {
	setWindowSize();

	select('#svg-vis').attr('width', width + margin.left + margin.right);
	select('#svg-vis').attr('height', height + margin.top + margin.bottom);

	const px = (width / 2) + 60;
	const py = (height / 2) - 20;

	select('#svg-container').attr('transform', 'translate(' + px + ',' + py + ')');
};

const setDay = _day => {
	day = _day;

	if (day <= lastDay) {

		calculateSleepMetrics();

		const dayMetric = getMetricByDay(day);
		const animationParams = getAnimationParametersByDay(day);

		distance.addDay(
			day,
			dayMetric.distance,
			animationParams);

		footSteps.addDay(
			day,
			dayMetric.steps,
			animationParams);

		calories.addDay(
			day,
			dayMetric.calories,
			animationParams);

		heart.addDay(
			day,
			dayMetric.heart,
			animationParams);
	}
};

const calculateSleepMetrics = () => {

	//data
	let data = getMetricByDay(day).sleep;
	let mainSleep;

	let parameter = {};
	parameter.day = day;

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
		parameter.angle = getAnimationParametersByDay(day - 1).angle;
		parameter.duration = getAnimationParametersByDay(day - 1).duration;
		parameter.angleDuration = getAnimationParametersByDay(day - 1).angleDuration;
	} else {
		parameter.angle = mainSleep.minutesAwake * parameter.direction * 1.5;

		//duration
		parameter.duration = mainSleep.minutesAsleep;
		parameter.angleDuration = mainSleep.timeInBed;

		//velocity
		parameter.duration = parameter.duration * 102; //40;
		parameter.angleDuration = parameter.angleDuration * 105; //42;
	}


	animationParameters.push(parameter);
};

const getAnimationParametersByDay = day => {
	const ap = animationParameters.find(m => m.day == day);
	return ap;
};

const applyGooeyFX = () => {
	gooeyOn = !gooeyOn;
	gooeyFX();
};

const gooeyFX = () => {

	let source = svg;

	if (gooeyOn) {

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

const fadeOut = source => {
	const s = select(source);
	const d = getAnimationParametersByDay(s.attr('day')).angleDuration / 3;
	s.transition()
		.duration(d)
		.style('opacity', 0.1)
		.on('end', () => {
			if (day > lastDay) event.call('end');
		});

};

const changeDay = newDay => {
	if (day != newDay) setDay(newDay);
};

const getMetricByDay = day => {
	const metric = metrics.find(m => m.day == day);
	return metric;
};

const hideMetric = visName => {

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

const restart = () => {
	day = initialDay;
	gooeyOn = false;
	animationParameters = [];

	select('#visualization').selectAll('*').interrupt();
	select('#visualization').html('');

	render();
};


export default {
	render,
	event,
	hideMetric,
	applyGooeyFX,
	restart
};