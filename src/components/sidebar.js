import sidebarMustache from './sidebar.html';
import {select, selectAll} from 'd3-selection/dist/d3-selection.min';


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
			}]
		};

		// buid page
		const html = sidebarMustache(pageData);
		select('#app').append('div').attr('id', 'tm-sidebar-left');
		select('#tm-sidebar-left').html(html);

		selectAll('.option')
			.style('opacity', function() {
				if (select(this).attr('state') == 'off') return 0.5;
			})
			.on('click', function() {

				const option = select(this);
				const name = option.attr('id').substring(7);
				console.log(name);

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
				}
			});



	};
}