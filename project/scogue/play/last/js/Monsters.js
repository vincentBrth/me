function newIceMonster(game){
	this.game=game;
	newCharacter.call(this,game); //iceMonster is extended of character
	this.distance=60;
	//Init
	this.setName('iceMonster');
	this.setHpMax(50);
	this.setHp(this.getHpMax());
	this.setDamage(40);
	this.setArmor(0);
	this.setSpeed(800);
	this.setCoins(100);
	this.setScore(250);
	this.setSpriteImage('iceMonster');

	//**************************Functions***********************************
	this.create = function(){
	//Sprite
	this.createSprite();
	this.createHpDisplay();
	this.setDimensions(0.2);
	this.setImmovable(true);
	this.setGravityAllowed(false);
		
		//Tween
		iceMonsterTween = this.game.add.tween(this.getSpriteDisplay()).to({
			y: this.getSpriteDisplay().y+this.distance
		},this.getSpeed(),'Linear',true,0,this.getSpeed(),true);
	};
	
	this.setDistance = function(distance){
		this.distance=distance;
	};
}


function newJelly(game){
	this.game=game;
	newCharacter.call(this,game); //jelly is extended of character
	//Init
	this.setName('jelly');
	this.setHpMax(100);
	this.setHp(this.getHpMax());
	this.setDamage(10);
	this.setArmor(0);
	this.setSpeed(14000);
	this.setCoins(50);
	this.setScore(100);
	this.setSpriteImage('jelly');
	this.distance=700;
	//**************************Functions***********************************
	this.create = function(){
	//Sprite
	this.createSprite();
	this.createHpDisplay();
	this.setDimensions(1);
	this.setImmovable(false);
	this.setGravityAllowed(true);
	this.sprite.display.animations.add('run',[0,1,2],3,true);
		//Tween
		jellyTween = this.game.add.tween(this.getSpriteDisplay()).to({
			x: this.getSpriteDisplay().x+this.distance
		},this.getSpeed(),'Linear',true,0,this.getSpeed(),true);

	};
	
	this.update = function(){
		this.getSpriteDisplay().animations.play('run');
		
		
		//Update
		this.getSpriteDisplay().body.velocity.x=0;
		this.game.physics.arcade.collide(this.getSpriteDisplay(),map.getLayer());
		if(this.alive()){
			if(typeof player != 'undefined'){
				if(player.getWeapon().name =='bow'){
					for(i=0;i<player.getWeapon().projectile.children.length;i++){
						if(player.getWeapon().projectile.children[i].alive && player.getWeapon().projectile.children[i].overlap(this.getSpriteDisplay())){
							this.takeDamage(player.getDamage());
							player.getWeapon().projectile.children[i].kill();
						}
					}
				}else{
					if(player.getWeapon().sprite.visible && player.getWeapon().sprite.overlap(this.getSpriteDisplay())){
						this.takeDamage(player.getDamage());
					}
				}
			}
			this.updateInvulnerabilityDisplay();
			this.updateHpDisplay();
			this.game.physics.arcade.collide(this.getSpriteDisplay(),player.getSpriteDisplay(), this.collisionCallback, this.processCallback, this);
		}
	};
	
	this.setDistance = function(distance){
		this.distance=distance;
	};
}


function newWall(game){
	this.game=game;
	newCharacter.call(this,game); //wall is extended of character
	this.distance=60;
	//Init
	this.setName('wall');
	this.setHpMax(0);
	this.setHp(this.getHpMax());
	this.setDamage(20);
	this.setArmor(0);
	this.setSpeed(800);
	this.setSpriteImage('wall');

	//**************************Functions***********************************
	this.create = function(){
	//Sprite
	this.createSprite();
	this.createHpDisplay();
	this.setDimensions(0.2);
	this.setImmovable(true);
	this.setGravityAllowed(false);
		
		//Tween
		wallTween = this.game.add.tween(this.getSpriteDisplay()).to({
			y: this.getSpriteDisplay().y+this.distance
		},this.getSpeed(),'Linear',true,0,this.getSpeed(),true);
	};
	
	this.setDistance = function(distance){
		this.distance=distance;
	};
}

function newSpike(game){
	this.game=game;
	newCharacter.call(this,game); //spike is extended of character
	this.distance=60;
	//Init
	this.setName('spike');
	this.setHpMax(0);
	this.setHp(this.getHpMax());
	this.setDamage(20);;
	this.setSpriteImage('spike');

	//**************************Functions***********************************
	this.create = function(){
	//Sprite
	this.createSprite();
	this.createHpDisplay();
	this.setDimensions(0.4);
	this.setImmovable(true);
	this.setGravityAllowed(false);
		
	};
};
	

//////////////////////////////////////////////// OBJECT
function newBox(game){
	this.game=game;
	newCharacter.call(this,game); //Box is extended of character
	//Init
	this.setName('box');
	this.setHpMax(0);
	this.setHp(this.getHpMax());
	this.setSpriteImage('box');	
	//**************************Functions***********************************
	this.create = function(){
		//Sprite
		this.createSprite();
		this.createHpDisplay();
		this.setDimensions(0.2);
		this.setImmovable(false);
		this.setGravityAllowed(true);	
	};
	

}

function newChest(game){
	this.game=game;
	newCharacter.call(this,game); //chest is extended of character
	//Init
	this.setName('chest');
	this.setHpMax(1);
	this.setScore(0);
	this.setCoins(300);
	this.setHp(this.getHpMax());
	this.setDamage(0);
	this.setSpriteImage('chest');

	//**************************Functions***********************************
	this.create = function(){
		//Sprite
		this.createSprite();
		this.setDimensions(0.2);
		this.setImmovable(true);
		this.setGravityAllowed(false);
	};
	

}