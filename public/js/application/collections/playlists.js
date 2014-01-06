define([
	'underscore',
	'backbone',
	'events/mopidy',
	'models/playlist'
	], function( _, Backbone, Mopidy, PlaylistModel ) {

		var PlaylistsCollection = Backbone.Collection.extend({

			model: PlaylistModel,

			sync: function( method, model, options) {

				if(options.filter) {
					Mopidy.playlists.filter(options.filter)
						.then( function(playlists){ 
							if (options.success) options.success(playlists);
						}, function(error) {
							if (options.error) options.error(error);
						});
				} else {
					Mopidy.playlists.getPlaylists()
						.then( function(playlists){ 
							if (options.success) options.success(playlists);
						}, function(error) {
							if (options.error) options.error(error);
						});
				}
			}

		});

		return PlaylistsCollection;

});