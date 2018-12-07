Game.Level1=function(game){};

Game.Level1.prototype={
	
	create:function(game){		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Map
		map = new newMap(game);
		map.create('level1-map','level1-tileset','Tile Layer 1',0,100,'#3A5962');
	
		//Player
		if(typeof player == "undefined"){
			player = new newPlayer(game);
			player.setSpawn(100,250);
			player.init();
			player.create();
		}else{
			//Revive the player with the new stats
			var stats =player.saveStats();
			delete player;
			player=new newPlayer(game);
			player.setSpawn(100,250);
			player.init();
			player.newStats(stats);
			delete stats;
			player.create();
		}
	
		//Monsters
		iceMonster = new newIceMonster(game);
		iceMonster.setSpawn(300,350);
		iceMonster.setDistance(90);
		iceMonster.setHpMax(30);
		iceMonster.setHp();
		iceMonster.create();
		
		iceMonster2 = new newIceMonster(game);
		iceMonster2.setSpawn(400,390);
		iceMonster2.setCoins(125);
		iceMonster2.setDistance(50);
		iceMonster2.create();
		
		jelly = new newJelly(game);
		jelly.setSpawn(200,550);
		jelly.create();
		
		wall= new newWall(game);
		wall.setSpawn(200,320);
		wall.setDistance(80);
		wall.create();
		wall.setDimensions(0.4);
		
		//Object
		box = new newBox(game);
		box.setSpawn(488,450);
		box.create();
		
		chest = new newChest(game);
		chest.setSpawn(100,177);
		chest.create();
	
		spike = new newSpike(game);
		spike.setSpawn(230,180);
		spike.create();
		
		//UI
		ui = new newUI(game);
		ui.create();
		
		//Audio
		audio = new newAudio(game,'Splash',0.3,true);
	},
	update:function(){
		//Environment
		ui.update();
		audio.update();
		//Character
		iceMonster.update();
		iceMonster2.update();
		jelly.update();
		box.update();
		chest.update();
		spike.update();
		wall.update();
		player.update();
	},
};


