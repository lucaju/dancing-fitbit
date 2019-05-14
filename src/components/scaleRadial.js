import {scaleLinear} from 'd3';

const square = x => x * x;

const scaleRadial = () => {

	let linear = scaleLinear();

	var sq = square;

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

export default scaleRadial;