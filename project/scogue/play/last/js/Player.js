function newPlayer(game){
	this.game=game;
	this.weapon={
			name:'undefined',
			sprite:undefined,
			firerate:0,
			speed:0,
			counter:0,
			damage:undefined,
			damageFactor:1,
			projectile:undefined,
			projectileSprite:undefined,
			music:undefined,
		};
	this.jump={
			height:0,
			counter:0,
			time:0,
			music:undefined,
		};
	this.timeElapsed={
			h:0,
			m:0,
			s:0,
		};
	newCharacter.call(this,game); //Player is extended of character
	
	//**************************GETTER***********************************
	/*
		Return the type of the weapon used
	*/
	this.getWeapon = function(){
		return this.weapon;
	};
	
	/*
		Return the jump height
	*/
	this.getJumpHeight = function (){
		return this.jump.height;
	};
	
	/*
		Return the time between 2 jump
	*/
	this.getJumpTime = function(){
		return this.jump.time;
	};
	
	/*
		Return the jump counter
	*/
	this.getJumpCounter=function(){
		return this.jump.counter;
	};
	
	/*
		Return if the jump is available
	*/
	this.getJump = function(){
		return (this.game.time.now > this.getJumpCounter());
	};
	
	/*
		Return the type of keyboard selected
	*/
	this.getKeyboard = function (){
		return game.keyboard;
	};
	
	/*
		Return the timeElapsed of the game
	*/
	this.getTimeElasped = function(){
		return this.timeElapsed;
	};
	
	/*
		Return the timeElapsed in seconds
	*/
	this.getTimeElaspedSeconds = function(){
		return (this.timeElapsed.h*3600+this.timeElapsed.m*60+this.timeElapsed.s);
	};
		
	//**************************SETTER***********************************
	/*
		Set the type of weapon used
	*/
	this.setWeapon = function(weapon){
		if(weapon=='hammer'){
			this.weapon.name='hammer';
			this.weapon.firerate=0;
			this.weapon.speed=0.1;
			this.damageFactor=1;
			this.createWeapon();
		}else if(weapon=='sword'){
			this.weapon.name='sword';
			this.weapon.firerate=1000;
			this.weapon.speed=0.05;
			this.damageFactor=0.7;
			this.createWeapon();
		}else if(weapon=='axe'){
			this.weapon.name='axe';
			this.weapon.firerate=1000;
			this.weapon.speed=0.05;
			this.damageFactor=1.25;
			this.createWeapon();
		}else if(weapon=='bow'){
			this.weapon.name='bow';
			this.weapon.firerate=500;
			this.weapon.speed=1;
			this.damageFactor=0.4;
			this.createWeapon();
		}else{
			console.error('weapon is undefined');
		}
		this.setWeaponDamage(this.getDamage()*this.damageFactor);
		console.info(this.weapon.name + ' is equiped');
	};
	
		/*
		Create the sprite of the current weapon used
	*/
	this.createWeapon = function(){
		//Remove var if already created
		if(typeof this.weapon.sprite != 'undefined'){
			this.weapon.sprite.kill();
			delete this.weapon.sprite;
		}
		if(typeof this.weapon.music != 'undefined'){
			delete this.weapon.music;
		}
		//Select the weapon used
		if(this.weapon.name=='hammer'){ //Hammer
			//Add Hammer music
			this.weapon.music = game.add.audio('Attack',1.3);
			//Create Hammer
			if(this.getDamage() >40){
				this.weapon.sprite=this.game.add.sprite(0,0,'hammer04');
			}else if(this.getDamage() > 25){
				this.weapon.sprite=this.game.add.sprite(0,0,'hammer03');
			}else if(this.getDamage()>15){
				this.weapon.sprite=this.game.add.sprite(0,0,'hammer02');
			}else {
				this.weapon.sprite=this.game.add.sprite(0,0,'hammer01');
			}
			this.weapon.sprite.scale.setTo(0.5);
			this.weapon.sprite.anchor.setTo(0.5);
			this.weapon.sprite.pivot.y=30;	

		}else if(this.weapon.name=='sword'){	//Sword
			//Add Sword music
			this.weapon.music = game.add.audio('Attack',1.3);
			//Create the Sword
			if(this.getDamage() >40){
				this.weapon.sprite=this.game.add.sprite(0,0,'sword04');
			}else if(this.getDamage() > 25){
				this.weapon.sprite=this.game.add.sprite(0,0,'sword03');
			}else if(this.getDamage()>15){
				this.weapon.sprite=this.game.add.sprite(0,0,'sword02');
			}else {
				this.weapon.sprite=this.game.add.sprite(0,0,'sword01');
			}
			this.weapon.sprite.scale.setTo(0.4);
			this.weapon.sprite.anchor.setTo(0.5);
			this.weapon.sprite.pivot.y=30;	
			
		}else if(this.weapon.name=='axe'){	//Axe
			//Add Axe music
			this.weapon.music = game.add.audio('Attack',1.3);
			//Create the Axe
			if(this.getDamage() >40){
				this.weapon.sprite=this.game.add.sprite(0,0,'axe04');
			}else if(this.getDamage() > 25){
				this.weapon.sprite=this.game.add.sprite(0,0,'axe03');
			}else if(this.getDamage()>15){
				this.weapon.sprite=this.game.add.sprite(0,0,'axe02');
			}else {
				this.weapon.sprite=this.game.add.sprite(0,0,'axe01');
			}
			this.weapon.sprite.scale.setTo(0.5);
			this.weapon.sprite.anchor.setTo(0.5);
			this.weapon.sprite.pivot.y=30;	
			
		}else if(this.weapon.name=='bow'){	//Bow
			//Add Bow music
			this.weapon.music = game.add.audio('Attack',1.3);
			//Create the Bow
			if(this.getDamage() >40){
				this.weapon.sprite=this.game.add.sprite(0,0,'bow04');
				this.weapon.projectileSprite='arrow04';
			}else if(this.getDamage() > 25){
				this.weapon.sprite=this.game.add.sprite(0,0,'bow03');
				this.weapon.projectileSprite='arrow03';
			}else if(this.getDamage()>15){
				this.weapon.sprite=this.game.add.sprite(0,0,'bow02');
				this.weapon.projectileSprite='arrow02';
			}else {
				this.weapon.sprite=this.game.add.sprite(0,0,'bow01');
				this.weapon.projectileSprite='arrow01';
			}
			this.weapon.sprite.scale.setTo(0.3);
			this.weapon.sprite.anchor.setTo(0.5);
			this.weapon.sprite.pivot.y=10;
			this.weapon.sprite.pivot.x=-50;
			//Create the Arrow
			this.weapon.projectile = game.add.group();
			this.weapon.projectile.enableBody=true;
			this.game.physics.enable(this.weapon.projectileSprite,Phaser.Physics.ARCADE);
			this.weapon.projectile.physicsBodyType=Phaser.Physics.ARCADE;
			this.weapon.projectile.createMultiple(10,this.weapon.projectileSprite);
			this.weapon.projectile.setAll('anchor.x',0.5);
			this.weapon.projectile.setAll('anchor.y',0.5);
			this.weapon.projectile.setAll('scale.x',0.3);
			this.weapon.projectile.setAll('scale.y',0.3);
			this.weapon.projectile.setAll('outOfBoundsKill',true);
			this.weapon.projectile.setAll('checkWorldBounds',true);
		}
		//Adjust to the player
		if(typeof this.getSpriteDisplay() !='undefined'){
			this.weapon.sprite.x=this.getSpriteDisplay().x;
			this.weapon.sprite.y=this.getSpriteDisplay().y;
			//Display the player sprite in foreground of weapon
			x = this.getSpriteDisplay().x;
			y = this.getSpriteDisplay().y;
			this.createSprite();
			this.getSpriteDisplay().x=x;
			this.getSpriteDisplay().y=y;
		}
	};

	/*
		@Override setDamage to update the weapon used
	*/
	this.setDamage = function(damage){
		if(isNaN(damage)==false || damage==null){
			this.stats.damage=Math.round(damage);
			this.createWeapon();
		}else{
			console.error('Damage inserted isn\'t  a number');
		}
	};
	
	/*
		Set the damage of the player in fuction of the weapon used
	*/
	this.setWeaponDamage=function(damage){
		if(isNaN(damage)==false || damage==null){
			this.weapon.damage=Math.round(damage);
			this.createWeapon();
		}else{
			console.error('Damage inserted isn\'t  a number');
		}
	};
	
	/*
		@Override Set armor to display the armorReduction value in the console
	*/
	this.setArmor = function(armor){
		if(isNaN(armor)==false || armor==null){
			this.stats.armor.amount=Math.round(armor);
			this.stats.armor.reduction=1-(100/(100+this.stats.armor.amount*5));
			console.info('Player Armor Reduction: '+this.stats.armor.reduction*100+'%');
		}else{
			console.error('Armor inserted isn\'t  a number');
		}
	};
	
	/*
		Set jump height
	*/
	this.setJumpHeight = function(height){
		if(isNaN(height)==false){
			this.jump.height=height;
		}else{
			console.error('Height jump inserted isn\'t a number');
		}
	}
	
	/*
		Set delay between 2 jump
	*/
	this.setJumpTime = function(time){
		if(isNaN(time)==false){
			this.jump.time=time;
		}else{
			console.error('JumpTime inserted isn\'t a number');
		}
	};
	
	/*
		Set the counter of the jump, if 'counter' entry is null, the value is based of jump.time
	*/	
	this.setJumpCounter = function(counter){
		if(typeof counter != 'undefined'){
			if(isNaN(counter)==false){
				this.getJumpCounter()=this.game.time.now+counter;
			}else{
				console.error('Counter inserted isn\'t a number');
			}
		}else{
			this.jump.counter=this.game.time.now+this.getJumpTime();
		}
	};
	/*
		Set the timeElapsed
	*/
	this.setTimeElapsed= function(s,m,h){
		//Control value
		if(isNaN(s) ||s == null){
			s=0;
		}
		if(isNaN(m) || m == null){
			m=0;
		}
		if(isNaN(h) || h == null){
			h=0;
		}
		
		//Control Data
		if( s >= 60){
			m+=(s-(s%60))/60;
			s=s%60;
		}
		if(m >=60){
			h+=(m-(m%60))/60;
			m=m%60;
		}
		if(h >=24){
			h=h%24;
		}
		this.timeElapsed.s=s;
		this.timeElapsed.m=m;
		this.timeElapsed.h=h;
	};
	
	/*
		Set the type of keyboard selected to play
	*/
	this.setKeyboard = function(keyboard){
		if(keyboard=="AZERTY" || keyboard=="azerty"){
			this.keyboard="AZERTY";
			console.info("AZERTY Keyboard Selectected");
		}else if(keyboard=="QWERTY" || keyboard=="qwerty"){
			this.keyboard="QWERTY"
			console.info("QWERTY Keyboard Selected");
		}else{
			this.keyboard="QWERTY";
			console.info("QWERTY Keyboard Selected by default");
		}
	};
	
	//**************************Functions***********************************
	/*
		Display the timeElapsed in the UI
	*/
	this.startTimeElapsed = function(){
		//counter
		var loop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimeElapsed, this);
	};
	
	/*
		Called by 'timeElapsed' to increment and update the timer value timeElapsed
	*/
	this.updateTimeElapsed= function() {
		this.timeElapsed.s++;

		if(this.timeElapsed.s >= 60){
			this.timeElapsed.m++
			this.timeElapsed.s=0;
		}
		if(this.timeElapsed.m>=60){
			this.timeElapsed.h++;
			this.timeElapsed.m=0;
		}
	};
	
	/*
		update the sprite and the animation of the weapon used
	*/
	this.updateWeapon = function(){
		if(typeof this.getSpriteDisplay() != 'undefined'){
			this.weapon.sprite.x=this.getSpriteDisplay().x;
			this.weapon.sprite.y=this.getSpriteDisplay().y;
			
			if(this.weapon.name == 'hammer'){	//Hammer
				if(this.controls.attack.isDown){
					if(typeof ui !='undefined' && ui.getAudio()){
						this.weapon.music.play();
					}else if(typeof ui =='undefined'){
						console.error('UI is undefined');
					}
					this.weapon.sprite.visible=true;
					if(this.getSpriteDisplay().scale.x > 0){
						this.weapon.sprite.rotation+=this.weapon.speed;
						if(this.weapon.sprite.rotation>2){
							this.weapon.sprite.visible=false;
						}
					}else{
						this.weapon.sprite.rotation-=this.weapon.speed;
						if(this.weapon.sprite.rotation<-2){
							this.weapon.sprite.visible=false;
						}
					}
				}else{
					this.weapon.sprite.visible=false;
					this.weapon.sprite.rotation=0;
				}
			}else if(this.weapon.name=='sword'){	//Sword
				if(this.game.time.now > this.weapon.counter){	
					if(this.controls.attack.isDown){
						if(typeof ui !='undefined' && ui.getAudio()){
							this.weapon.music.play();
						}else if(typeof ui =='undefined'){
							console.error('UI is undefined');
						}
						this.weapon.sprite.visible=true;
						this.weapon.sprite.rotation=0.5;
						if(this.getSpriteDisplay().scale.x > 0){
							this.weapon.sprite.rotation=1;
							this.weapon.sprite.scale.setTo(0.4);
							if(this.weapon.speed <0){
								this.weapon.speed=-this.weapon.speed;
							}
						}else{
							this.weapon.sprite.rotation=2.5;
							this.weapon.sprite.scale.setTo(0.4,-0.4);
							if(this.weapon.speed >0){
								this.weapon.speed=-this.weapon.speed;
							}
						}
						this.weapon.counter=this.game.time.now+this.weapon.firerate;
					}else{
						this.weapon.sprite.visible=false;
					}
				}else{
					if(this.weapon.speed >0){
						if(this.weapon.sprite.rotation<2){
							this.weapon.sprite.rotation+=this.weapon.speed;
						}else{
							this.weapon.sprite.visible=false;
						}
					}else{
						if(this.weapon.sprite.rotation>1){
							this.weapon.sprite.rotation+=this.weapon.speed;
						}else{
							this.weapon.sprite.visible=false;
						}
					}
				}
			}else if(this.weapon.name=='axe'){	//Axe
				if(this.game.time.now > this.weapon.counter){
					if(this.controls.attack.isDown){
						if(typeof ui !='undefined' && ui.getAudio()){
							this.weapon.music.play();
						}else if(typeof ui =='undefined'){
							console.error('UI is undefined');
						}
						this.weapon.sprite.visible=true;
						if(this.getSpriteDisplay().scale.x >0){
							this.weapon.sprite.rotation=2;
							if(this.weapon.speed>0){
								this.weapon.speed=-this.weapon.speed;
							}
						}else{
							this.weapon.sprite.rotation=-2;
							if(this.weapon.speed<0){
								this.weapon.speed=-this.weapon.speed;
							}
						}
						this.weapon.counter=this.game.time.now+this.weapon.firerate;
					}else{
						this.weapon.sprite.visible=false;
					};
				}else{
					this.weapon.sprite.rotation+=this.weapon.speed;
				}
			}else if(this.weapon.name=='bow'){	//Bow
				if(this.controls.attack.isDown){
					this.weapon.sprite.visible=true;
					if(this.game.time.now>this.weapon.counter){
						if(typeof ui !='undefined' && ui.getAudio()){
							this.weapon.music.play();
						}else if(typeof ui =='undefined'){
							console.error('UI is undefined');
						}
						if(this.getSpriteDisplay().scale.x>0){
							if(this.weapon.speed<0){
								this.weapon.speed=-this.weapon.speed;
							}
							this.weapon.projectile.setAll('angle',90);
							this.weapon.sprite.angle=0;
							this.weapon.sprite.pivot.y=10;;
						}else{
							if(this.weapon.speed>0){
								this.weapon.speed=-this.weapon.speed;
							}
							this.weapon.projectile.setAll('angle',-90);
							this.weapon.sprite.angle=-180;
							this.weapon.sprite.pivot.y=-10;
						}
						projectile=this.weapon.projectile.getFirstExists(false);
						if(projectile){
							projectile.reset(player.getSpriteDisplay().x,player.getSpriteDisplay().y);
							projectile.body.velocity.y=-300;
							projectile.body.velocity.x=600*this.weapon.speed;
							this.game.physics.arcade.collide(this.weapon.projectileSprite, layer,function(){
									console.log('eee');
									//projectile.kill();
							},null, this);
							this.weapon.counter=this.game.time.now + this.weapon.firerate;
						
						}
					}
					//for(i=0;i<this.getWeapon().projectile.children.length;i++){
						
						//if(this.getWeapon().projectile.children[i].alive && this.getWeapon().projectile.children[i].overlap(layer)){
						//	this.getWeapon().projectile.children[i].kill();
						//}
					//}
				}else{
					this.weapon.sprite.visible=false;
				}
			}else{
				console.error('Weapon is undefined');
			}
		}else{
			console.error('Sprite of the player is undefined');
		}
	};
	
	/*
		@Override alive() of 'character',If the player is dead, the game is over
	*/
	this.alive=function(){
		if(this.getHp()<=0){
			game.state.start('Upgrade');
			console.info('Player is Dead');
		}
	};
	
	/*
		@Override Create the Sprite to add player animation
	*/
	this.createSprite = function(){
		//Remove var if already created
		if(typeof this.sprite.display != 'undefined'){
			this.sprite.display.kill();
			delete this.sprite.display;
		}
		this.sprite.display=this.game.add.sprite(this.getSpawn().x,this.getSpawn().y,this.getSpriteImage());
		this.sprite.display.anchor.setTo(0.5);
		this.game.camera.follow(this.sprite.display);
		//Physics
		this.game.physics.enable(this.sprite.display,Phaser.Physics.ARCADE);
		this.sprite.display.body.collideWorldBounds = true;
		//Animations
		this.sprite.display.animations.add('idle',[0,1],1,true);
		this.sprite.display.animations.add('jump',[2],1,true);
		this.sprite.display.animations.add('run',[3,4,5,6,7,8],7,true);
	};
	
	/*
		Init the player stats
	*/
	this.init = function(){
		this.setName('Player');
		this.setHpMax(50);
		this.setHp(this.getHpMax());
		this.setMusic('Hurt',0.1);
		this.setDamage(10);
		this.setWeapon('hammer');
		this.setJumpHeight(600);
		this.setJumpTime(750);
		this.jump.music = game.add.audio('Jump',0.1);
		this.setCoins(0);
		this.setArmor(1);
		this.setSpeed(150);
		this.setGravity(1400);
		this.setInvulnerabilityTime(800);
		this.setScore(0);
		this.setSpriteImage('player');
		this.setKeyboard(this.getKeyboard());
		console.info('Player stats initialized');
	};
	
	/*
		Return the main stats of the player
	*/
	this.saveStats = function(){
		return {weapon:this.getWeapon().name,keyboard:this.getKeyboard(),hpMax:this.getHpMax(),hp:this.getHp(),damage:this.getDamage(),armor:this.getArmor(),speed:this.getSpeed(),jumpH:this.getJumpHeight(),jumpT:this.getJumpTime()};
	};
	
	/*
		Erase the stats, used to restore the saved stats when a new player is created
	*/
	this.newStats = function(stats){
		this.setKeyboard(stats.keyboard);
		this.setCoins(0);
		this.setScore(0);
		this.setHpMax(stats.hpMax);
		if(stats.hp<=0){
			this.setHp(this.getHpMax());
		}else{
			this.setHp(stats.hp);
		}
		this.setDamage(stats.damage);
		this.setWeapon(stats.weapon);
		this.setArmor(stats.armor);
		this.setSpeed(stats.speed);
		this.setJumpHeight(stats.jumpH);
		this.setJumpTime(stats.jumpT);
		console.info('Player stats erased');
	};
	
	/*
		Create the player
	*/
	this.create = function(){
		//Create new player
		this.createSprite();
		this.startTimeElapsed();
		console.log('Player Created');
	};

	/*
		Player update
	*/
	this.update = function(){
		if(typeof this.getSpriteDisplay() != 'undefined'){
			//Define colision
			this.getSpriteDisplay().body.velocity.x=this.getVelocity();
			this.game.physics.arcade.collide(this.getSpriteDisplay(),layer);
			
			//Select the keyboard used
			if(this.keyboard=="AZERTY" || this.keyboard=="azerty"){ //Default Keyboard
				this.controls={
					//AZERTY
					right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
					left: this.game.input.keyboard.addKey(Phaser.Keyboard.Q),
					up: this.game.input.keyboard.addKey(Phaser.Keyboard.Z),
					attack: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
					weapon:weapon={
						hammer:this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
						bow:this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
						axe:this.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
						sword:this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
					}, 
					pause:this.game.input.keyboard.addKey(Phaser.Keyboard.P),
				}
			}else if(this.keyboard=="QWERTY" || this.keyboard=="qwerty"){
				this.controls={
					//QWERTY
					right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
					left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
					up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
					attack: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
					weapon:weapon={
						hammer:this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
						bow:this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
						axe:this.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
						sword:this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
					},
					pause:this.game.input.keyboard.addKey(Phaser.Keyboard.P),
					
				}
			}
			//Controls
			//Right
			if(this.controls.right.isDown){
				this.getSpriteDisplay().animations.play('run');
				this.getSpriteDisplay().scale.setTo(1,1);
				this.getSpriteDisplay().body.velocity.x += this.getSpeed();
			}
			
			//Left
			if(this.controls.left.isDown){
				this.getSpriteDisplay().animations.play('run');
				//flipping
				this.getSpriteDisplay().scale.setTo(-1,1);
				this.getSpriteDisplay().body.velocity.x -= this.getSpeed();
			}
			
			//Idle
			if(this.getSpriteDisplay().body.velocity.x == 0 && (this.getSpriteDisplay().body.onFloor() || this.getSpriteDisplay().body.touching.down) ){
				this.getSpriteDisplay().animations.play('idle');
			}
			
			//Jump
			if(this.controls.up.isDown && (this.getSpriteDisplay().body.onFloor() || this.getSpriteDisplay().body.touching.down) && this.getJump()){
				this.getSpriteDisplay().animations.play('jump');
				if(typeof ui != undefined && ui.getAudio()){
					this.jump.music.play();
				}else if(typeof ui == undefined){
					console.error('UI is undefined');
				}
				//jump delay
				this.getSpriteDisplay().body.velocity.y=-this.getJumpHeight();
				this.setJumpCounter();
				//= this.game.time.now+this.getJumpTime();
			}
			
			//Change Weapon
			if(this.controls.weapon.hammer.isDown && this.getWeapon().name != 'hammer'){
				this.setWeapon('hammer');
			}else if(this.controls.weapon.bow.isDown && this.getWeapon().name != 'bow'){
				this.setWeapon('bow');
			}else if(this.controls.weapon.axe.isDown && this.getWeapon().name != 'axe'){
				this.setWeapon('axe');
			}else if (this.controls.weapon.sword.isDown && this.getWeapon().name != 'sword'){
				this.setWeapon('sword');
			}
			
			//UI
			if(this.controls.pause.isDown && typeof ui != 'undefined'){
				ui.setPause(true);
			}
			//Attack
			this.updateWeapon();
			
			//Animation if the player is invulnerable
			this.updateInvulnerabilityDisplay();
			//Check if the player is alive
			this.alive();
		}else{
			console.error('Sprite of Player is undefined');
		}
	};
}

