define([
	'jquery',
	'underscore',
	'backbone',
	'hammeradapter',
	'events/dispatcher',
	'collections/tracks',
	'models/playlist',
	'views/tracklist/tracklistitem'
], function( $, _, Backbone, Hammeradapter, Dispatcher, TrackCollection, PlaylistModel, TracklistItemView ) {

		var TracklistView = Backbone.View.extend({

			el: 'section#tracklist',

			initialize: function(attributes) {
				_.bindAll(this, 'render', 'onPlaylistChangeHandler', 'onModelAddHandler');

				this.model = new PlaylistModel();
				this.model.on('add', this.onModelAddHandler);

				Dispatcher.on('change:playlist', this.onPlaylistChangeHandler);
			},

			render: function() {
				var self = this;

				return this;
			},

			onPlaylistChangeHandler: function(args) {
				this.model.fetch({
					uri: args.uri,
					error: function(model, response, options) {
						console.log('ERROR');
					}
				});
			},

			onModelAddHandler: function(model) {
				$(this.el).find('table').append(new TracklistItemView({model: model}).render().el);
			}

		});

	return TracklistView;

});