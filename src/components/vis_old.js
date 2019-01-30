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


export default function Vis(app) {
	this.app = app;
	this.vis;

	this.parseTime = d3.timeParse('%H:%M:%S');
	this.formatHour = d3.timeFormat('%H');
	this.fullCircle = 2 * Math.PI;


	const margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	};

	// const width = 960 - margin.left - margin.right;
	// const height = 960 - margin.top - margin.bottom;
	const width = window.innerWidth - margin.left - margin.right - 230 - 40;
	const height = window.innerHeight - margin.top - margin.bottom - 20;


	let svg;
	let moduleDate;
	let moduleHeart;
	let moduleCalories;
	let moduleSteps;
	let moduleDistance;

	let animationParameters = {};

	this.init = function init() {

		// data
		const pageData = {
			title: 'Hello',
		};

		// buid page
		const html = visMustache(pageData);
		d3.select('#app').append('div').attr('id', 'visualization');
		d3.select('#visualization').html(html);

		this.calculateSleepMetrics();

		this.setup();
		this.distanceVis();
		this.stepsVis();
		this.caloriesVis();
		this.heartVis();
		this.drawDate();
	};

	this.calculateSleepMetrics = function calculateSleepMetrics() {
		let data = this.app.getMetricByName('Sleep').data;
		console.log(data[0]);

		if (data.length > 1) {
			animationParameters.direction = 1;

			for (const s of data) {
				if (s.isMainSleep == true) {
					data = s;
					break;
				}
			}
			
		} else {
			animationParameters.direction = -1;
			data = data[0];
		}

		animationParameters.angle = data.minutesAwake * animationParameters.direction;

		animationParameters.duration = data.minutesAsleep * 100;
		animationParameters.angleDuration = data.timeInBed * 100;

		console.log(animationParameters);
	};

	this.setup = function setup() {

		svg = d3.select('#vis').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);
		// .append('g')
		// .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	};

	// this.distanceVis2 = function caloriesVis() {

	// 	const parseTime = this.parseTime;
	// 	const formatHour = this.formatHour;

	// 	let data = this.app.getMetricByName('Distance').data;
	// 	console.log(data);

	// 	const parseHour = d3.timeParse('%H');


	// 	data.map(function (d) {
	// 		//save hour
	// 		d.hour = d.time.split(':');
	// 		d.hour = d.hour[0];

	// 		d.time = parseTime(d.time);
	// 	});


	// 	const aggregatedData = d3.nest()
	// 		.key(function (d) {
	// 			return d.hour;
	// 		})
	// 		.rollup(function (v) {
	// 			v.valueD = d3.sum(v, function (d) {
	// 				return d.value;
	// 			});
	// 			return v.valueD;
	// 		})
	// 		.entries(data);

	// 	const innerRadius = 300;
	// 	// const outerRadius = Math.min(width, height) / 2 - 6;
	// 	const outerRadius = 450;

	// 	moduleDistance = svg.append('g')
	// 		.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

	// 	let x = d3.scaleTime()
	// 		.range([0, this.fullCircle]);

	// 	x.domain(d3.extent(aggregatedData, function (d) {
	// 		return d.key;
	// 	}));

	// 	let y = this.scaleRadial()
	// 		.range([innerRadius, outerRadius]);

	// 	y.domain(d3.extent(aggregatedData, function (d) {
	// 		return d.value;
	// 	}));

	// 	const area = d3.area()
	// 		.x(d => x(d.key))
	// 		.y0(y(0))
	// 		.y1(d => y(d.value));

	// 	// let line = d3.lineRadial()
	// 	// 	.angle(function (d) {
	// 	// 		return x(d.key);
	// 	// 	})
	// 	// 	.radius(function (d) {
	// 	// 		return y(d.value);
	// 	// 	})
	// 	// 	.curve(d3.curveBasis); //Slight rounding without too much deviation

	// 	let areaPlot = moduleDistance.append('path')
	// 		.datum(aggregatedData)
	// 		.attr('fill', 'steelblue')
	// 		.attr('d', area);

	// 	// let linePlot = moduleDistance.append('path')
	// 	// 	.datum(aggregatedData)
	// 	// 	.attr('fill', 'none')
	// 	// 	.attr('stroke', '#cc8d35')
	// 	// 	.attr('stroke-width', '1px')
	// 	// 	// .attr('stroke', '#e6550d')
	// 	// 	.attr('d', line);

	// 	let yAxis = moduleDistance.append('g')
	// 		.attr('text-anchor', 'middle');

	// 	let yTick = yAxis
	// 		.selectAll('g')
	// 		.data(y.ticks(1))
	// 		.enter().append('g');

	// 	// yTick.append('circle')
	// 	// 	.attr('fill', '#ffffff')
	// 	// 	.attr('stroke', 'none')
	// 	// 	.attr('opacity', 0.5)
	// 	// 	.attr('r', y);

	// 	yAxis.append('circle')
	// 		.attr('fill', '#ffffff')
	// 		.attr('stroke', 'none')
	// 		// .attr('opacity', 0.5)
	// 		.attr('r', function () {
	// 			return y(y.domain()[0]);
	// 		});

	// 	// let xAxis = moduleDistance.append('g');

	// 	// let xTick = xAxis
	// 	// 	.d3.selectAll('g')
	// 	// 	.data(x.ticks(12))
	// 	// 	.enter().append('g')
	// 	// 	.attr('text-anchor', 'middle')
	// 	// 	.attr('transform', function (d) {
	// 	// 		return 'rotate(' + ((x(d)) * 180 / Math.PI - 90) + ')translate(' + innerRadius + ',0)';
	// 	// 	});

	// 	// xTick.append('line')
	// 	// 	.attr('x2', -5)
	// 	// 	.attr('stroke', '#000');

	// 	// xTick.append('text')
	// 	// 	.attr('transform', function (d) {
	// 	// 		let angle = x(d);
	// 	// 		return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? 'rotate(90)translate(0,22)' : 'rotate(-90)translate(0, -15)';
	// 	// 	})
	// 	// 	.text(function (d) {
	// 	// 		return formatHour(d);
	// 	// 	})
	// 	// 	.style('font-size', 10)
	// 	// 	.attr('opacity', 0.6);

	// 	// let lineLength = linePlot.node().getTotalLength();

	// 	// linePlot
	// 	// 	.attr('stroke-dasharray', lineLength + ' ' + lineLength)
	// 	// 	.attr('stroke-dashoffset', +lineLength)
	// 	// 	.transition()
	// 	// 	.duration(30000)
	// 	// 	.ease(d3.easeLinear)
	// 	// 	.attr('stroke-dashoffset', 0);


	// };

	this.distanceVis = function distanceVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Distance').data;
		console.log(data);

		const parseHour = d3.timeParse('%H');


		data.map(function (d) {

			//save hour
			d.hour = d.time.split(':');
			d.hour = d.hour[0];

			d.time = parseTime(d.time);

		});


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

		const innerRadius = 300;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 450;

		moduleDistance = svg.append('g')
			.attr('id','distance')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let moduleDistanceInner = moduleDistance.append('g')
			.attr('id','inner');

		let x = d3.scaleTime()
			.range([0, this.fullCircle]);

		x.domain(d3.extent(aggregatedData, function (d) {
			return d.key;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(d3.extent(aggregatedData, function (d) {
			return d.value;
		}));

		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.key);
			})
			.radius(function (d) {
				return y(d.value);
			})
			.curve(d3.curveBasisClosed); //Slight rounding without too much deviation

		let linePlot = moduleDistanceInner
			.append('clipPath') // define a clip path
			.attr('id', 'areaPlot') // give the clipPath an ID
			.append('path')
			.attr('id','vis')
			.datum(aggregatedData)
			.attr('fill', '#e6550d')
			.attr('stroke', '#cc8d35')
			.attr('stroke-width', '1px')
			// .attr('stroke', '#e6550d')
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

		let mask = moduleDistanceInner.append('path')
			.attr('id','mask')
			.attr('fill','#e6550d')
			.attr('clip-path', 'url(#areaPlot)');

		// we're ready to kick it off
		mask.transition().duration(animationParameters.duration)
			.attrTween('d', function () {
				return interpolateSVGSegment(0, 0, outerRadius, 0, 359.99);
			});

		// let holder = moduleDistance.append('arc')
		// 	// .attr('r',outerRadius)
		// 	// .attr('y',0)
		// 	.attr('clip-path', 'url(#areaPlot)')
		// 	// .attr('fill','SteelBlue')
		// 	// .attr('height',innerRadius)
		// 	// .attr('width',outerRadius);
		// 	.transition().duration(1000)
		// 	.attrTween('d', function () {
		// 		// M x y - move cursor to x, y
		// 		// s x2 y2 x y - draw a smooth curve using control point x2, y2, to end point x, y
		// 		// (it's a lower case s so use relative coords)
		// 		return function (t) {
		// 			return 'M 50 200 s 100 ' + (t * 200 - 100) + ' 200 0';
		// 		};
		// 	});

		moduleDistanceInner
			.transition()
			.duration(animationParameters.angleDuration)
			.attr('transform', `rotate(${animationParameters.angle})`);


		let yAxis = moduleDistance.append('g')
			.attr('text-anchor', 'middle');

		let yTick = yAxis
			.selectAll('g')
			.data(y.ticks(1))
			.enter().append('g');

		// yTick.append('circle')
		// 	.attr('fill', '#ffffff')
		// 	.attr('stroke', 'none')
		// 	.attr('opacity', 0.5)
		// 	.attr('r', y);

		yAxis.append('circle')
			.attr('fill', '#ffffff')
			.attr('stroke', 'none')
			// .attr('opacity', 0.5)
			.attr('r', function () {
				return y(y.domain()[0]);
			});

		// let xAxis = moduleDistance.append('g');

		// let xTick = xAxis
		// 	.d3.selectAll('g')
		// 	.data(x.ticks(12))
		// 	.enter().append('g')
		// 	.attr('text-anchor', 'middle')
		// 	.attr('transform', function (d) {
		// 		return 'rotate(' + ((x(d)) * 180 / Math.PI - 90) + ')translate(' + innerRadius + ',0)';
		// 	});

		// xTick.append('line')
		// 	.attr('x2', -5)
		// 	.attr('stroke', '#000');

		// xTick.append('text')
		// 	.attr('transform', function (d) {
		// 		let angle = x(d);
		// 		return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? 'rotate(90)translate(0,22)' : 'rotate(-90)translate(0, -15)';
		// 	})
		// 	.text(function (d) {
		// 		return formatHour(d);
		// 	})
		// 	.style('font-size', 10)
		// 	.attr('opacity', 0.6);

		// let lineLength = linePlot.node().getTotalLength();

		// linePlot
		// 	.attr('stroke-dasharray', lineLength + ' ' + lineLength)
		// 	.attr('stroke-dashoffset', +lineLength)
		// 	.transition()
		// 	.duration(3000)
		// 	.ease(d3.easeLinear)
		// 	.attr('stroke-dashoffset', 0);

		


	};

	this.stepsVis = function caloriesVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Steps').data;
		console.log(data);

		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		const innerRadius = 200;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 300;

		moduleSteps = svg.append('g')
			.attr('id','steps')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let moduleStepsInner = moduleSteps.append('g')
			.attr('id','inner');

		let x = d3.scaleTime()
			.range([0, this.fullCircle]);

		x.domain(d3.extent(data, function (d) {
			return d.time;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(d3.extent(data, function (d) {
			return d.value;
		}));

		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			});

		let scaterSteps = moduleStepsInner.selectAll('circle')
			.data(data);

		scaterSteps.enter().append('circle')
			.attr('r', 1)
			// .attr('cx', function(d) { return x(d.value); })
			// .attr('cy', function(d) { return y(d.value); })
			// .attr('cx', function(d) {
			// 	console.log(x(d.time));
			// 	// return x(d.time);
			// 	return ((x(d.time) * 180) / Math.PI - 180);
			// })
			// .attr('cy', function(d) { return y(d.value); })
			// .attr('transform', function (d) {
			// 	return 'rotate(' + ((x(d.time)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)';
			// })
			.style('fill', '#231f20')
			// .style('opacity',function(d) {
			// 	if (d.value == 0) return 0;
			// })
			.style('opacity', 0)
			.transition()
			.duration(100)
			.ease(d3.easeLinear)
			// .attr('transform', function (d) {
			// 	return 'rotate(' + ((x(d.time*2)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)';
			// })
			// .delay(function (d, i) {
			// 	return i * 20;
			// })
			.delay(function (d, i) {
				return i * (animationParameters.duration / data.length);
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

		moduleStepsInner
			.transition()
			.duration(animationParameters.angleDuration)
			.attr('transform', `rotate(${animationParameters.angle})`);

		// scaterSteps.transition()
		// 	.duration(3000)
		// 	.ease(d3.easeLinear)
		// 	.attr('transform', function (d) {
		// 		return 'rotate(' + ((x(d.time*2)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)';
		// 	})
		// 	.attr('r', 10)
		// 	.delay(function(d,i) {
		// 		console.log(d,i);
		// 		return 0;
		// 	});

		let yAxis = moduleSteps.append('g')
			.attr('text-anchor', 'middle');

		let yTick = yAxis
			.selectAll('g')
			.data(y.ticks(1))
			.enter().append('g');

		// yTick.append('circle')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'black')
		// 	.attr('opacity', 0.05)
		// 	.attr('r', y);

		yAxis.append('circle')
			.attr('fill', 'none')
			.attr('stroke', 'black')
			.attr('opacity', 0.05)
			.attr('r', function () {
				return y(y.domain()[0]);
			});

		// let xAxis = moduleSteps.append('g');

		// let xTick = xAxis
		// 	.d3.selectAll('g')
		// 	.data(x.ticks(12))
		// 	.enter().append('g')
		// 	.attr('text-anchor', 'middle')
		// 	.attr('transform', function (d) {
		// 		return 'rotate(' + ((x(d)) * 180 / Math.PI - 90) + ')translate(' + innerRadius + ',0)';
		// 	});

		// xTick.append('line')
		// 	.attr('x2', -5)
		// 	.attr('stroke', '#000');

		// xTick.append('text')
		// 	.attr('transform', function (d) {
		// 		let angle = x(d);
		// 		return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? 'rotate(90)translate(0,22)' : 'rotate(-90)translate(0, -15)';
		// 	})
		// 	.text(function (d) {
		// 		return formatHour(d);
		// 	})
		// 	.style('font-size', 10)
		// 	.attr('opacity', 0.6);

		// let lineLength = linePlot.node().getTotalLength();

		// linePlot
		// 	.attr('stroke-dasharray', lineLength + ' ' + lineLength)
		// 	.attr('stroke-dashoffset', +lineLength)
		// 	.transition()
		// 	.duration(30000)
		// 	.ease(easeLinear)
		// 	.attr('stroke-dashoffset', 0);

	};

	this.caloriesVis = function caloriesVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Calories').data;
		console.log(data);

		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		const innerRadius = 125;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 200;

		moduleCalories = svg.append('g')
			.attr('id','calories')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let moduleCaloriesInner = moduleCalories.append('g')
			.attr('id','inner');

		let x = d3.scaleTime()
			.range([0, this.fullCircle]);

		x.domain(d3.extent(data, function (d) {
			// console.log(d.time);
			return d.time;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(d3.extent(data, function (d) {
			return d.value;
		}));

		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			})
			.curve(d3.curveStep); //Slight rounding without too much deviation

		// let arcS = d3.arc()
		// 	.startAngle(function(d,i) { return (i * 2 * Math.PI) / data.length; })
		// 	.endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / data.length; })
		// 	.innerRadius(innerRadius);

		// let segments = moduleCalories.selectAll('path')
		// 	.datum(data)
		// 	.enter().append('path')
		// 	.each(function(d) { d.outerRadius = y(d.value); })
		// 	.style('fill', '#92278f')
		// 	.style('stroke', '#eeeeee')
		// 	.attr('d', arcS);

		let segments = moduleCaloriesInner.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', '#92278f')
			// .attr('stroke', '#e6550d')
			.attr('d', line);

		moduleCaloriesInner
			.transition()
			.duration(animationParameters.angleDuration)
			.attr('transform', `rotate(${animationParameters.angle})`);

		// let plot = moduleCalories.append('rect')
		// 	.datum(data)
		// 	.attr('fill', 'none')
		// 	.attr('stroke', '#92278f')
		// 	// .attr('stroke', '#e6550d')
		// 	.attr('d', line);

		let yAxis = moduleCalories.append('g')
			.attr('text-anchor', 'middle');

		let yTick = yAxis
			.selectAll('g')
			.data(y.ticks(1))
			.enter().append('g');

		// yTick.append('circle')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'black')
		// 	.attr('opacity', 0.05)
		// 	.attr('r', y);

		yAxis.append('circle')
			.attr('fill', 'none')
			.attr('stroke', 'black')
			.attr('opacity', 0.05)
			.attr('r', function () {
				return y(y.domain()[0]);
			});

		// let xAxis = moduleCalories.append('g');

		// let xTick = xAxis
		// 	.d3.selectAll('g')
		// 	.data(x.ticks(12))
		// 	.enter().append('g')
		// 	.attr('text-anchor', 'middle')
		// 	.attr('transform', function (d) {
		// 		return 'rotate(' + ((x(d)) * 180 / Math.PI - 90) + ')translate(' + innerRadius + ',0)';
		// 	});

		// xTick.append('line')
		// 	.attr('x2', -5)
		// 	.attr('stroke', '#000');

		// xTick.append('text')
		// 	.attr('transform', function (d) {
		// 		let angle = x(d);
		// 		return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? 'rotate(90)translate(0,22)' : 'rotate(-90)translate(0, -15)';
		// 	})
		// 	.text(function (d) {
		// 		return formatHour(d);
		// 	})
		// 	.style('font-size', 10)
		// 	.attr('opacity', 0.6);

		let lineLength = segments.node().getTotalLength();

		segments
			.attr('stroke-dasharray', lineLength + ' ' + lineLength)
			.attr('stroke-dashoffset', +lineLength)
			.transition()
			.each(function (d, i) {
				console.log(d, i);
			})
			.duration(animationParameters.duration)
			.ease(d3.easeLinear)
			.attr('stroke-dashoffset', 0);


	};

	this.heartVis = function heartVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Heart').data;

		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		const innerRadius = 75;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 125;

		moduleHeart = svg.append('g')
			.attr('id','heart')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


		let moduleHeartInner = moduleHeart.append('g')
			.attr('id','inner');

		let x = d3.scaleTime()
			.range([0, this.fullCircle]);

		x.domain(d3.extent(data, function (d) {
			// console.log(d.time);
			return d.time;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(d3.extent(data, function (d) {
			return d.value;
		}));

		let line = d3.lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			});

		let linePlot = moduleHeartInner.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', '#ed1c24')
			// .attr('stroke', '#e6550d')
			.attr('d', line);

		moduleHeartInner
			.transition()
			.duration(animationParameters.angleDuration)
			.attr('transform', `rotate(${animationParameters.angle})`);

		let yAxis = moduleHeart.append('g')
			.attr('text-anchor', 'middle');

		let yTick = yAxis
			.selectAll('g')
			.data(y.ticks(1))
			.enter().append('g');

		// yTick.append('circle')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'black')
		// 	.attr('opacity', 0.05)
		// 	.attr('r', y);

		yAxis.append('circle')
			.attr('fill', 'none')
			.attr('stroke', 'black')
			.attr('opacity', 0.05)
			.attr('r', function () {
				return y(y.domain()[0]);
			});

		// let labels = yTick.append('text')
		// 	.attr('y', function (d) {
		// 		return -y(d);
		// 	})
		// 	.attr('dy', '0.35em')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', '#fff')
		// 	.attr('stroke-width', 5)
		// 	.attr('stroke-linejoin', 'round')
		// 	.text(function (d) {
		// 		return d;
		// 	});

		// yTick.append('text')
		// 	.attr('y', function (d) {
		// 		return -y(d);
		// 	})
		// 	.attr('dy', '0.35em')
		// 	.text(function (d) {
		// 		return d;
		// 	});

		// let xAxis = moduleHeart.append('g');

		// let xTick = xAxis
		// 	.d3.selectAll('g')
		// 	.data(x.ticks(12))
		// 	.enter().append('g')
		// 	.attr('text-anchor', 'middle')
		// 	.attr('transform', function (d) {
		// 		return 'rotate(' + ((x(d)) * 180 / Math.PI - 90) + ')translate(' + innerRadius + ',0)';
		// 	});

		// xTick.append('line')
		// 	.attr('x2', -5)
		// 	.attr('stroke', '#000');

		// xTick.append('text')
		// 	.attr('transform', function (d) {
		// 		let angle = x(d);
		// 		return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? 'rotate(90)translate(0,22)' : 'rotate(-90)translate(0, -15)';
		// 	})
		// 	.text(function (d) {
		// 		return formatHour(d);
		// 	})
		// 	.style('font-size', 10)
		// 	.attr('opacity', 0.6);

		let lineLength = linePlot.node().getTotalLength();

		linePlot
			.attr('stroke-dasharray', lineLength + ' ' + lineLength)
			.attr('stroke-dashoffset', +lineLength)
			.transition()
			.duration(animationParameters.duration)
			.ease(d3.easeLinear)
			.attr('stroke-dashoffset', 0);


	};

	this.drawDate = function drawDate() {
		moduleDate = svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// let title = moduleDate.append('g')
		// 	.attr('class', 'title')
		// 	.append('text')
		// 	.attr('dy', '-0.2em')
		// 	.attr('text-anchor', 'middle')
		// 	.text('heart beat');

		let subtitle = moduleDate.append('text')
			.attr('dy', '0.2em')
			.attr('text-anchor', 'middle')
			.attr('opacity', 0.6)
			.text('july 16');
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

}