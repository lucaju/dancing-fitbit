import sidebarMustache from './sidebar.html';
import {
	select
} from 'd3-selection/dist/d3-selection.min';
import createPlayer from 'web-audio-player';

export default function Sidebar(app) {
	this.app = app;

	this.init = function init() {

		// data
		const pageData = {
			title: 'Metrics',
			metrics: [{
				name: 'heart',
			},
			{
				name: 'calories',
			},
			{
				name: 'steps',
			},
			{
				name: 'distance',
			}
			],
			effects: [{
				name: 'gooey',
			}]
		};

		// buid page
		const html = sidebarMustache(pageData);
		select('#app').append('div').attr('id', 'tm-sidebar-left');
		select('#tm-sidebar-left').html(html);

		let audio = createPlayer('asset/Florence_SC_livemixdown.mp3');

		audio.on('load', () => {
			console.log('Audio loaded...');

			// start playing audio file
			audio.play();

			// and connect your node somewhere, such as
			// the AudioContext output so the user can hear it!
			audio.node.connect(audio.context.destination);
		});
	};
}