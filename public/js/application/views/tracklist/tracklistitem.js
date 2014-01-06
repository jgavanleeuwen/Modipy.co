define([
	'jquery',
	'underscore',
	'backbone',
	'hammeradapter',
	'events/dispatcher',
	'text!views/tracklist/templates/tracklistitem.html'
], function( $, _, Backbone, Hammeradapter, Dispatcher, Template ) {

		var TracklistItemView = Backbone.View.extend({

			tagName: 'tr',
			template: Template,

			events: {
			},

			hammerEvents: {
				'swipeleft': 'onSwipeLeftHandler',
				'swiperight': 'onSwipeRightHandler'
			},

			initialize: function () {
				_.bindAll(this, 'render', 'onSwipeLeftHandler', 'onSwipeRightHandler', 'onStateChangeHandler', 'onAlbumChangeHandler', 'onModelRemoveHandler');

				this.model.on('change:state', this.onStateChangeHandler);
				this.model.on('change:album', this.onAlbumChangeHandler);
				this.model.on('remove', this.onModelRemoveHandler);

				this.model.fetch();

			},

			render: function() {

				$(this.el).html(_.template(this.template, this.model.attributes));

				return this;
			},

			onStateChangeHandler: function( state ) {
				var self = this;
				$(this.el).attr('class', self.model.get('state'));
			},

			onAlbumChangeHandler: function(model) {
				this.render();
			},

			onSwipeLeftHandler: function(event) {
				this.model.set({'state': 'edit'});
			},

			onSwipeRightHandler: function(event) {
				this.model.set({'state': 'default'});
			},

			onModelRemoveHandler: function(model) {
				this.off();
				this.remove();
			}

		});

	return TracklistItemView;

});