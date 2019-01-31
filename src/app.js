/*
@author: Luciano Frizzera <lucaju@gmail.com>
*/

// modules
import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';

import 'uikit/dist/css/uikit.min.css';
import './style.css';

import DataModel from './dataModel';
import Home from './components/home';
import Dancing from './components/dancing';



// APP

function App() {

	this.view = 'home';

	this.metrics = [];

	this.init = function init() {

		uikiticons(UIkit);

		// components
		this.dataModel = new DataModel(this);
		
		this.home = new Home(this);
		this.home.init();

	};
	
	this.getMetricByDay = function getMetricByDay(day) {
		const metric = this.dataModel.metrics.find(m => m.day == day);
		return metric;
	};

	this.changeView = function changeView() {
		this.view = (this.view == 'home') ? 'dancing' : 'home';
		console.log(this.view);

		if (this.view == 'home') {
			this.home.init();
		}

		if (this.view == 'dancing') {
			if(!this.dancing) this.dancing = new Dancing(this);
			this.dancing.init();
		}
	};

}

const app = new App();
window.app = app;
app.init();

