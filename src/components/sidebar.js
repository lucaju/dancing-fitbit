import {select,selectAll} from 'd3';

import sidebarHBS from './sidebar.hbs';


export default function Sidebar(dancing) {
	this.dancing = dancing;

	this.pageData;

	this.init = function init() {

		const _this = this;

		// data
		this.pageData = {
			audivisuals: [
				{
					name:'video',
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

		// buid page
		const html = sidebarHBS(this.pageData);
		select('#dancing').append('div').attr('id', 'sidebar-left');
		select('#sidebar-left').html(html);

		selectAll('.option')
			.style('opacity', function() {
				let p = 1;
				if (select(this).attr('ison') == 'false') p = .5;
				return p;
			})
			.style('cursor','pointer')
			.on('click', function() {

				const option = select(this);
				const name = option.attr('id').substring(7);
				let isOn = option.attr('ison');

				if (isOn) {
					isOn = (isOn == 'true') ? false : true;
					let opacity = (isOn) ? 1 : .5;
					option.attr('ison', isOn);
					option.style('opacity',opacity);
				}
			
				if (name == 'video') {
					_this.dancing.videoControl(isOn);
				} else  if (name == 'sine' || name == 'boat') {
					_this.dancing.audioControl(name,isOn);
				} else if (name == 'heart' || name == 'calories' || name == 'footsteps' || name == 'distance') {
					_this.dancing.hideMetric(name);
				} else if (name == 'gooey') {
					_this.dancing.applyFX(name);
				} else if (name == 'about') {
					selectAll('*').transition();
					_this.dancing.audioStop();
					_this.dancing.app.changeView('home');
				} else if (name == 'restart') {
					_this.dancing.restart();
					_this.restart();
				}
			});

	};

	this.restart = function restart() {
		select('#sidebar-left').remove();
		this.init();
	};
}