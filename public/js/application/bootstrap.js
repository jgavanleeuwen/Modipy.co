require.config({
	paths: {
		// Libs
		jquery: 'http://code.jquery.com/jquery-latest',
		underscore: '../libs/underscore/underscore.min',
		backbone: '../libs/backbone/backbone.min',

		// Hammer
		hammer: '../plugins/hammer/jquery.hammer.min',
		hammeradapter: '../plugins/hammer/backbone.hammer',

		// Twitter Bootstrap
		getbootstrap: '../plugins/bootstrap/bootstrap.min',

		// Modernizr
		modernizr: 'http://modernizr.com/downloads/modernizr-latest'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		getbootstrap: {
			deps: ['jquery']
		},
		hammer : {
			deps: ['jquery']
		},
		hammeradapter: {
			deps: ['jquery', 'hammer']
		}
	},
	deps: ["main"]
});