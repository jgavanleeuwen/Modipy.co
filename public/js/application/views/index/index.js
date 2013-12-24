define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher) {
		var indexView = Backbone.View.extend({
			el: 'body',

			initialize: function() {
				_.bindAll(this, 'render');
			},

			render: function() {
				this.template = this.$el.html();
			}

		});
		
		return new indexView();
	});