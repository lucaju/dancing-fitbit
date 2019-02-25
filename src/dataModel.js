import {timeParse} from 'd3-time-format/dist/d3-time-format.min';

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

export default function dataModel() {

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
		
	];

	const parseTime = timeParse('%H:%M:%S');

	for(const day of this.metrics) {
		day.heart.map(function (d) {
			d.time = parseTime(d.time);
		});

		day.calories.map(function (d) {
			d.time = parseTime(d.time);
		});

		day.steps.map(function (d) {
			d.time = parseTime(d.time);
		});

		day.distance.map(function (d) {
			d.hour = d.time.split(':');
			d.hour = d.hour[0];
			d.time = parseTime(d.time);
		});
	}

}