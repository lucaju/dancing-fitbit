import {scaleTime,extent,easeLinear,lineRadial} from 'd3/dist/d3.min';
import chroma from 'chroma-js/chroma.min';
import {scaleRadial} from './scaleRadial';


export default function hearRate(vis) {

	this.vis = vis;
	this.app = vis.app;

	this.svgContainer;

	const fullCircle = 2 * Math.PI;
	
	const innerRadius = 75;
	const outerRadius = 125;

	// const scaleRadial = new ScaleRadial();

	this.setup = function setup() {
		this.svgContainer = this.vis.svg.append('g')
			.attr('id', 'heart')
			.attr('data-depth', '0.2');
	};

	this.addDay = function addDay(day) {

		const _this = this;

		//data
		let data = this.app.getMetricByDay(day).heart;

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

		//Line graph
		let line = lineRadial()
			.angle(function (d) {
				return x(d.time);
			})
			.radius(function (d) {
				return y(d.value);
			});

		//graph
		let linePlot = innerSvgContainer.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', chroma('#ec1c24').hex())
			.attr('d', line);

		// inner container rotation
		let angle = this.vis.getAnimationParametersByDay(day).angle;

		if (this.day > 10) {
			innerSvgContainer.attr('transform', `rotate(${this.vis.getAnimationParametersByDay(day-1).angle})`);
			angle = this.vis.getAnimationParametersByDay(day - 1).angle + this.vis.getAnimationParametersByDay(day).angle;
		}

		innerSvgContainer.transition()
			.duration(this.vis.getAnimationParametersByDay(day).angleDuration)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.vis.fadeOut(this);
				_this.vis.changeDay(day+1);
			});

		//graph animation
		let lineLength = linePlot.node().getTotalLength();
		linePlot
			.attr('stroke-dasharray', lineLength + ' ' + lineLength)
			.attr('stroke-dashoffset', +lineLength)
			.transition()
			.duration(this.vis.getAnimationParametersByDay(day).duration)
			.ease(easeLinear)
			.attr('stroke-dashoffset', 0);

	};
}