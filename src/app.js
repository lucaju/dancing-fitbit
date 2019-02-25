/*
@author: Luciano Frizzera <lucaju@gmail.com>
*/

// modules
import 'uikit/dist/js/uikit.min';
import {select} from 'd3/dist/d3.min';

import 'uikit/dist/css/uikit.min.css';
import './style.css';

import DataModel from './dataModel';
import Home from './components/home';
import Dancing from './components/dancing';

import en from './localization/en.json';
import fr from './localization/fr.json';


// APP
function App() {

	this.view = 'home';
	this.lang = 'en';
	this.localization = en;

	this.metrics = [];

	this.init = function init() {

		// components
		this.dataModel = new DataModel(this);
		
		this.home = new Home(this);
		this.home.init();

	};
	
	this.getMetricByDay = function getMetricByDay(day) {
		const metric = this.dataModel.metrics.find(m => m.day == day);
		return metric;
	};

	this.changeView = function changeView(view) {

		this.hideView();

		this.view = view;

		if (this.view == 'home') {
			if(!this.home) this.home = new Home(this);
			this.home.init();
		}

		if (this.view == 'dancing') {
			if(!this.dancing) this.dancing = new Dancing(this);
			this.dancing.init();
		}

		this.showView();
	};

	this.hideView = function hide() {
		let viewName = this.view;
		let view = select(`#${this.view}`);
		view.transition()
			.duration(2000)
			.style('opacity', 0)
			.on('end', function() {
				delete app[viewName];
				view.remove();
			});
	};

	this.showView = function hide() {
		let view = select(`#${this.view}`);
		view.style('opacity', 0);
		view.transition()
			.duration(2000)
			.delay(2000)
			.style('opacity', 1);
	};

	this.changeLanguage = function changeLanguage(lang) {
		this.localization = (lang.toLowerCase() == 'fr') ? fr : en;
	};

}

const app = new App();
window.app = app;
app.init();