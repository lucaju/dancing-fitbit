import {dispatch, select} from 'd3/dist/d3.min';
import homeHBS from './home.hbs';

const event = dispatch('changelanguage', 'changeview');

//update info
const updatePageData = data => {
	return {
		title: data.title,
		description: data.description,
		startButton: data.startButton,
		headphones: data.headphones,
		langButton: data.langButton,
		collabTitle: data.collabTitle,
		sponsorTtile: data.sponsorTtile,
		collborators: data.collborators,
	};
};

//update interface
const render = (data) => {

	//update info
	const pageData = updatePageData(data);
	const html = homeHBS(pageData);

	if (select('#home').empty()) {
		select('#app').append('div').attr('id', 'home');
	}

	select('#home').html(html);
	window.scrollTo(0, 1);

	//set interaction
	select('#lang-button').on('click', function () {
		const lang = select(this).html();
		event.call('changelanguage', this, lang);
	});

	select('#play-button').on('click', function () {
		event.call('changeview', this, 'dancing');
	});
};


export default {
	render,
	event
};