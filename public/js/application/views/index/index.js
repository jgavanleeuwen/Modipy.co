define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'events/mopidy',
	'views/playlist/playlist',
	'views/tracklist/tracklist',
	'views/playback/current'
], function($, _, Backbone, App, GetBootstrap, Modernizr, Dispatcher, Mopidy, PlaylistView, TracklistView, CurrentView) {
		var indexView = Backbone.View.extend({
			el: 'body',

			initialize: function() {
				_.bindAll(this, 'render');

				this.template = this.$el.html();
				this.tracklistView = new TracklistView();
				this.playlistView = new PlaylistView();
				this.currentView = new CurrentView();
				
				Mopidy.connect();
			},

			render: function() {
				App.router.navigate('playlists');

				return this;
			}

		});
		
		return new indexView();
	});