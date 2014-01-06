define([
	'underscore',
	'backbone'
	], function( _, Backbone) {
		var TrackModel = Backbone.Model.extend({
			
			idAttribute: 'uri',

			defaults: {
				'state': 'default'
			},

			parse: function(response) {
				response.album.image = _.pluck(_.where(response.album.image, { size: 'extralarge' }), '#text');

				return response;
			},

			urlRoot: 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=33f2759ee5c08d183e5b4f4122c71f8d&format=json',

			url: function() {
				var self = this;
				return this.urlRoot + '&artist=' + _.first(self.get('artists')).name + '&album=' + self.get('album').name;
			}
		});
		
		return TrackModel;
	});