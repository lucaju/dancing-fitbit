import {select} from 'd3/dist/d3.min';

import en from './homeEN.json';
import fr from './homeFR.json';

import homeMustache from './home.html';

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
			select('#home').html(html);

			select('#lang-button').on('click', function() {
				let lang = select(this).html();
				update(lang);
			});

			select('#play-button').on('click', function() {
				app.changeView('dancing');
			});

			window.scrollTo(0, 1);
		};

		select('#app').append('div').attr('id', 'home');
		update();
	};
}

