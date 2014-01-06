define([
	'underscore',
	'jquery',
	'backbone',
	'events/dispatcher'
	], function($, _, Backbone, Dispatcher) {

		var mopidy;

		mopidy = new Mopidy({ 
			webSocketUrl: 'ws://musicbox.local:6680/mopidy/ws/',
			autoConnect: false
		});

		mopidy.on(function(name, args) {
//			console.log(name);
//			console.log(args);
			Dispatcher.trigger(name, args);
		});

		return mopidy;

	});