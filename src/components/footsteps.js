import {scaleTime,extent,easeLinear} from 'd3/dist/d3.min';
import chroma from 'chroma-js/chroma.min';
import {scaleRadial} from './scaleRadial';

export default function footSteps(vis) {

	this.vis = vis;
	this.app = vis.app;

	this.svgContainer;

	const fullCircle = 2 * Math.PI;
	
	const innerRadius = 200;
	const outerRadius = 300;

	this.setup = function setup() {
		this.svgContainer = this.vis.svg.append('g')
			.attr('id', 'footsteps')
			.attr('data-depth', '0.6');
	};

	this.addDay = function addDay(day) {

		const _this = this;

		//daa
		let data = this.app.getMetricByDay(day).steps;

		//X Scale
		let x = scaleTime()
			.range([0, fullCircle])
			.domain(extent(data, function (d) {
				return d.time;
			}));

		//Y Scale
		let y = scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(extent(data, function (d) {
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
			.style('fill', chroma('#f05a28').hex())
			.style('opacity', 0)
			.transition()
			.duration(100)
			.ease(easeLinear)
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
				_this.vis.changeDay(day+1);
			});

	};
	
}