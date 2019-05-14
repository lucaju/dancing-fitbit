import {dispatch,select,selectAll} from 'd3';

import sidebarHBS from './sidebar.hbs';

const event = dispatch('videoControl', 'audioControl', 'metricControl', 'fxControl', 'about', 'restart');

const pageData = {
	audivisuals: [
		{
			name: 'video',
			isOn: true
		},
		{
			name: 'sine',
			isOn: true
		},
		{
			name: 'boat',
			isOn: true
		}
	],
	metrics: [
		{
			name: 'heart',
			isOn: true
		},
		{
			name: 'calories',
			isOn: true
		},
		{
			name: 'footsteps',
			isOn: true
		},
		{
			name: 'distance',
			isOn: true
		}
	],
	effects: [{
		name: 'gooey',
		isOn: false
	}],
	nav: [
		{
			name: 'about'
		},
		{
			name: 'restart'
		}
	]
};

const render = () => {

	// buid page
	const html = sidebarHBS(pageData);
	select('#dancing').append('div').attr('id', 'sidebar-left');
	select('#sidebar-left').html(html);

	selectAll('.option')
		.style('opacity', function () {
			let p = 1;
			if (select(this).attr('ison') == 'false') p = .5;
			return p;
		})
		.style('cursor', 'pointer')
		.on('click', function () {

			const option = select(this);
			const name = option.attr('id').substring(7);
			let isOn = option.attr('ison');

			if (isOn) {
				isOn = (isOn == 'true') ? false : true;
				let opacity = (isOn) ? 1 : .5;
				option.attr('ison', isOn);
				option.style('opacity', opacity);
			}

			if (name == 'video') {
				event.call('videoControl', this, isOn);
			} else if (name == 'sine' || name == 'boat') {
				event.call('audioControl', this, name, isOn);
			} else if (name == 'heart' || name == 'calories' || name == 'footsteps' || name == 'distance') {
				event.call('metricControl', this, name);
			} else if (name == 'gooey') {
				event.call('fxControl', this, name);
			} else if (name == 'about') {
				selectAll('*').transition();
				event.call('about');
			} else if (name == 'restart') {
				event.call('restart');
				restart();
				
			}
		});

};

const restart = () => {
	select('#sidebar-left').remove();
	render();
};

export default {
	render,
	event,
	restart
};