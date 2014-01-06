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
				'playlists/:id': 'onPlaylistChange',
				'playlists/:pl/tracks/:tr': 'onTrackChange',
				'*actions' : 'index'
			},

			// Actions
			onPlaylistChange: function(id) {
				Dispatcher.trigger('change:playlist', { 
					uri: 'spotify:user:duhjeroen:playlist:' + id
				});
			},

			onTrackChange: function(playlist, track) {
				Dispatcher.trigger('change:track', { 
					list: 'spotify:user:duhjeroen:playlist:' + playlist,
					uri: 'spotify:user:duhjeroen:track:' + track
				});
			},

			index: function() {
				IndexView.render();
			}

		});

		return AppRouter;
	});
