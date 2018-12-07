function newCharacter(game){
	this.game=game;
	this.name='undefinedName'
	this.sprite={
		display:undefined,
		image:'noImageSetted',
		spawn:spawn={
			x:0,
			y:0,
		},
		dimensions:dimensions={
			width: 0,
			height: 0,	
		},
		music:undefined,
	};
	this.stats={
		hp:hp={
			current:1,
			max:1,
			display:undefined,
		},
		armor:armor={
			amount:0,
			reduction:0,
		},
		coins:0,
		damage:0,
		velocity:0,
		speed:0,
		gravity:0,
		score:0,
	};
	this.invulnerability={
		counter:0,
		time:500,
	};

	//**************************GETTER***********************************
	/*
		Return the name given to this object
	*/
	this.getName = function(){
		return this.name;
	};
	
	/* 
		Return all the stats
	*/
	this.getStats = function(){
		return this.stats;
	};
	
	/*
		Return the sprite 
	*/
	this.getSpriteDisplay = function (){
		return this.sprite.display;
	};
	
	/*
		Return the image used by the sprite
	*/
	this.getSpriteImage = function(){
		return  this.sprite.image;
	};
	
	/*
		Return the current dimension
	*/
	this.getDimensions = function(){
		return this.sprite.dimensions;
	};
	
	/*
		Return if the body of the sprite is movable or not
	*/
	this.getImmovable = function(){
		return this.sprite.display.body.immovable;
	};
	
	/*
		Return the currentHP
	*/
	this.getHp = function (){
		return this.stats.hp.current;
	};
	
	/*
		Return the maxHp
	*/
	this.getHpMax = function (){
		return this.stats.hp.max;
	};
	
	/*
		Return the period of invulnerability
	*/
	this.getInvulnerabilityCounter = function(){
		return this.invulnerability.counter;
	};
	
	/*
		Return time which the object will be invulnerable
	*/
	this.getInvulnerabilityTime =function(){
		return this.invulnerability.time;
	};
	
	/*
		Return if the object is vulnerable or not
	*/
	this.getInvulnerability = function(){
		return !(this.game.time.now > this.invulnerability.counter);
	};
	
	/*
		Return the damage
	*/
	this.getDamage = function (){
		return this.stats.damage;
	};
	
	/*
		Return the velocity
	*/
	this.getVelocity = function (){
		return this.stats.velocity;
	};
	
	/*
		Return the gravity
	*/
	this.getGravity = function (){
		return this.stats.gravity;
	};
	
	/*
		Return the coins
	*/
	this.getCoins = function (){
		return this.stats.coins;
	};
	
	/*
		Return the armor
	*/
	this.getArmor = function (){
		return this.stats.armor.amount;
	};
	
	/*
		Return the armorReduction
	*/
	this.getArmorReduction = function (){
		return this.stats.armor.reduction;
	};
	
	/*
		Return the speed 
	*/
	this.getSpeed = function (){
		return this.stats.speed;
	};
	
	/*
		Return the spawn position
	*/
	this.getSpawn = function(){
		return this.sprite.spawn;
	};
	
	/*
		Return the score
	*/
	this.getScore = function(){
		return this.stats.score;
	};	
	
	/*
		Return the music when damaged
	*/
	this.getMusic = function(){
		return this.sprite.music;
	};
	
	//**************************SETTER***********************************
	/*
		Set the name of the objecty
	*/
	this.setName = function(name){
		if(typeof name != 'undefined'){
			this.name=name;
		}
	};
	
	/*
		Set the image of the sprite
	*/
	this.setSpriteImage = function(image){
		if(typeof image != 'undefined'){
			this.sprite.image=image;
		}
	};
	
	/*
		Set the sprite dimensions
	*/
	this.setDimensions = function(width,height){
		if(typeof width != 'undefined' && typeof height !='undefined'){
			if(isNaN(width) == false && isNaN(height)==false){
				this.getSpriteDisplay().width=width;
				this.getSpriteDisplay().height=height;
			}else{
				console.error('Dimension inserted aren\'t numbers');
			}
		}else{
			if(typeof width != 'undefined'){
				if(isNaN(width)==false){
					this.getSpriteDisplay().scale.setTo(width);
				}else{
					console.error('Dimension inserted aren\'t numbers');
				}
			}else{
				console.error('At least one parameters is required');
			}
		} 
		this.sprite.dimensions.height =this.getSpriteDisplay().height;
		this.sprite.dimensions.width=this.getSpriteDisplay().width;
	};

	/*
		Set the body of the sprite movable or not, default value is false
	*/
	this.setImmovable = function(immovable){
		if(typeof immovable != 'undefined'){
			if(immovable==true || immovable==false){
				this.getSpriteDisplay().body.immovable=immovable;
			}else{
				console.error('Value inserted isn\'t  a boolean');
			}
		}else{
			this.getSpriteDisplay().body.immovable=!this.getSpriteDisplay().body.immovable;
		}
		//Remove velocity
		if(this.getSpriteDisplay().body.immovable){
			this.getSpriteDisplay().body.velocity.x=0;
			this.getSpriteDisplay().body.velocity.y=0;
		}
	};
	
	/*
		Set the currentHp of the character
	*/
	this.setHp =  function(hp){
		if(typeof hp != 'undefined'){
			if(isNaN(hp) == false){
				if(hp > this.getHpMax()){
					this.stats.hp.current=this.getHpMax();
				}else{
					this.stats.hp.current=Math.round(hp);
				}
			}else{
				console.error('Hp inserted isn\'t  a number');
			}
		}else{
			this.stats.hp.current = this.getHpMax();
		}
	};

	/*
		Set the hpMax
	*/
	this.setHpMax = function(hp){
		if(isNaN(hp)==false || hp ==null){
			if(hp<0){
				hp=-hp;
			}
			this.stats.hp.max=Math.round(hp);
			if(this.getHp() > this.getHpMax()){
				this.stats.hp.current=this.getHpMax();
			}
		}else{
			console.error('HpMax inserted isn\'t  a number');
		}
	};

	/*
		Set the invulnerabilityTime, the time which the object is invulnerable
	*/
	this.setInvulnerabilityTime = function(time){
		if(isNaN(time) == false){
			if(time >= 0){
				this.invulnerability.time=time;
			}else{
				this.invulnerability.time=-time;
			}
		}else{
			console.error('Time inserted isn\'t a number');
		}
	};
	
	/*
		Set the counter of invulnerability, if 'counter' entry is null, the value is based of invulnerability.time
	*/
	this.setInvulnerabilityCounter = function(counter){
		if(typeof counter != 'undefined'){
			if(isNaN(counter)==false){
				this.invulnerability.counter=this.game.time.now+counter;
			}else{
				console.error('Counter inserted isn\'t a number');
			}
		}else{
			this.invulnerability.counter=this.game.time.now+this.getInvulnerabilityTime();
		}
	};
	
	/*
		Set the object invulnerable for X miliseconds
	*/
	this.setInvulnerability=function(time){
		if(typeof time != 'undefined'){
			if(isNaN(time)==false){
				this.setInvulnerabilityCounter(time);
			}else{
				console.error('Time (ms) inserted isn\'t a number');
			}
		}else{
			console.error('Time inserted is undefined');
		}
	};
	/*
		Set the coins
	*/
	this.setCoins = function(coins){
		if(isNaN(coins)==false){
			if(coins<= 0 || coins== null){
				this.stats.coins=0;
			}else{
				this.stats.coins=Math.round(coins);
			}
		}else{
			console.error('Coins inserted isn\'t  a number');
		}
	};
	
	/*
		Set dammage
	*/
	this.setDamage = function(damage){
		if(isNaN(damage)==false || damage==null){
			this.stats.damage=Math.round(damage);
		}else{
			console.error('Damage inserted isn\'t  a number');
		}
	};
	
	/*
		Set armor
	*/
	this.setArmor = function(armor){
		if(isNaN(armor)==false || armor==null){
			this.stats.armor.amount=Math.round(armor);
			this.stats.armor.reduction=1-(100/(100+this.stats.armor.amount*5));
		}else{
			console.error('Armor inserted isn\'t  a number');
		}
	};

	/*
		Set velocity 
	*/
	this.setVelocity = function(velocity){
		if(isNaN(velocity)==false || velocity==null){
			this.stats.velocity=Math.round(velocity);
		}else{
			console.error('Velocity inserted isn\'t  a number');
		}
	};
	
	/*
		Set gravity, by default gravity is true
	*/
	this.setGravity = function(gravity){
		if(typeof gravity != 'undefined' && isNaN(gravity)==false){
			this.stats.gravity=Math.round(gravity);
			this.game.physics.arcade.gravity.y=this.stats.gravity;
		}else{
			console.error('Gravity inserted isn\'t  a number');
		}
	};
	
	/*
		Set the gravity allowed or not, by default it is true
	*/
	this.setGravityAllowed = function(gravity){
		if(typeof this.getSpriteDisplay() !='undefined'){
			if(typeof gravity != 'undefined'){
				if(gravity ==true || gravity ==false){
					this.getSpriteDisplay().body.allowGravity=gravity;
				}else{
					console.error('Value inserted isn\'t a Boolean');
				}
			}else{
				this.getSpriteDisplay().body.allowGravity=!this.getSpriteDisplay().body.allowGravity;
				}
		}else{
			console.error('Sprite is undefined');
		}
	};
	
	/*
		Set the speed
	*/
	this.setSpeed = function(speed){
		if(isNaN(speed)==false || speed==null){
			this.stats.speed=Math.round(speed);
		}else{
			console.error('Speed inserted isn\'t  a number');
		}
	};
	
	/*
		Set the spawn position 
	*/
	this.setSpawn= function(x,y){
		if(isNaN(x)==false || x==null){
			this.sprite.spawn.x=x;
		}else{
			console.error('Spawn.x inserted isn\'t  a number');
		}
		if(isNaN(y)==false || y==null){
			this.sprite.spawn.y=y;
		}else{
			console.error('Spawn.y inserted isn\'t  a number');
		}
	};
	
	/*
		Set the score 
	*/
	this.setScore= function(score){
		if(isNaN(score)==false || score==null){
			this.stats.score=Math.round(score);
		}else{
			console.error('Score inserted isn\'t  a number');
		}
	};
	
	/*
		Set the music when damaged
	*/
	this.setMusic = function(music,volume){
		if(typeof music != 'undefined'){
			if(isNaN(volume)==false){
				this.sprite.music = game.add.audio(music,volume);
			}else{
				this.sprite.music = game.add.audio(music);
			}
		}else{
			console.error('Music inserted is undefined');
		}
	}
	
	//**************************Functions***********************************
	/*
		Inflict damage in function of his armor
	*/
	this.takeDamage = function(damage){
		if(typeof damage != 'undefined' && isNaN(damage)==false){
			if(!this.getInvulnerability() && damage > 0){	//Check if the object is vulnerable
				if(this.getHp() >0){
					if(damage<0){
						damage=-damage;
					}
					if(typeof this.getMusic() != 'undefined'){
						if(typeof ui != 'undefined'){
							if(ui.getAudio()){
								this.getMusic().play();
							}
						}else{
							console.error('UI is undefined');
						}
					}
					this.setHp(Math.round(this.getHp()-(damage-(damage*this.getArmorReduction()))));
					this.setInvulnerabilityCounter();
				}
			}
		}else{
			console.error('Taken Damage inserted isn\'t a number');
		}
	};
	
	/*
	
	*/
	this.updateInvulnerabilityDisplay = function (){
		if(this.getInvulnerability()){
			this.getSpriteDisplay().visible=!this.getSpriteDisplay().visible;	
		}else{
			this.getSpriteDisplay().visible=true;
		}
	};
	
	/*
		Delete the ennemy if is hp <=0
	*/
	this.alive = function(alive){
		if(typeof alive == 'undefined'){
			if(this.getHp()<=0 && this.getHpMax() != 0){
				this.alive(false);
				return false;
			}
		}else{
			if(alive == false){
				if(typeof player != 'undefined'){
					player.setCoins(player.getCoins()+this.getCoins());
					player.setScore(player.getScore()+this.getScore());
				}else{
					console.error('Player is undefined');
				}
				//delete object + sprite
				if(typeof this.sprite.display != 'undefined'){
					this.sprite.display.kill();
				}else{
					console.error('Sprite is undefined');
				}
				this.setCoins(0);
				this.setScore(0);
				return false;
			}
		}
		return true;
	};
	/*
		Reset at the spawn position
	*/
	this.respawn = function(){
		this.setHp(this.getHpMax());	
		this.getSpriteDisplay().x=this.getSpawn().x;
		this.getSpriteDisplay().y=this.getSpawn().y;
	};
	
	/*
		Create the Sprite 
	*/
	this.createSprite = function(){
		//Remove var if already created
		if(typeof this.sprite.display != 'undefined'){
			this.sprite.display.kill();
			delete this.sprite.display;
		}
		this.sprite.display=this.game.add.sprite(this.getSpawn().x,this.getSpawn().y,this.getSpriteImage());
		this.sprite.display.anchor.setTo(0.5);
		//Physics
		this.game.physics.enable(this.sprite.display,Phaser.Physics.ARCADE);
		this.sprite.display.body.collideWorldBounds = true;
	};
	
	/*
		Display Hp above the sprite
	*/
	this.createHpDisplay = function(){
		if(this.getHpMax()>0){
			//Remove var if already created
			if(typeof this.stats.hp.display != 'undefined'){
				this.stats.hp.display.kill();
				delete this.stats.hp.display;
			}
			
			if(typeof this.getSpriteDisplay() != 'undefined'){
				this.stats.hp.display = this.game.add.graphics(0,0);
				this.stats.hp.display.width=this.getSpriteDisplay().width;
				this.stats.hp.display.beginFill(0xE62117, 1);
				this.stats.hp.display.lineStyle(3, 0xE62117, 1);
			}else{
				console.error('Sprite is undefined');
			}
		}
	};
	
	/* 
		Update Hp display
	*/
	this.updateHpDisplay = function(gap){
		if(this.getHpMax()!=0 && this.getHp()>0){
			if(typeof this.stats.hp.display != 'undefined'){
				if(typeof gap == 'undefined'){
					gap=50;
				}
				this.stats.hp.display.x=this.getSpriteDisplay().x-this.getSpriteDisplay().width/2;
				this.stats.hp.display.y=this.getSpriteDisplay().y-gap;
				this.stats.hp.display.width=this.getSpriteDisplay().width*(this.getHp()/this.getHpMax());
				this.stats.hp.display.drawRect(0, 0, this.getSpriteDisplay().width, 1);
			}
		}else if(typeof this.stats.hp.display != 'undefined'){
			this.stats.hp.display.kill();
		}
	};
	
	/*
		Create the character   @Overide
	*/
	this.create = function(){
		this.createSprite();
		this.createHpDisplay();
	};
	
	/*
		An optional callback function that is called if the objects collide.
		The two objects will be passed to this function in the same order in which you
		specified them, unless you are colliding Group vs. Sprite, 
		in which case Sprite will always be the first parameter
	*/
	this.collisionCallback = function(obj1, obj2) {
			
	};
	
	/*
		A callback function that lets you perform additional checks against
		the two objects if they overlap. 
		If this is set then collision will only happen if processCallback returns true. 
		The two objects will be passed to this function in the same order in which you specified them.
	*/
	this.processCallback = function(obj1, obj2) {
		player.takeDamage(this.getDamage());
	};
	
	/*
		Update @Overide
	*/
	this.update = function(){
		this.getSpriteDisplay().body.velocity.x=0;
		this.game.physics.arcade.collide(this.getSpriteDisplay(),map.getLayer());
		if(this.alive()){
			if(typeof player != 'undefined'){
				if(player.getWeapon().name =='bow'){
					for(i=0;i<player.getWeapon().projectile.children.length;i++){
						if(player.getWeapon().projectile.children[i].alive && player.getWeapon().projectile.children[i].overlap(this.getSpriteDisplay())){
							this.takeDamage(player.getWeapon().damage);
							player.getWeapon().projectile.children[i].kill();
						}
					}
				}else{
					if(player.getWeapon().sprite.visible && player.getWeapon().sprite.overlap(this.getSpriteDisplay())){
						this.takeDamage(player.getWeapon().damage);
					}
				}
			}
			this.updateInvulnerabilityDisplay();
			this.updateHpDisplay();
			this.game.physics.arcade.collide(this.getSpriteDisplay(),player.getSpriteDisplay(), this.collisionCallback, this.processCallback, this);
		}
	};
}	

