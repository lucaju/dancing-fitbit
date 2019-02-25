import {nest,sum,scaleTime,extent,curveBasisClosed,lineRadial} from 'd3/dist/d3.min';
import chroma from 'chroma-js/chroma.min';
import {scaleRadial} from './scaleRadial';

export default function distance(vis) {

	this.vis = vis;
	this.app = vis.app;

	this.svgContainer;

	const fullCircle = 2 * Math.PI;
	
	const innerRadius = 300;
	const outerRadius = 450;

	this.innerSvgContainer;
	this.mask;

	this.setup = function setup() {
		this.svgContainer = this.vis.svg.append('g')
			.attr('id', 'distance')
			.attr('clip-path', 'url(#distanceClip)')
			.attr('data-depth', '0.8');
	};

	this.addDay = function addDay(day) {

		const _this = this;

		//data
		let data = this.app.getMetricByDay(day).distance;

		// aggregated data
		const aggregatedData = nest()
			.key(function (d) {
				return d.hour;
			})
			.rollup(function (v) {
				v.valueD = sum(v, function (d) {
					return d.value;
				});
				return v.valueD;
			})
			.entries(data);


		//X Scale
		let x = scaleTime()
			.range([0, fullCircle])
			.domain(extent(aggregatedData, function (d) {
				return d.key;
			}));

		//Y Scale
		let y = scaleRadial()
			.range([innerRadius, outerRadius])
			.domain(extent(aggregatedData, function (d) {
				return d.value;
			}));

		//Inner container
		this.innerSvgContainer = this.svgContainer.append('g')
			.attr('id', `day${day}`)
			.attr('day', day);

		//Line Graph
		let line = lineRadial()
			.angle(function (d) {
				return x(d.key);
			})
			.radius(function (d) {
				return y(d.value);
			})
			.curve(curveBasisClosed); //Slight rounding without too much deviation

		//Graph
		this.innerSvgContainer
			.append('clipPath') // define a clip path
			.attr('id', 'areaPlot') // give the clipPath an ID
			.append('path')
			.attr('id', 'vis')
			.datum(aggregatedData)
			.attr('fill', chroma('#1b75bb').hex())
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
		this.mask = this.innerSvgContainer.append('path')
			.attr('id', 'mask')
			.attr('fill', chroma('#1b75bb').hex())
			.attr('clip-path', 'url(#areaPlot)');

		// we're ready to kick it off
		this.mask.transition().duration(this.vis.getAnimationParametersByDay(day).duration)
			.attrTween('d', function () {
				return interpolateSVGSegment(0, 0, outerRadius, 0, 359.99);
			});

		// inner container rotation
		let angle = this.vis.getAnimationParametersByDay(day).angle;

		if (day > 10) {
			this.innerSvgContainer.attr('transform', `rotate(${this.vis.getAnimationParametersByDay(day-1).angle})`);
			angle = this.vis.getAnimationParametersByDay(day - 1).angle + this.vis.getAnimationParametersByDay(day).angle;
		}

		this.innerSvgContainer
			.transition()
			.duration(this.vis.getAnimationParametersByDay(day).angleDuration)
			.delay(4500)
			.attr('transform', `rotate(${angle})`)
			.on('end', function () {
				_this.vis.fadeOut(this);
				_this.vis.changeDay(day+1);
			});

	};

}