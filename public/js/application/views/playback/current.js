define([
	'jquery',
	'underscore',
	'backbone',
	'hammeradapter',
	'events/mopidy',
	'events/dispatcher',
	'collections/tracks',
	'models/track',
	'text!views/playback/templates/currentview.html'
], function( $, _, Backbone, Hammer, Mopidy, Dispatcher, TrackCollection, TrackModel, Template ) {

		var CurrentView = Backbone.View.extend({

			el: 'section#current',
			side: 0,
			cur: 0,

			events: {
				'click i.fa-fast-backward': 'onPrevHandler',
				'click i.fa-fast-forward': 'onNextHandler',
				'click .progholder': 'onSeekHandler',
				'click i.toggle': 'onPlayPauseHandler'
			},

			hammerEvents: {
				'swipeleft .cube' : 'onNextHandler',
				'swiperight .cube': 'onPrevHandler',
				'swipe .cube-controls': 'onSwipeControlsHandler'
			},

			initialize: function () {
				_.bindAll(this, 'render', 'onStateOnlineHandler', 'onModelSyncHandler', 'onCollectionChangeHandler', 'onSwipeControlsHandler', 'onPlaybackChangedHandler', 'onSeekHandler', 'onPlayPauseHandler', 'onNextHandler', 'onPrevHandler', 'onTimer', 'onPlaybackStartedHandler');

				this.model = new TrackModel();
				this.model.on('change', this.onModelSyncHandler);
				
				this.template = Template;

				this.collection = new TrackCollection();
				this.collection.on('add', this.onCollectionChangeHandler);

				Dispatcher.on('state:online', this.onStateOnlineHandler);
				Dispatcher.on('event:trackPlaybackStarted', this.onPlaybackStartedHandler);
				Dispatcher.on('event:playbackStateChanged', this.onPlaybackChangedHandler);
			},

			render: _.once(function() {
				var self = this;
				this.$el.html(_.template(self.template, self.model.attributes));

				return this;
			}),

			onModelSyncHandler: function(model) {
				this.render();
			},

			onCollectionChangeHandler: function(model) {
				var self = this;
				model.fetch({
					success: function(model) {
						$(self.el).find('.cube').append('<div class="pane"><img src="' + model.get('album').image + '" /></div>');
					}
				});
			},

			onStateOnlineHandler: function(args) {
				var self = this;

				Mopidy.tracklist.getTracks()
					.then(function(tracks) {
						self.collection.set(tracks);
					});

				Mopidy.playback.getCurrentTrack()
					.then( function(track) {
						self.model.set(track);
					});

				Mopidy.playback.setVolume(20);

				console.log(Mopidy);
				this.onTimer();
			},

			onTimer: function() {
				var self = this;
				Mopidy.playback.getTimePosition()
					.then( function(time) {
						setTimeout(self.onTimer, 1000);
						$('.prog').animate({width: time / self.model.get('length') * 100 + '%'});
						$('.time').text(Math.floor(time / 60 / 1000) + ':' + Math.floor(time / 1000 % 60 ));
					});
			},

			onPrevHandler: function(event) {
				var self = this;
				if (this.cur !== 0) this.cur -= 1;
				
				$('.cube').css({ 'box-shadow': '0 5px 10px #000', 'transform': 'translateZ(-160px) rotateY(' + self.cur * -90 + 'deg)'});

				Mopidy.playback.previous();
			},

			onNextHandler: function(event) {
				var self = this;
				this.cur += 1;

				$('.cube').css({ 'transform': 'translateZ(-160px) rotateY(' + self.cur * -90 + 'deg)'});

				Mopidy.playback.next();
			},

			onSeekHandler: function(event) {
				var self = this;
				Mopidy.playback.seek( event.clientX / $(window).width() * self.model.get('length') );
			},

			onPlayPauseHandler: function(event) {
				if (this.model.get('state') === 'paused') {
					Mopidy.playback.play();
				} else {
					Mopidy.playback.pause();
				}
			},

			onPlaybackStartedHandler: function(args) {
				this.model.set(args.tl_track.track);
			},

			onPlaybackChangedHandler: function(args) {
				this.model.set({ state: args.new_state }, {silent: true});
				if (args.new_state == 'playing') $('.toggle').attr('class', 'fa toggle fa-pause');
				if (args.new_state == 'paused') $('.toggle').attr('class', 'fa toggle fa-play');
			},

			onSwipeControlsHandler: function(event) {
				if(event.gesture.direction === 'left')
					$('.cube-controls').css({ 'transform': 'translateZ(-160px) rotateY(-90deg)'});
				if(event.gesture.direction === 'right')
					$('.cube-controls').css({ 'transform': 'translateZ(-160px) rotateY(0deg)'});
			}
		});

	return CurrentView;

});