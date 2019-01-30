import * as d3 from 'd3';
import {scaleRadial} from './scaleRadial';

export default function footSteps(vis) {

	this.vis = vis;
	this.app = vis.app;

	this.svgContainer;

	const parseTime = d3.timeParse('%H:%M:%S');
	const fullCircle = 2 * Math.PI;
	
	const innerRadius = 200;
	const outerRadius = 300;

	this.setup = function setup() {
		this.svgContainer = this.vis.svg.append('g')
			.attr('id', 'footsteps');
	};

	this.addDay = function addDay(day) {

		const _this = this;

		//daa
		let data = this.app.getMetricByDay(day).steps;
		data.map(function (d) {
			d.time = parseTime(d.time);
		});

		//X Scale
		let x = d3.scaleTime()
			.range([0, fullCircle])
			.domain(d3.extent(data, function (d) {
				return d.time;
			}));

		//Y Scale
		let y = scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(d3.extent(data, function (d) {
				return d.value;
			}));

		
		//Inner container
		let innerSvgContainer = this.svgContainer.append('g')
			.attr('id', `day${day}`)
			.attr('day', day);


		//Scater graph
		let scaterSteps = innerSvgContainer.selectAll('circle')
			.data(data);

		scaterSteps.enter().append('circle')
			.attr('r', 2)
			.style('fill', '#cecece')
			.style('opacity', 0)
			.transition()
			.duration(100)
			.ease(d3.easeLinear)
			.delay(function (d, i) {
				return i * (_this.vis.getAnimationParametersByDay(day).duration / data.length);
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

		// inner container rotation
		let angle = this.vis.getAnimationParametersByDay(day).angle;

		if (day > 10) {
			innerSvgContainer.attr('transform', `rotate(${this.vis.getAnimationParametersByDay(day-1).angle})`);
			angle = this.vis.getAnimationParametersByDay(day - 1).angle + this.vis.getAnimationParametersByDay(day).angle;
		}

		innerSvgContainer
			.transition()
			.duration(this.vis.getAnimationParametersByDay(day).angleDuration)
			.delay(3000)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.vis.fadeOut(this);
			});

	};
	
}