Game.Tutorial=function(game){};

Game.Tutorial.prototype={
	
	create:function(game){		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Map
		map = new newMap(game);
		map.create('tutorial-map','tutorial-tileset','Tile Layer 1',0,100,'#3A5962');
	
		//Player
		if(typeof player == "undefined"){
			player = new newPlayer(game);
			player.setSpawn(100,400);
			player.init();
			player.create();
		}else{
			//Revive the player with the new stats
			var stats =player.saveStats();
			delete player;
			player=new newPlayer(game);
			player.setSpawn(100,400);
			player.init();
			player.newStats(stats);
			delete stats;
			player.create();
		}
		


		var LabelKeyboard =  function(game,string,sprite,scale,x,y,font){    
			if(font==null){
				font={font:"20px Arial",fill:"#fff",align:"center"};
			}
			text = game.add.text(x,y, string, font);
			text.anchor.setTo(0.5);
			key = game.add.sprite(text.x,text.y+50,sprite);
			key.scale.setTo(scale);
			key.anchor.setTo(0.5);
		};
		if(player.getKeyboard()=="AZERTY"){
			new LabelKeyboard(game,'Move Left','computer_key_Q',0.5,350,200);
			new LabelKeyboard(game,'Jump','computer_key_Z',0.5,550,200);
		}else{
			new LabelKeyboard(game,'Move Left','computer_key_A',0.13,350,200);	
			new LabelKeyboard(game,'Jump','computer_key_W',0.13,550,200);
		}
		new LabelKeyboard(game,'Move Right','computer_key_D',0.13,150,200);
		new LabelKeyboard(game,'Attack','computer_key_Up',0.7,750,200);
		new LabelKeyboard(game,'Equip Hammer','computer_key_1',0.5,950,200);
		new LabelKeyboard(game,'Equip Bow','computer_key_2',0.5,1150,100);
		new LabelKeyboard(game,'Equip Axe','computer_key_3',0.5,1350,70);
		new LabelKeyboard(game,'Equip Sword','computer_key_4',0.5,1800,80);
		new LabelKeyboard(game,'Pause','computer_key_P',0.13,2000,80);
		game.add.text(1860,300, 'Jump in the water to back at the menu', {font:"20px Arial",fill:"#fff",align:"center"});
		//Monsters
		jelly = new newJelly(game);
		jelly.setSpawn(550,400);
		jelly.setDistance(250);
		jelly.setDamage(1);
		jelly.create();
		//UI
		ui = new newUI(game);
		ui.create();
		//Audio
		audio = new newAudio(game,'Intro Theme',0.1,true);
	},
	update:function(){
		//Environment
		ui.update();
		audio.update();
		//Character
		jelly.update();
		player.update();
		if(player.getSpriteDisplay().x>1993 && player.getSpriteDisplay().x<2075 && player.getSpriteDisplay().y ==467){
			player.setHp(player.getHpMax());
			audio.stop();
			this.state.start('MainMenu');
		}
	},
};


