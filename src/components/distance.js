import {curveBasisClosed,dispatch,extent,lineRadial,nest,scaleTime,sum} from 'd3/dist/d3.min';
import chroma from 'chroma-js/chroma.min';
import scaleRadial from './scaleRadial';


const event = dispatch('end');

const fullCircle = 2 * Math.PI;

const innerRadius = 300;
const outerRadius = 450;

let svgContainer;
let lastAngle = 0;

const setup = svg => {
	svgContainer = svg.append('g')
		.attr('id', 'distance')
		.attr('clip-path', 'url(#distanceClip)')
		.attr('data-depth', '0.8');
};

const addDay = (day, data, animationParams) => {

	// aggregated data
	const aggregatedData = nest()
		.key( d => d.hour)
		.rollup(v => {
			v.valueD = sum(v, d =>  d.value);
			return v.valueD;
		})
		.entries(data);


	//X Scale
	let x = scaleTime()
		.range([0, fullCircle])
		.domain(extent(aggregatedData, d => d.key));

	//Y Scale
	let y = scaleRadial()
		.range([innerRadius, outerRadius])
		.domain(extent(aggregatedData, d => d.value));

	//Inner container
	let innerSvgContainer = svgContainer.append('g')
		.attr('id', `day${day}`)
		.attr('day', day);

	//Line Graph
	let line = lineRadial()
		.angle(d => x(d.key))
		.radius(d => y(d.value))
		.curve(curveBasisClosed); //Slight rounding without too much deviation

	//Graph
	innerSvgContainer
		.append('clipPath') // define a clip path
		.attr('id', 'areaPlot') // give the clipPath an ID
		.append('path')
		.attr('id', 'vis')
		.datum(aggregatedData)
		.attr('fill', chroma('#1b75bb').hex())
		.attr('stroke-width', '1px')
		.attr('d', line);

	// helper function to generate the segment as a path
	const generateSVGSegment = (x, y, r, startAngle, endAngle) => {

		// convert angles to Radians
		startAngle *= (Math.PI / 180);
		endAngle *= (Math.PI / 180);

		var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1; // 1 if angle > 180 degrees
		var sweepFlag = 1; // is arc to be drawn in +ve direction?

		return ['M', x, y, 'L', x + Math.sin(startAngle) * r, y - (Math.cos(startAngle) * r),
			'A', r, r, 0, largeArc, sweepFlag, x + Math.sin(endAngle) * r, y - (Math.cos(endAngle) * r), 'Z'
		].join(' ');
	};

	// our custom interpolator, which returns an interpolator function
	// which when called with a time (0-1), generates a segment sized according to time
	const interpolateSVGSegment = (x, y, r, startAngle, endAngle) => {
		return (t) => {
			return generateSVGSegment(x, y, r, startAngle, startAngle + ((endAngle - startAngle) * t));
		};
	};

	//mask
	let mask = innerSvgContainer.append('path')
		.attr('id', 'mask')
		.attr('fill', chroma('#1b75bb').hex())
		.attr('clip-path', 'url(#areaPlot)');

	mask.transition().duration(animationParams.duration)
		.attrTween('d', () => {
			return interpolateSVGSegment(0, 0, outerRadius, 0, 359.99);
		});

	// inner container rotation
	let angle = animationParams.angle;
	lastAngle += angle;

	if (day > 10) {
		innerSvgContainer.attr('transform', `rotate(${lastAngle})`);
		angle = lastAngle + animationParams.angle;
	}

	innerSvgContainer
		.transition()
		.duration(animationParams.angleDuration)
		.delay(4500)
		.attr('transform', `rotate(${angle})`)
		.on('end', function () {
			event.call('end', this, this);
		});

};


export default {
	setup,
	addDay,
	event
};