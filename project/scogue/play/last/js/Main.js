window.onload=function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,'content-game');
	console.info('Game Launched in : '+game.width+'x'+game.height);			
	game.state.add('Boot',Game.Boot);
	game.state.add('Preloader',Game.Preloader);
	game.state.add('MainMenu',Game.MainMenu);
	game.state.add('Upgrade',Game.Upgrade);
	game.state.add('Tutorial',Game.Tutorial);
	game.state.add('Level1',Game.Level1);
				
	game.state.start('Boot');
}