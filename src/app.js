/*
@author: Luciano Frizzera <lucaju@gmail.com>
*/

// modules
import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';

// import {selection} from 'd3-selection/dist/d3-selection.min';

import 'uikit/dist/css/uikit.min.css';
import './style.css';

import Sidebar from './components/sidebar';
import Vis from './components/vis';

import heart10 from './dataset/heart/fitbit-heart-2018-07-10.json';
import calories10 from './dataset/calories/fitbit-calories-2018-07-10.json';
import steps10 from './dataset/steps/fitbit-steps-2018-07-10.json';
import distance10 from './dataset/distance/fitbit-distance-2018-07-10.json';
import sleep10 from './dataset/sleep/fitbit-sleep-2018-07-10.json';

import heart11 from './dataset/heart/fitbit-heart-2018-07-11.json';
import calories11 from './dataset/calories/fitbit-calories-2018-07-11.json';
import steps11 from './dataset/steps/fitbit-steps-2018-07-11.json';
import distance11 from './dataset/distance/fitbit-distance-2018-07-11.json';
import sleep11 from './dataset/sleep/fitbit-sleep-2018-07-11.json';

import heart12 from './dataset/heart/fitbit-heart-2018-07-12.json';
import calories12 from './dataset/calories/fitbit-calories-2018-07-12.json';
import steps12 from './dataset/steps/fitbit-steps-2018-07-12.json';
import distance12 from './dataset/distance/fitbit-distance-2018-07-12.json';
import sleep12 from './dataset/sleep/fitbit-sleep-2018-07-12.json';

import heart13 from './dataset/heart/fitbit-heart-2018-07-13.json';
import calories13 from './dataset/calories/fitbit-calories-2018-07-13.json';
import steps13 from './dataset/steps/fitbit-steps-2018-07-13.json';
import distance13 from './dataset/distance/fitbit-distance-2018-07-13.json';
import sleep13 from './dataset/sleep/fitbit-sleep-2018-07-13.json';

import heart14 from './dataset/heart/fitbit-heart-2018-07-14.json';
import calories14 from './dataset/calories/fitbit-calories-2018-07-14.json';
import steps14 from './dataset/steps/fitbit-steps-2018-07-14.json';
import distance14 from './dataset/distance/fitbit-distance-2018-07-14.json';
import sleep14 from './dataset/sleep/fitbit-sleep-2018-07-14.json';

import heart15 from './dataset/heart/fitbit-heart-2018-07-15.json';
import calories15 from './dataset/calories/fitbit-calories-2018-07-15.json';
import steps15 from './dataset/steps/fitbit-steps-2018-07-15.json';
import distance15 from './dataset/distance/fitbit-distance-2018-07-15.json';
import sleep15 from './dataset/sleep/fitbit-sleep-2018-07-15.json';

import heart16 from './dataset/heart/fitbit-heart-2018-07-16.json';
import calories16 from './dataset/calories/fitbit-calories-2018-07-16.json';
import steps16 from './dataset/steps/fitbit-steps-2018-07-16.json';
import distance16 from './dataset/distance/fitbit-distance-2018-07-16.json';
import sleep16 from './dataset/sleep/fitbit-sleep-2018-07-16.json';

import heart17 from './dataset/heart/fitbit-heart-2018-07-17.json';
import calories17 from './dataset/calories/fitbit-calories-2018-07-17.json';
import steps17 from './dataset/steps/fitbit-steps-2018-07-17.json';
import distance17 from './dataset/distance/fitbit-distance-2018-07-17.json';
import sleep17 from './dataset/sleep/fitbit-sleep-2018-07-17.json';

import heart18 from './dataset/heart/fitbit-heart-2018-07-18.json';
import calories18 from './dataset/calories/fitbit-calories-2018-07-18.json';
import steps18 from './dataset/steps/fitbit-steps-2018-07-18.json';
import distance18 from './dataset/distance/fitbit-distance-2018-07-18.json';
import sleep18 from './dataset/sleep/fitbit-sleep-2018-07-18.json';

import heart19 from './dataset/heart/fitbit-heart-2018-07-19.json';
import calories19 from './dataset/calories/fitbit-calories-2018-07-19.json';
import steps19 from './dataset/steps/fitbit-steps-2018-07-19.json';
import distance19 from './dataset/distance/fitbit-distance-2018-07-19.json';
import sleep19 from './dataset/sleep/fitbit-sleep-2018-07-19.json';

import heart20 from './dataset/heart/fitbit-heart-2018-07-20.json';
import calories20 from './dataset/calories/fitbit-calories-2018-07-20.json';
import steps20 from './dataset/steps/fitbit-steps-2018-07-20.json';
import distance20 from './dataset/distance/fitbit-distance-2018-07-20.json';
import sleep20 from './dataset/sleep/fitbit-sleep-2018-07-20.json';





// APP

