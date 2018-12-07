Game.Preloader=function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype = {
	preload:function(){
		//Loading screen
		this.stage.backgroundColor='#000';
		this.logo = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo_white');
		this.logo.anchor.setTo(0.5,0.5);
		this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY + 150,'preloadBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming=true;
		this.load.setPreloadSprite(this.preloadBar,0);
		
		//Load of ALL assets
		//*********************** UI *************************
		this.load.image('coin','assets/images/UI/coin.png');
		this.load.image('damage','assets/images/UI/damage.png');
		this.load.image('armor','assets/images/UI/armor.png');
		this.load.image('speed','assets/images/UI/speed.png');
		this.load.image('heart','assets/images/UI/heart.png');
		this.load.image('glory','assets/images/UI/glory.png');
		this.load.image('paused-display','assets/images/UI/paused.png');
		this.load.spritesheet('audio-button','assets/images/UI/audio-button.png',35,35);
		this.load.spritesheet('pause-button','assets/images/UI/pause-button.png',35,35);
		
		//*********************** Audio *************************
		this.load.audio('Boss Theme', 'assets/audio/theme/Boss Theme.mp3');
		this.load.audio('Boss Desert Theme', 'assets/audio/theme/Desert Theme.mp3');
		this.load.audio('Dungeon Theme', 'assets/audio/theme/Dungeon Theme.mp3');	
		this.load.audio('Grasslands Theme', 'assets/audio/theme/Grasslands Theme.mp3');
		this.load.audio('Iceland Theme', 'assets/audio/theme/Iceland Theme.mp3');
		this.load.audio('Intro Theme', 'assets/audio/theme/Intro Theme.mp3');
		this.load.audio('Mushroom Theme', 'assets/audio/theme/Mushroom Theme.mp3');
		this.load.audio('Worldmap Theme', 'assets/audio/theme/Worldmap Theme.mp3');
		this.load.audio('Splash', 'assets/audio/theme/Splash.mp3');
		this.load.audio('Ambient Dreamscape', 'assets/audio/theme/Ambient Dreamscape.wav');
		this.load.audio('Attack', 'assets/audio/player/Attack.mp3');
		this.load.audio('Jump', 'assets/audio/player/Jump.wav');
		this.load.audio('Hurt', 'assets/audio/player/Hurt.wav');
		
		//*********************** Player *************************
		this.load.spritesheet('player','assets/images/UI/player.png',24,26);
		this.load.image('hammer01','assets/images/weapons/hammer01.png');
		this.load.image('hammer02','assets/images/weapons/hammer02.png');
		this.load.image('hammer03','assets/images/weapons/hammer03.png');
		this.load.image('hammer04','assets/images/weapons/hammer04.png');
		this.load.image('sword01','assets/images/weapons/sword01.png');
		this.load.image('sword02','assets/images/weapons/sword02.png');
		this.load.image('sword03','assets/images/weapons/sword03.png');
		this.load.image('sword04','assets/images/weapons/sword04.png');
		this.load.image('axe01','assets/images/weapons/axe01.png');
		this.load.image('axe02','assets/images/weapons/axe02.png');
		this.load.image('axe03','assets/images/weapons/axe03.png');
		this.load.image('axe04','assets/images/weapons/axe04.png');
		this.load.image('bow01','assets/images/weapons/bow01.png');
		this.load.image('arrow01','assets/images/weapons/arrow01.png');
		this.load.image('bow02','assets/images/weapons/bow02.png');
		this.load.image('arrow02','assets/images/weapons/arrow02.png');
		this.load.image('bow03','assets/images/weapons/bow03.png');
		this.load.image('arrow03','assets/images/weapons/arrow03.png');
		this.load.image('bow04','assets/images/weapons/bow04.png');
		this.load.image('arrow04','assets/images/weapons/arrow04.png');
		
		//*********************** Tutorial *************************
		//Map
		this.load.tilemap('tutorial-map','assets/images/tutorial/tutorial.json',null,Phaser.Tilemap.TILED_JSON);
		this.load.image('tutorial-tileset','assets/images/tutorial/tutorial-tileset.png');
		//Backgrounds
		this.load.image('computer_key_1','assets/images/tutorial/background/computer_key_1.png');
		this.load.image('computer_key_2','assets/images/tutorial/background/computer_key_2.png');
		this.load.image('computer_key_3','assets/images/tutorial/background/computer_key_3.png');
		this.load.image('computer_key_4','assets/images/tutorial/background/computer_key_4.png');
		this.load.image('computer_key_A','assets/images/tutorial/background/computer_key_A.png');
		this.load.image('computer_key_D','assets/images/tutorial/background/computer_key_D.png');
		this.load.image('computer_key_Down','assets/images/tutorial/background/computer_key_Down.png');
		this.load.image('computer_key_Left','assets/images/tutorial/background/computer_key_Left.png');
		this.load.image('computer_key_P','assets/images/tutorial/background/computer_key_P.png');
		this.load.image('computer_key_Q','assets/images/tutorial/background/computer_key_Q.png');
		this.load.image('computer_key_Right','assets/images/tutorial/background/computer_key_Right.png');
		this.load.image('computer_key_Up','assets/images/tutorial/background/computer_key_Up.png');
		this.load.image('computer_key_W','assets/images/tutorial/background/computer_key_W.png');
		this.load.image('computer_key_Z','assets/images/tutorial/background/computer_key_Z.png');
		//Monsters
		//Objects	
		//*********************** Level 1 *************************
		//Map
		this.load.tilemap('level1-map','assets/images/level1/level1.json',null,Phaser.Tilemap.TILED_JSON);
		this.load.image('level1-tileset','assets/images/level1/level1-tileset.png');
		//Backgrounds
		//Monsters
		this.load.spritesheet('jelly','assets/images/level1/monsters/jelly.png',32,32);
		this.load.spritesheet('gomba','assets/images/level1/monsters/gomba.png',64,64);
		this.load.image('iceMonster','assets/images/level1/monsters/iceMonster.png');
		this.load.image('wall','assets/images/level1/monsters/wall.png');
		//Objects
		this.load.image('spike','assets/images/level1/objects/spike.png');
		this.load.image('box','assets/images/level1/objects/box.png');
		this.load.image('chest','assets/images/level1/objects/chest.png');
		//*********************** Level 2 *************************
		//*********************** Level 3 *************************	
	},
	create:function(){
		console.log('Preload Done');
		this.state.start('MainMenu');
	}
	
}