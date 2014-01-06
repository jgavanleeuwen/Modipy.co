define([
	'underscore',
	'backbone',
	'models/track'
	], function( _, Backbone, TrackModel ) {

		var TracksCollection = Backbone.Collection.extend({

			model: TrackModel

		});

		return TracksCollection;

});