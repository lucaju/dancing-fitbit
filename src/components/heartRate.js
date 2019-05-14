import {dispatch,easeLinear,extent,lineRadial,scaleTime} from 'd3/dist/d3.min';
import chroma from 'chroma-js/chroma.min';
import scaleRadial from './scaleRadial';


const event = dispatch('end');

const fullCircle = 2 * Math.PI;

const innerRadius = 75;
const outerRadius = 125;

let svgContainer;
let lastAngle = 0;

const setup = svg => {
	svgContainer = svg.append('g')
		.attr('id', 'heart')
		.attr('data-depth', '0.2');
};

const addDay = (day, data, animationParams) => {

	//X Scale
	let x = scaleTime()
		.range([0, fullCircle])
		.domain(extent(data, d => d.time));

	//Y Scale
	let y = scaleRadial()
		.range([innerRadius, outerRadius])
		.domain(extent(data, d => d.value));

	//Inner container
	let innerSvgContainer = svgContainer.append('g')
		.attr('id', `day${day}`)
		.attr('day', day);

	//Line graph
	let line = lineRadial()
		.angle(d => x(d.time))
		.radius(d =>  y(d.value));

	//graph
	let linePlot = innerSvgContainer.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', chroma('#ec1c24').hex())
		.attr('d', line);

	// inner container rotation
	let angle = animationParams.angle;
	lastAngle += angle;

	if (day > 10) {
		innerSvgContainer.attr('transform', `rotate(${lastAngle})`);
		angle = lastAngle + animationParams.angle;
	}

	innerSvgContainer.transition()
		.duration(animationParams.angleDuration)
		.attr('transform', `rotate(${angle})`)
		.on('end', function () {
			event.call('end',this,this);
		});

	//graph animation
	let lineLength = linePlot.node().getTotalLength();
	linePlot
		.attr('stroke-dasharray', lineLength + ' ' + lineLength)
		.attr('stroke-dashoffset', +lineLength)
		.transition()
		.duration(animationParams.duration)
		.ease(easeLinear)
		.attr('stroke-dashoffset', 0);

};


export default {
	setup,
	addDay,
	event
};