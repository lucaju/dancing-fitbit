import visMustache from './vis.html';
// import scaleRadial from './d3-scale-radial';
import {extent,sum} from 'd3-array/dist/d3-array.min';
import {nest} from 'd3-collection/dist/d3-collection.min';
import {easeLinear} from 'd3-ease/dist/d3-ease.min';
import {scaleTime, scaleLinear} from 'd3-scale/dist/d3-scale.min';
import {select,selection,selectAll} from 'd3-selection/dist/d3-selection.min';
import {arc,lineRadial,curveMonotoneX,curveBasis} from 'd3-shape/dist/d3-shape.min';
import {timeFormat,timeParse} from 'd3-time-format/dist/d3-time-format.min';

import {transition} from 'd3-transition';
// require('d3-transition/dist/d3-transition.min');


export default function Vis(app) {
	this.app = app;
	this.vis;

	this.parseTime = timeParse('%H:%M:%S');
	this.formatHour = timeFormat('%H');
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



	this.init = function init() {

		// data
		const pageData = {
			title: 'Hello',
		};

		// buid page
		const html = visMustache(pageData);
		select('#app').append('div').attr('id', 'visualization');
		select('#visualization').html(html);

		this.setup();
		this.distanceVis();
		this.stepsVis();
		this.caloriesVis();
		this.heartVis();
		this.drawDate();
	};

	this.setup = function setup() {

		svg = select('#vis').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);
		// .append('g')
		// .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	};

	this.distanceVis = function caloriesVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Distance').data;
		console.log(data);

		const parseHour = timeParse('%H');

		
		data.map( function(d) {

			//save hour
			d.hour = d.time.split(':');
			d.hour = d.hour[0];

			d.time = parseTime(d.time);

		});

		
		const aggregatedData = nest()
			.key(function(d) { return d.hour; })
			.rollup(function(v) {
				v.valueD  = sum(v, function(d) { return d.value; });
				return v.valueD;
			})
			.entries(data);
		
		const innerRadius = 300;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 450;

		moduleDistance = svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let x = scaleTime()
			.range([0, this.fullCircle]);

		x.domain(extent(aggregatedData, function (d) {
			return d.key;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(extent(aggregatedData, function (d) {
			return d.value;
		}));

		let line = lineRadial()
			.angle(function (d) {
				return x(d.key);
			})
			.radius(function (d) {
				return y(d.value);
			})
			.curve(curveBasis); //Slight rounding without too much deviation

		let linePlot = moduleDistance.append('path')
			.datum(aggregatedData)
			.attr('fill', '#fecf8c')
			.attr('stroke', '#fecf8c')
			// .attr('stroke', '#e6550d')
			.attr('d', line);

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
		// 	.selectAll('g')
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

	this.stepsVis = function caloriesVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Steps').data;
		console.log(data);
		
		data.map( function(d) {
			d.time = parseTime(d.time);  
		});
		
		const innerRadius = 200;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 300;

		moduleSteps = svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let x = scaleTime()
			.range([0, this.fullCircle])

		x.domain(extent(data, function (d) {
			return d.time;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(extent(data, function (d) {
			return d.value;
		}));

		let line = lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			});

		let scaterSteps = moduleSteps.selectAll('circle')
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
			.attr('transform', function (d) {
				return 'rotate(' + ((x(d.time)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)';
			})
			.style('fill', '#231f20')
			.style('opacity',function(d) {
				if (d.value == 0) return 0;
			});

		console.log(scaterSteps.transition());
		
		// scater.transition()
		// 	.duration(30000)
		// 	.ease(easeLinear)
		// 	.attr('transform', function (d) {
		// 		return 'rotate(' + ((x(d.time*2)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)';
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
		// 	.selectAll('g')
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
		console.log(data)
		
		data.map( function(d) {
			d.time = parseTime(d.time);  
		});
		
		const innerRadius = 125;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 200;

		moduleCalories = svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let x = scaleTime()
			.range([0, this.fullCircle]);

		x.domain(extent(data, function (d) {
			// console.log(d.time);
			return d.time;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(extent(data, function (d) {
			return d.value;
		}));

		// let line = lineRadial()
		// 	.angle(function (d) {
		// 		return x(d.time);
		// 	})
		// 	.radius(function (d) {
		// 		return y(d.value);
		// 	});

		let arcS = arc()
			.startAngle(function(d,i) { return (i * 2 * Math.PI) / data.length; })
			.endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / data.length; })
			.innerRadius(innerRadius);

		let segments = moduleCalories.selectAll('path')
			.data(data)
			.enter().append('path')
			.each(function(d) { d.outerRadius = y(d.value); })
			.style('fill', '#92278f')
			.attr('d', arcS);

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
		// 	.selectAll('g')
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

	this.heartVis = function heartVis() {

		const parseTime = this.parseTime;
		const formatHour = this.formatHour;

		let data = this.app.getMetricByName('Heart').data;
		
		data.map( function(d) {
			d.time = parseTime(d.time);  
		});

		const innerRadius = 75;
		// const outerRadius = Math.min(width, height) / 2 - 6;
		const outerRadius = 125;

		moduleHeart = svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let x = scaleTime()
			.range([0, this.fullCircle]);

		x.domain(extent(data, function (d) {
			// console.log(d.time);
			return d.time;
		}));

		let y = this.scaleRadial()
			.range([innerRadius, outerRadius]);

		y.domain(extent(data, function (d) {
			return d.value;
		}));

		let line = lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			});

		let linePlot = moduleHeart.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', '#ed1c24')
			// .attr('stroke', '#e6550d')
			.attr('d', line);

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

		let labels = yTick.append('text')
			.attr('y', function (d) {
				return -y(d);
			})
			.attr('dy', '0.35em')
			.attr('fill', 'none')
			.attr('stroke', '#fff')
			.attr('stroke-width', 5)
			.attr('stroke-linejoin', 'round')
			.text(function (d) {
				return d;
			});

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
		// 	.selectAll('g')
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

		let linear = scaleLinear();

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