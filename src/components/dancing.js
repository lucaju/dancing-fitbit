import dancingMustache from './dancing.html';

import * as d3 from 'd3';

export default function dancing(_app) {

	const app = _app;

	let pageData = {};

	this.init = function init() {

		this.pageData = {};

		d3.select('#app').append('div').attr('id', 'dancing');
		const html = dancingMustache(pageData);
		d3.select('#dancing').html(html);

		

	};

	
}

