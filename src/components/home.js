import {select} from 'd3/dist/d3.min';
import homeHBS from './home.hbs';

export default function Home(_app) {

	//parameters
	const app = _app;
	let pageData = {};


	//initialize
	this.init = function init() {
		//add div and update
		select('#app').append('div').attr('id', 'home');
		update();
	};

	//update info
	const updatePageData = function updatePageData() {
		pageData = {
			title: app.localization.title,
			description: app.localization.description,
			startButton: app.localization.startButton,
			headphones: app.localization.headphones,
			langButton: app.localization.langButton,
			collabTitle: app.localization.collabTitle,
			sponsorTtile: app.localization.sponsorTtile,
			collborators: app.localization.collborators,
		};
	};

	//update interface
	const update = function update() {

		//update info
		updatePageData();
		const html = homeHBS(pageData);
		select('#home').html(html);

		//set interaction
		select('#lang-button').on('click', function() {
			const lang = select(this).html();
			app.changeLanguage(lang);
			update();
			window.scrollTo(0, 1);
		});

		select('#play-button').on('click', function() {
			app.changeView('dancing');
		});
	};
}

