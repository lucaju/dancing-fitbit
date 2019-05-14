import {dispatch,easeLinear,extent,scaleTime,} from 'd3/dist/d3.min';
import chroma from 'chroma-js/chroma.min';
import scaleRadial from './scaleRadial';


const event = dispatch('end');

const fullCircle = 2 * Math.PI;

const innerRadius = 200;
const outerRadius = 300;

let svgContainer;
let lastAngle = 0;

const setup = svg => {
	svgContainer = svg.append('g')
		.attr('id', 'footsteps')
		.attr('data-depth', '0.6');
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
		.delay((d, i) =>  i * (animationParams.duration / data.length))
		.attr('transform', d => 'rotate(' + ((x(d.time)) * 180 / Math.PI - 90) + ')translate(' + y(d.value) + ',0)')
		.style('opacity', d => {
			if (d.value == 0) return 0;
			return 1;
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
		.delay(3000)
		.attr('transform', `rotate(${angle})`)
		.on('end', function () {
			event.call('end',this,this);
		});

};


export default {
	setup,
	addDay,
	event
};