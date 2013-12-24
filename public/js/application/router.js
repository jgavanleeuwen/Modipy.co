define([
	'jquery',
	'underscore',
	'backbone',
	'events/dispatcher',
	'views/index/index'
	], 
	function($, _, Backbone, Dispatcher, IndexView) {
		var AppRouter = Backbone.Router.extend({

			// Routes
			routes: {
				'map': 'map',
				'_=_': 'index',
				'' : 'index'
			},

			// Actions
			index: function() {
				IndexView.render();
			}

		});

		return AppRouter;
	});
