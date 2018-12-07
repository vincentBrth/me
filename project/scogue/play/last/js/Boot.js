var Game={};

Game.Boot = function(game){};

Game.Boot.prototype={
	init:function(){
		this.input.maxPointers=1;
		this.stage.disableVisibilityChange=true;
	},
	preload:function(){
		this.load.image('preloadBar','assets/images/UI/preloader.png');
		this.load.image('logo_white','assets/images/UI/logo_white.png');
	},
	create:function(){
		this.state.start('Preloader');
	}
}