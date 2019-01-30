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


export default function Vis(app) {

	this.app = app;
	this.vis;

	this.parseTime = d3.timeParse('%H:%M:%S');
	this.formatHour = d3.timeFormat('%H');
	this.fullCircle = 2 * Math.PI;

	this.initialDay = 10; //min 10: 
	this.lastDay = 16; // max 20 //16
	this.day = this.initialDay;

	this.gooeyOn = false;

	const margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	};

	const width = window.innerWidth - margin.left - margin.right - 105 - 40;
	const height = window.innerHeight - margin.top - margin.bottom - 20;

	let svg;
	let svgDefs;
	let moduleDate;
	let moduleHeart;
	let moduleCalories;
	let moduleSteps;
	let moduleDistance;

	this.animationParameters = [];

	this.init = function init() {

		// data
		const pageData = {
			title: 'Hello',
		};

		// buid page
		const html = visMustache(pageData);
		d3.select('#app').append('div').attr('id', 'visualization');
		d3.select('#visualization').html(html);

		this.setup();

		this.setDay(this.day);

		// this.initiateVideo();
		this.addVideo();

	};

	this.setDay = function setDay(day) {
		this.day = day;

		if (this.day <= this.lastDay) {

			this.calculateSleepMetrics();

			this.distanceVis();
			this.stepsVis();
			this.caloriesVis();
			this.heartVis();
			this.drawDate();
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

		svg = d3.select('#vis').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);


		svgDefs = svg.append('defs');

		svg = svg.append('g')
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


		// // .attr('d','M-300,0a300,300 0 1,0 600,0a300,300 0 1,0 -600,0 -450,0a450,450 0 1,0 900,0a450,450 0 1,0 -900,0')
		// .attr('id','donutPath')
		// .attr('stroke','red')
		// .attr('stroke-width','1')
		// .attr('fill','red')
		// .attr('fill-rule','red')

		// .attr('d','M 150.00000000000003 -300 A 450 450 0 1 1 149.21460223534572 -299.99931461097947 M 150.00000000000003 -150 A 300 300 0 1 1 149.47640149023047 -149.99954307398633');
		// .attr('d','M-450,0a450,450 0 1,0 900,0a450,450 0 1,0 -900,0 -300,0a300,300 0 1,0 600,0a300,300 0 1,0 -600,0')
		// .append('path')
		// .attr('d','M-300,0a300,300 0 1,0 600,0a300,300 0 1,0 -600,0');


		// .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		moduleDistance = svg.append('g')
			.attr('id', 'distance')
			// .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
			.attr('clip-path', 'url(#distanceClip)');
		// .attr('mask','url(#distanceClip)');

		// moduleDistance.append('path')
		// 	// .attr('d','M-300,0a300,300 0 1,0 600,0a300,300 0 1,0 -600,0 -450,0a450,450 0 1,0 900,0a450,450 0 1,0 -900,0')
		// 	.attr('id','donutPath')
		// 	.attr('stroke','red')
		// 	.attr('stroke-width','1')
		// 	.attr('fill','red')
		// 	.attr('fill-rule','evenodd')
		// 	.attr('d','M 150.00000000000003 -300 A 450 450 0 1 1 149.21460223534572 -299.99931461097947 M 150.00000000000003 -150 A 300 300 0 1 1 149.47640149023047 -149.99954307398633');



		moduleSteps = svg.append('g')
			.attr('id', 'steps');
		// .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		moduleCalories = svg.append('g')
			.attr('id', 'calories');
		// .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		moduleHeart = svg.append('g')
			.attr('id', 'heart');
		// .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


		// this.gooeyFX(moduleDistance,true);
		// this.gooeyFX(moduleSteps,true);
		// this.gooeyFX(moduleCalories,true);
		// this.gooeyFX(moduleHeart,true);

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

		let source = svg;

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

	this.distanceVis = function distanceVis() {

		const _this = this;

		//proxy functions
		const parseTime = this.parseTime;
		// const formatHour = this.formatHour;
		// const parseHour = d3.timeParse('%H');

		//radius
		const innerRadius = 300;
		const outerRadius = 450;

		//data
		let data = this.app.getMetricByDay(this.day).distance;
		data.map(function (d) {
			//save hour
			d.hour = d.time.split(':');
			d.hour = d.hour[0];

			d.time = parseTime(d.time);
		});

		// calcualte aggregate data
		const aggregatedData = d3.nest()
			.key(function (d) {
				return d.hour;
			})
			.rollup(function (v) {
				v.valueD = d3.sum(v, function (d) {
					return d.value;
				});
				return v.valueD;
			})
			.entries(data);


		//X Acis
		let x = d3.scaleTime()
			.range([0, this.fullCircle])
			.domain(d3.extent(aggregatedData, function (d) {
				return d.key;
			}));

		//Y axis
		let y = this.scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(d3.extent(aggregatedData, function (d) {
				return d.value;
			}));

		//Main module
		// moduleDistance = svg.append('g')
		// 	.attr('id','distance')
		// 	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		//Inner module
		let moduleDistanceInner = moduleDistance.append('g')
			.attr('id', `day${this.day}`)
			.attr('day', this.day);

		//Line Graph
		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.key);
			})
			.radius(function (d) {
				return y(d.value);
			})
			.curve(d3.curveBasisClosed); //Slight rounding without too much deviation

		//Graph
		let linePlot = moduleDistanceInner
			.append('clipPath') // define a clip path
			.attr('id', 'areaPlot') // give the clipPath an ID
			.append('path')
			.attr('id', 'vis')
			.datum(aggregatedData)
			.attr('fill', '#e6550d')
			.attr('stroke', '#cc8d35')
			.attr('stroke-width', '1px')
			.attr('d', line);

		// helper function to generate the segment as a path
		function generateSVGSegment(x, y, r, startAngle, endAngle) {

			// convert angles to Radians
			startAngle *= (Math.PI / 180);
			endAngle *= (Math.PI / 180);

			var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1; // 1 if angle > 180 degrees
			var sweepFlag = 1; // is arc to be drawn in +ve direction?

			return ['M', x, y, 'L', x + Math.sin(startAngle) * r, y - (Math.cos(startAngle) * r),
				'A', r, r, 0, largeArc, sweepFlag, x + Math.sin(endAngle) * r, y - (Math.cos(endAngle) * r), 'Z'
			].join(' ');
		}

		// our custom interpolator, which returns an interpolator function
		// which when called with a time (0-1), generates a segment sized according to time
		function interpolateSVGSegment(x, y, r, startAngle, endAngle) {
			return function (t) {
				return generateSVGSegment(x, y, r, startAngle, startAngle + ((endAngle - startAngle) * t));
			};
		}

		//mask
		let mask = moduleDistanceInner.append('path')
			.attr('id', 'mask')
			.attr('fill', '#e6550d')
			.attr('clip-path', 'url(#areaPlot)');

		// we're ready to kick it off
		mask.transition().duration(this.getAnimationParametersByDay(this.day).duration)
			.attrTween('d', function () {
				return interpolateSVGSegment(0, 0, outerRadius, 0, 359.99);
			});

		// inner module rotation
		let angle = this.getAnimationParametersByDay(this.day).angle;

		if (this.day > 10) {
			moduleDistanceInner.attr('transform', `rotate(${this.getAnimationParametersByDay(this.day-1).angle})`);
			angle = this.getAnimationParametersByDay(this.day - 1).angle + this.getAnimationParametersByDay(this.day).angle;
		}

		moduleDistanceInner
			.transition()
			.duration(this.getAnimationParametersByDay(this.day).angleDuration)
			.delay(4500)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.fadeOut(this);
			});

		//Axis
		let yAxis = moduleDistance.append('g');

		// yAxis.append('circle')
		// 	.attr('fill', '#ffffff')
		// 	.attr('stroke', 'none')
		// 	.attr('r', function () {
		// 		return y(y.domain()[0]);
		// 	});
	};

	this.stepsVis = function caloriesVis() {

		const _this = this;

		//proxy functions	
		const parseTime = this.parseTime;
		// const formatHour = this.formatHour;

		//radius
		const innerRadius = 200;
		const outerRadius = 300;

		//daa
		let data = this.app.getMetricByDay(this.day).steps;
		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		//X axis
		let x = d3.scaleTime()
			.range([0, this.fullCircle])
			.domain(d3.extent(data, function (d) {
				return d.time;
			}));

		//Y Axis
		let y = this.scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(d3.extent(data, function (d) {
				return d.value;
			}));

		//main module
		// moduleSteps = svg.append('g')
		// 	.attr('id','steps')
		// 	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		//Inner Module
		let moduleStepsInner = moduleSteps.append('g')
			.attr('id', `day${this.day}`)
			.attr('day', this.day);


		//Scater graph
		let scaterSteps = moduleStepsInner.selectAll('circle')
			.data(data);

		scaterSteps.enter().append('circle')
			.attr('r', 2)
			// .style('fill', '#231f20')
			.style('fill', '#cecece')
			.style('opacity', 0)
			.transition()
			.duration(100)
			.ease(d3.easeLinear)
			.delay(function (d, i) {
				return i * (_this.getAnimationParametersByDay(_this.day).duration / data.length);
			})
			.attr('transform', function (d) {
				return 'rotate(' + ((x(d.time)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)';
			})
			.style('opacity', function (d) {
				if (d.value == 0) {
					return 0;
				} else {
					return 1;
				}
			});

		// inner module rotation
		let angle = this.getAnimationParametersByDay(this.day).angle;

		if (this.day > 10) {
			moduleStepsInner.attr('transform', `rotate(${this.getAnimationParametersByDay(this.day-1).angle})`);
			angle = this.getAnimationParametersByDay(this.day - 1).angle + this.getAnimationParametersByDay(this.day).angle;
		}

		//Inner module rotations
		moduleStepsInner
			.transition()
			.duration(this.getAnimationParametersByDay(this.day).angleDuration)
			.delay(3000)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.fadeOut(this);
			});


		// Axis
		// let yAxis = moduleSteps.append('g');

		// yAxis.append('circle')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'black')
		// 	.attr('opacity', 0.05)
		// 	.attr('r', function () {
		// 		return y(y.domain()[0]);
		// 	});

	};

	this.caloriesVis = function caloriesVis() {

		const _this = this;

		//proxy funtions to this
		const parseTime = this.parseTime;
		// const formatHour = this.formatHour;

		//radius
		const innerRadius = 125;
		const outerRadius = 200;

		//data
		let data = this.app.getMetricByDay(this.day).calories;
		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		//X Axis
		let x = d3.scaleTime()
			.range([0, this.fullCircle])
			.domain(d3.extent(data, function (d) {
				return d.time;
			}));

		//Y Axis
		let y = this.scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(d3.extent(data, function (d) {
				return d.value;
			}));

		//main module
		// moduleCalories = svg.append('g')
		// 	.attr('id','calories')
		// 	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// Inner module
		let moduleCaloriesInner = moduleCalories.append('g')
			.attr('id', `day${this.day}`)
			.attr('day', this.day);

		//Line graph
		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			})
			.curve(d3.curveStep); //Slight rounding without too much deviation

		//graph
		let segments = moduleCaloriesInner.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', '#92278f')
			.attr('d', line);

		// inner module rotation
		let angle = this.getAnimationParametersByDay(this.day).angle;

		if (this.day > 10) {
			moduleCaloriesInner.attr('transform', `rotate(${this.getAnimationParametersByDay(this.day-1).angle})`);
			angle = this.getAnimationParametersByDay(this.day - 1).angle + this.getAnimationParametersByDay(this.day).angle;
		}

		//inner module rotation
		moduleCaloriesInner.transition()
			.duration(this.getAnimationParametersByDay(this.day).angleDuration)
			.delay(1500)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.fadeOut(this);
			});

		//axis
		// let yAxis = moduleCalories.append('g');

		// yAxis.append('circle')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'black')
		// 	.attr('opacity', 0.05)
		// 	.attr('r', function () {
		// 		return y(y.domain()[0]);
		// 	});

		// graph anomation
		let lineLength = segments.node().getTotalLength();

		segments.attr('stroke-dasharray', lineLength + ' ' + lineLength)
			.attr('stroke-dashoffset', +lineLength)
			.transition()
			.duration(this.getAnimationParametersByDay(this.day).duration)
			.ease(d3.easeLinear)
			.attr('stroke-dashoffset', 0);

	};

	this.heartVis = function heartVis() {

		const _this = this;

		//proxy function to this
		const parseTime = this.parseTime;
		// const formatHour = this.formatHour;

		//radius
		const innerRadius = 75;
		const outerRadius = 125;

		//data
		let data = this.app.getMetricByDay(this.day).heart;

		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		//X axis
		let x = d3.scaleTime()
			.range([0, this.fullCircle])
			.domain(d3.extent(data, function (d) {
				return d.time;
			}));

		//Y axis
		let y = this.scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(d3.extent(data, function (d) {
				return d.value;
			}));

		//Main module
		// moduleHeart = svg.append('g')
		// 	.attr('id','heart')
		// 	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		//Inned module
		let moduleHeartInner = moduleHeart.append('g')
			.attr('id', `day${this.day}`)
			.attr('day', this.day);

		//Line graph
		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			});

		//graph
		let linePlot = moduleHeartInner.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', '#ed1c24')
			// .attr('stroke', '#e6550d')
			.attr('d', line);

		// inner module rotation
		let angle = this.getAnimationParametersByDay(this.day).angle;

		if (this.day > 10) {
			moduleHeartInner.attr('transform', `rotate(${this.getAnimationParametersByDay(this.day-1).angle})`);
			angle = this.getAnimationParametersByDay(this.day - 1).angle + this.getAnimationParametersByDay(this.day).angle;
		}

		moduleHeartInner.transition()
			.duration(this.getAnimationParametersByDay(this.day).angleDuration)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.fadeOut(this);
			});

		//axis
		// let yAxis = moduleHeart.append('g');

		// yAxis.append('circle')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'black')
		// 	.attr('opacity', 0.05)
		// 	.attr('r', function () {
		// 		return y(y.domain()[0]);
		// 	});

		//graph animation
		let lineLength = linePlot.node().getTotalLength();
		linePlot
			.attr('stroke-dasharray', lineLength + ' ' + lineLength)
			.attr('stroke-dashoffset', +lineLength)
			.transition()
			.duration(this.getAnimationParametersByDay(this.day).duration)
			.ease(d3.easeLinear)
			.attr('stroke-dashoffset', 0);


	};

	this.fadeOut = function fadeOut(source) {
		const s = d3.select(source);
		const d = this.getAnimationParametersByDay(s.attr('day')).angleDuration / 3;

		s.transition()
			.duration(d)
			.style('opacity', 0.1);

	};

	let dateText;

	this.drawDate = function drawDate() {

		const _this = this;

		//data
		let data = this.app.getMetricByDay(this.day);

		if (this.day == 10) {
			moduleDate = svg.append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

			dateText = moduleDate.append('text')
				.attr('dy', '0.2em')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0.6);
		}

		dateText.text(`${data.month} ${data.day}`)
			.transition()
			.duration(this.getAnimationParametersByDay(this.day).duration)
			.on('end', function () {
				_this.setDay(_this.day + 1);
			});
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

	this.square = function square(x) {
		return x * x;
	};

	this.scaleRadial = function scaleRadial() {

		let linear = d3.scaleLinear();

		var sq = this.square;

		function scale(x) {
			return Math.sqrt(linear(x));
		}

		scale.domain = function (_) {
			return arguments.length ? (linear.domain(_), scale) : linear.domain();
		};

		scale.nice = function (count) {
			return (linear.nice(count), scale);
		};

		scale.range = function (_) {
			return arguments.length ? (linear.range(_.map(sq)), scale) : linear.range().map(Math.sqrt);
		};

		scale.ticks = linear.ticks;
		scale.tickFormat = linear.tickFormat;

		return scale;
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
	}















	// var video,
	// 	videoSource,
	// 	play;

	// var currentVideo = "matchpoint.mp4";

	//---- INITIATE
	// this.initiateVideo = function initiateVideo() {

	// 	// 2. This code loads the IFrame Player API code asynchronously.
	// 	var tag = document.createElement('script');

	// 	tag.src = 'https://www.youtube.com/iframe_api';
	// 	var firstScriptTag = document.getElementsByTagName('script')[0];
	// 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 	console.log('opa')

	// };

	// this.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
	// 	player = new YT.Player('player', {
	// 		// height: '390',
	// 		// width: '640',
	// 		videoId: 'FeSCXQ5DaTM',
	// 		playerVars: {
	// 			autoplay: 0, //Auto play
	// 			//cc_load_policy: 0,        //Close Captiuon
	// 			// disablekb: 1,            //Keyboard Control
	// 			enablejsapi: 1, //API Control
	// 			fs: 0, //Full Screen
	// 			iv_load_policy: 3, //Annotation
	// 			loop: 1, //loop
	// 			rel: 0, //List of related videos in the end
	// 			modestbranding: 1, //detail
	// 			showinfo: 0, //Video info
	// 			start: 0 //Starting point in (s). We acna also define where it should end (using the 'end' parameter)

	// 		},
	// 		events: {
	// 			'onReady': onPlayerReady,
	// 			// 'onStateChange': onPlayerStateChange
	// 		}
	// 	});
	// }

	// this.onPlayerReady = function onPlayerReady(event) {
	// 	event.target.playVideo();
	// }



}