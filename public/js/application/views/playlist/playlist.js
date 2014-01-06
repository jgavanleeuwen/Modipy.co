define([
	'jquery',
	'underscore',
	'backbone',
	'hammeradapter',
	'events/dispatcher',
	'collections/playlists',
	'models/playlist',
	'views/playlist/playlistitem'
], function( $, _, Backbone, Hammeradapter, Dispatcher, PlaylistCollection, PlaylistModel, PlaylistItemView ) {

		var PlaylistView = Backbone.View.extend({

			el: 'section#playlists',

			events: {
				'keyup .search': 'onKeyUpSearchHandler'
			},

			hammerEvents: {
				'dragdown table': 'onTableDragDownHandler',
				'dragend table': 'onTableDragEndHandler'
			},

			initialize: function () {
				_.bindAll(this, 'render', 'onModelAddHandler', 'onKeyUpSearchHandler', 'onTableDragDownHandler', 'onTableDragEndHandler', 'onStateOnlineHandler');

				this.collection = new PlaylistCollection();
				this.collection.on('add', this.onModelAddHandler);

				Dispatcher.on('state:online', this.onStateOnlineHandler);
			},

			render: function() {
				return this;
			},

			onModelAddHandler: function(model) {
				$(this.el).find('table').append(new PlaylistItemView({model: model}).render().el);
			},

			onKeyUpSearchHandler: function(event) {
				console.log(event);
				this.collection.fetch({ 
					filter: {
						'name': event.currentTarget.value 
					}
				});
			},

			onTableDragDownHandler: function(event) {
				$(event.currentTarget).css({ marginTop: event.gesture.deltaY + 'px'});
			},

			onTableDragEndHandler: function(event) {
				$(event.currentTarget).animate({ marginTop: 0}, 150);
			},

			onStateOnlineHandler: function(args) {
				this.collection.fetch();
			}

		});

	return PlaylistView;

});