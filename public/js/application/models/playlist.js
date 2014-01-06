define([
	'underscore',
	'backbone',
	'events/mopidy',
	'collections/tracks'
	], function( _, Backbone, Mopidy, TrackCollection) {
		var PlaylistModel = Backbone.Model.extend({

			idAttribute: 'uri',

			defaults: {
				'state': 'default'
			},

			initialize: function( attributes ) {

			},

			parse: function(response) {
				var self = this;
				if (typeof this.trackCollection === 'undefined') {
					this.trackCollection = new TrackCollection();
					this.trackCollection.on('add', function(m) {
						self.trigger('add', m);
					});
				}

				this.trackCollection.set(response.tracks);
				
				return response;
			},

			sync: function( method, model, options) {
				Mopidy.playlists.lookup(options.uri)
					.then( function(playlist){ 
						if (options.success) options.success(playlist);
					}, function(error) {
						if (options.error) options.error(error);
					});
			}

		});
		
		return PlaylistModel;
	});