function App() {

	this.period = {};
	// this.metrics = [
	// 	{
	// 		name: 'Heart',
	// 		data: []
	// 	},
	// 	{
	// 		name: 'Calories',
	// 		data: []
	// 	},
	// 	{
	// 		name: 'Steps',
	// 		data: []
	// 	},
	// 	{
	// 		name: 'Distance',
	// 		data: []
	// 	},
	// 	{
	// 		name: 'Sleep',
	// 		data: []
	// 	}
	// ];

	this.metrics = [];

	this.init = function init() {

		uikiticons(UIkit);

		this.metrics = [
			{
				day: 10,
				month: 'july',
				heart: heart10['activities-heart-intraday'].dataset,
				calories: calories10['activities-calories-intraday'].dataset,
				steps: steps10['activities-steps-intraday'].dataset,
				distance: distance10['activities-distance-intraday'].dataset,
				sleep: sleep10.sleep,
			},
			{
				day: 11,
				month: 'july',
				heart: heart11['activities-heart-intraday'].dataset,
				calories: calories11['activities-calories-intraday'].dataset,
				steps: steps11['activities-steps-intraday'].dataset,
				distance: distance11['activities-distance-intraday'].dataset,
				sleep: sleep11.sleep,
			},
			{
				day: 12,
				month: 'july',
				heart: heart12['activities-heart-intraday'].dataset,
				calories: calories12['activities-calories-intraday'].dataset,
				steps: steps12['activities-steps-intraday'].dataset,
				distance: distance12['activities-distance-intraday'].dataset,
				sleep: sleep12.sleep,
			},
			{
				day: 13,
				month: 'july',
				heart: heart13['activities-heart-intraday'].dataset,
				calories: calories13['activities-calories-intraday'].dataset,
				steps: steps13['activities-steps-intraday'].dataset,
				distance: distance13['activities-distance-intraday'].dataset,
				sleep: sleep13.sleep,
			},
			{
				day: 14,
				month: 'july',
				heart: heart14['activities-heart-intraday'].dataset,
				calories: calories14['activities-calories-intraday'].dataset,
				steps: steps14['activities-steps-intraday'].dataset,
				distance: distance14['activities-distance-intraday'].dataset,
				sleep: sleep14.sleep,
			},
			{
				day: 15,
				month: 'july',
				heart: heart15['activities-heart-intraday'].dataset,
				calories: calories15['activities-calories-intraday'].dataset,
				steps: steps15['activities-steps-intraday'].dataset,
				distance: distance15['activities-distance-intraday'].dataset,
				sleep: sleep15.sleep,
			},
			{
				day: 16,
				month: 'july',
				heart: heart16['activities-heart-intraday'].dataset,
				calories: calories16['activities-calories-intraday'].dataset,
				steps: steps16['activities-steps-intraday'].dataset,
				distance: distance16['activities-distance-intraday'].dataset,
				sleep: sleep16.sleep,
			},
			{
				day: 17,
				month: 'july',
				heart: heart17['activities-heart-intraday'].dataset,
				calories: calories17['activities-calories-intraday'].dataset,
				steps: steps17['activities-steps-intraday'].dataset,
				distance: distance17['activities-distance-intraday'].dataset,
				sleep: sleep17.sleep,
			},
			{
				day: 18,
				month: 'july',
				heart: heart18['activities-heart-intraday'].dataset,
				calories: calories18['activities-calories-intraday'].dataset,
				steps: steps18['activities-steps-intraday'].dataset,
				distance: distance18['activities-distance-intraday'].dataset,
				sleep: sleep18.sleep,
			},
			{
				day: 19,
				month: 'july',
				heart: heart19['activities-heart-intraday'].dataset,
				calories: calories19['activities-calories-intraday'].dataset,
				steps: steps19['activities-steps-intraday'].dataset,
				distance: distance19['activities-distance-intraday'].dataset,
				sleep: sleep19.sleep,
			},
			{
				day: 20,
				month: 'july',
				heart: heart20['activities-heart-intraday'].dataset,
				calories: calories20['activities-calories-intraday'].dataset,
				steps: steps20['activities-steps-intraday'].dataset,
				distance: distance20['activities-distance-intraday'].dataset,
				sleep: sleep20.sleep,
			},
			
		];

		console.log(this.metrics);


		// components
		this.sidebar = new Sidebar(this);
		this.sidebar.init();

		this.vis = new Vis(this);
		this.vis.init();

	};
	
	this.getMetricByDay = function getMetricByDay(day) {
		const metric = this.metrics.find(m => m.day == day);
		return metric;
	};

	this.hideMetric = function hideVis(visName) {
		this.vis.hideMetric(visName);
	};

	this.applyFX = function applyFX(fx) {
		if (fx == 'gooey') {
			this.vis.applyGooeyFX();
		}
	};

}

const app = new App();
window.app = app;
app.init();

