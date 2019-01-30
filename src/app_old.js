/*
@author: Luciano Frizzera <lucaju@gmail.com>
*/

// modules
import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';

// import {selection} from 'd3-selection/dist/d3-selection.min';

import 'uikit/dist/css/uikit.min.css';
import './style.css';

import heart from './dataset/heart/fitbit-heart-2018-07-10.json';
import calories from './dataset/calories/fitbit-calories-2018-07-10.json';
import steps from './dataset/steps/fitbit-steps-2018-07-10.json';
import distance from './dataset/distance/fitbit-distance-2018-07-10.json';
import sleep from './dataset/sleep/fitbit-sleep-2018-07-10.json';

import Sidebar from './components/sidebar';
import Vis from './components/vis';



// APP

function App() {

	this.period = {};
	this.metrics = [
		{
			name: 'Heart',
			data: []
		},
		{
			name: 'Calories',
			data: []
		},
		{
			name: 'Steps',
			data: []
		},
		{
			name: 'Distance',
			data: []
		},
		{
			name: 'Sleep',
			data: []
		}
	];

	this.init = function init() {

		uikiticons(UIkit);
		
		this.getMetricByName('Heart').data = heart['activities-heart-intraday'].dataset;
		this.getMetricByName('Calories').data = calories['activities-calories-intraday'].dataset;
		this.getMetricByName('Steps').data = steps['activities-steps-intraday'].dataset;
		this.getMetricByName('Distance').data = distance['activities-distance-intraday'].dataset;
		this.getMetricByName('sleep').data = sleep.sleep;
		console.log(this.metrics);

		// components
		this.sidebar = new Sidebar(this);
		this.sidebar.init();

		this.vis = new Vis(this);
		this.vis.init();

	};

	this.getMetricByName = function getMetricByName(name) {
		const metric = this.metrics.find(m => m.name.toLowerCase() == name.toLowerCase());
		return metric;
	};

}

const app = new App();
window.app = app;
app.init();

