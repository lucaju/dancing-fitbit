import homeMustache from './home.html';
// // import {select, Selection} from 'd3-selection/dist/d3-selection.min';
// import {select,selection,selectAll,selector} from 'd3-selection/dist/d3-selection.min';
// require('d3-transition/dist/d3-transition.min');
// import {transition, Transition} from 'd3-transition';
// // import 'd3-transition';

import * as d3 from 'd3';

import en from './homeEN.json';
import fr from './homeFR.json';

export default function Home(_app) {

	const app = _app;

	let pageData = {};
	let info = en;

	this.init = function init() {

		const updatePageData = function updatePageData() {
			pageData = {
				title: info.title,
				description: info.description,
				startButton: info.startButton,
				langButton: info.langButton,
				collabTitle: info.collabTitle,
				sponsorTtile: info.sponsorTtile,
				collborators: info.collborators,
			};
		};

		const update = function update(lang) {

			info = (lang == 'Fr') ? fr : en;

			updatePageData();

			const html = homeMustache(pageData);
			d3.select('#home').html(html);

			d3.select('#lang-button').on('click', function() {
				let lang = d3.select(this).html();
				update(lang);
			});

			d3.select('#play-button').on('click', function() {
				app.changeView('dancing');
			});

			window.scrollTo(0, 1);
		};

		d3.select('#app').append('div').attr('id', 'home');
		update();
	};
}

