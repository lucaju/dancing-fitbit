/*
@author: Luciano Frizzera <lucaju@gmail.com>
*/

// modules
import 'uikit/dist/js/uikit.min';
import {select} from 'd3/dist/d3.min';

import 'uikit/dist/css/uikit.min.css';
import './style.css';

import home from './components/home';
// import dancing from './components/dancing';

import en from './localization/en.json';
import fr from './localization/fr.json';


let view = 'home';
let localization = en;
let dancing;

const changeView = async newView => {

	hideView(view);

	view = newView;

	if (view == 'home') {
		home.render(localization);
		addHomeListener();

	} else if (view == 'dancing') {
		if (!dancing) dancing = await import(/* webpackChunkName: "dancing" */ './components/dancing');
		dancing.render(localization);
		addDancingListener();
	}

	showView(view);
};

const hideView = (viewName) => {
	let viewHTML = select(`#${viewName}`);
	viewHTML.transition()
		.duration(2000)
		.style('opacity', 0)
		.on('end', () => {
			viewHTML.remove();
		});
};

const showView = (viewName) => {
	let viewHTML = select(`#${viewName}`);
	viewHTML.style('opacity', 0);
	viewHTML.transition()
		.duration(2000)
		.delay(2000)
		.style('opacity', 1);
};

const changeLanguage = lang => {
	localization = (lang.toLowerCase() == 'fr') ? fr : en;
};

const addHomeListener = () => {
	home.event.on('changelanguage', lang => {
		changeLanguage(lang);
		home.render(localization);
	});

	home.event.on('changeview', view => {
		changeView(view);
	});
};

const addDancingListener = () => {
	dancing.event.on('changeview', view => {
		changeView(view);
	});
};

(function init() {
	const homeEvent = home.render(localization);
	addHomeListener(homeEvent);
}());