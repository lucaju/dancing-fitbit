import sidebarMustache from './sidebar.html';
// import {select, selectAll} from 'd3-selection/dist/d3-selection.min';
import * as d3 from 'd3';


export default function Sidebar(dancing) {
	this.dancing = dancing;

	this.init = function init() {

		const _this = this;

		// data
		const pageData = {
			audivisuals: [
				{
					name:'video',
					state: 'on'
				},
				{
					name: 'audio',
					state: 'on'
				}
			],
			metrics: [
				{
					name: 'heart',
					state: 'on'
				},
				{
					name: 'calories',
					state: 'on'
				},
				{
					name: 'footsteps',
					state: 'on'
				},
				{
					name: 'distance',
					state: 'on'
				}
			],
			effects: [{
				name: 'gooey',
				state: 'off'
			}],
			nav: [{
				name: 'About'
			}]
		};

		// buid page
		const html = sidebarMustache(pageData);
		d3.select('#dancing').append('div').attr('id', 'sidebar-left');
		d3.select('#sidebar-left').html(html);

		d3.selectAll('.option')
			.style('opacity', function() {
				if (d3.select(this).attr('state') == 'off') return 0.5;
			})
			.on('click', function() {

				const option = d3.select(this);
				const name = option.attr('id').substring(7);

				let state = option.attr('state');

				if (state == 'off') {
					state = 'on';
					option.style('opacity',1);
				} else {
					state = 'off';
					option.style('opacity',.5);
				}

				option.attr('state',state);

				if (name == 'audio') {
					_this.dancing.audioControl(state);
				} else if (name == 'video') {
					_this.dancing.videoControl(state);
				} else if (name == 'heart' || name == 'calories' || name == 'footsteps' || name == 'distance') {
					_this.dancing.hideMetric(name);
				} else if (name == 'gooey') {
					_this.dancing.applyFX(name);
				} else if (name == 'About') {
					d3.selectAll('*').transition();
					_this.dancing.audioStop();
					_this.dancing.app.changeView('home');
				}
			});



	};
}