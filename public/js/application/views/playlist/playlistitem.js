define([
	'jquery',
	'underscore',
	'backbone',
	'hammeradapter',
	'events/dispatcher',
	'collections/playlists',
	'text!views/playlist/templates/playlistitem.html'
], function( $, _, Backbone, Hammeradapter, Dispatcher, PlaylistCollection, Template ) {

		var PlaylistItemView = Backbone.View.extend({

			tagName: 'tr',
			template: Template,

			events: {
				// 'click': 'onClickHandler'
			},

			hammerEvents: {
				'swipeleft': 'onSwipeLeftHandler',
				'swiperight': 'onSwipeRightHandler'
			},

			initialize: function () {
				_.bindAll(this, 'render', 'onClickHandler', 'onSwipeLeftHandler', 'onSwipeRightHandler', 'onStateChangeHandler', 'onModelRemoveHandler');

				this.model.on('change:state', this.onStateChangeHandler);
				this.model.on('remove', this.onModelRemoveHandler);
			},

			render: function() {
				$(this.el).html(_.template(this.template, this.model.attributes));

				return this;
			},

			onClickHandler: function(event) {
				var self = this;
				if(this.model.get('state') === 'default') {
					Dispatcher.trigger('change:playlist', { uri: self.model.get('uri')});
				} else {
					this.model.set({'state': 'default'});
				}
			},

			onStateChangeHandler: function( state ) {
				var self = this;
				$(this.el).attr('class', self.model.get('state'));
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

	return PlaylistItemView;

});