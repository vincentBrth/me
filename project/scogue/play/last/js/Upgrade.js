Game.Upgrade = function(game){
	
};

Game.Upgrade.prototype = {
	create:function(game){
		//Stop the music of the level
		audio.stop();
		//Background
		this.stage.backgroundColor='#223';
		
		//Title
		this.text= game.add.text(game.width/2,game.height/2 - 200,'Upgrade');
		this.text.anchor.setTo(0.5);
		this.text.align='center';
		this.text.font='Arial';
		this.text.fontWeight='bold';
		this.text.fontSize=70;
		this.text.fill='#fff';

		//Title reflect
		this.textReflect = game.add.text(game.width/2, game.height/2- 120, this.text.text);
		this.textReflect.anchor.setTo(0.5);
		this.textReflect.align = 'center';
		this.textReflect.scale.y = -1;
		this.textReflect.font = 'Arial';
		this.textReflect.fontWeight = 'bold';
		this.textReflect.fontSize = 70;
		var gradient = this.textReflect.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
		gradient.addColorStop(0, 'rgba(255,255,255,0)');
		gradient.addColorStop(1, 'rgba(255,255,255,0.08)');
		this.textReflect.fill=gradient;
		
		
		//Display the current coins and glory
		resourceBackground = this.game.add.graphics(game.width/2-game.width*0.2-40,game.height/2-game.height*0.07-40);
		resourceBackground.lineStyle(3, 0X222222, 0.6);
		resourceBackground.beginFill(0X1FF0EC, 0.5);
		resourceBackground.drawRect(0, 0, this.game.width/2, 80);
		
		coinsDisplay = game.add.sprite(game.width/2-game.width*0.2,game.height/2-game.height*0.07,'coin');
		coinsDisplay.anchor.setTo(0.5);
		coinsDisplay.height=50;
		coinsDisplay.width=50;
		coinsText = game.add.text(coinsDisplay.x+50,coinsDisplay.y,player.getCoins(),{font:"20px Arial",fill:"#fff",align:"center"});
		coinsText.anchor.setTo(0.5);

		
		glory = Math.round(player.getScore()*(1-(100/(100+player.getTimeElaspedSeconds()/10))));
		gloryText = game.add.text(game.width/2+game.width*0.2,coinsText.y,glory,{font:"20px Arial",fill:"#fff",align:"center"});
		gloryText.anchor.setTo(0.5);
		gloryDisplay = game.add.sprite(gloryText.x-50,coinsText.y,'glory');
		gloryDisplay.anchor.setTo(0.5);
		gloryDisplay.height=50;
		gloryDisplay.width=50;

		
		
		
		var LabelButton =  function(game,string,x,y,w,h,callback,font){    
			if(font==null){
				font={font:"20px Arial",fill:"#fff",align:"center"};
			}

			this.button=game.add.button(x,y,null,callback,this);
			this.button.anchor.setTo(0.5,0.5);
			this.button.width=w;
			this.button.height=h;
			this.text = game.add.text(this.button.x,this.button.y, string, font);
			this.text.anchor.setTo(0.5,0.5);
			
			//effect
			this.button.onInputOver.add(function(){
				this.text.fill='#FFD750';
			},this);
			
			this.button.onInputOut.add(function(){
				this.text.fill='#FFFFFF';
			},this);
		};
		
		var upgradeDisplay =  function(game,string,sprite,cost,x,y,w,h,callback,font){    
			if(font==null){
				font={font:"30px Arial",fill:"#fff",align:"center"};
			}
			sprite = game.add.sprite(x,y,sprite);
			sprite.anchor.setTo(0.5);
			sprite.width=w;
			sprite.height=h;
			
			this.stats = game.add.text(sprite.x-sprite.width-10,sprite.y,string,font);
			this.stats.anchor.setTo(0.5);
			
			this.button = new LabelButton(game,'X',sprite.x+100,sprite.y,200,50,callback);
			costDisplay = game.add.sprite(this.button.text.x+50,this.button.text.y,cost);
			costDisplay.anchor.setTo(0.5);
			costDisplay.width=w;
			costDisplay.height=h;
		}
		healthUpgrade = new upgradeDisplay(game,player.getHpMax(),'heart','coin',game.width/2-game.width*0.3,game.height/2-game.height*0.05+100,50,50,function(){
				if(player.getCoins()>=healthUpgrade.value){
					player.setHpMax(player.getHpMax()+10);
					player.setCoins(player.getCoins()-healthUpgrade.value);
				}
		})
		
		damageUpgrade = new upgradeDisplay(game,player.getHpMax(),'damage','coin',game.width/2-game.width*0.3,healthUpgrade.button.text.y+100,50,50,function(){
				if(player.getCoins()>=damageUpgrade.value){
					player.stats.damage=player.getDamage()+1;
					player.setCoins(player.getCoins()-damageUpgrade.value);
				}
		})	
		
		armorUpgrade = new upgradeDisplay(game,player.getHpMax(),'armor','coin',game.width/2+game.width*0.2,healthUpgrade.button.text.y,50,50,function(){
				if(player.getCoins()>=armorUpgrade.value){
					player.setArmor(player.getArmor()+1);
					player.setCoins(player.getCoins()-armorUpgrade.value);
				}
		})
		
		speedUpgrade = new upgradeDisplay(game,player.getHpMax(),'speed','coin',game.width/2+game.width*0.2,damageUpgrade.button.text.y,50,50,function(){
				if(player.getCoins()>=speedUpgrade.value){
					player.setSpeed(player.getSpeed()+25);
					player.setCoins(player.getCoins()-speedUpgrade.value);
				}
		})
		
		//RetryButton	
		this.retryButton = new LabelButton(game,"Retry",game.width/2,game.height-50,200,50,function(){
			game.state.start('Level1');
			console.log('Level1 Launched');
		})
		
	},	
	update:function(game){
		healthUpgrade.stats.setText(player.getHpMax());
		healthUpgrade.value = Math.round(player.getHpMax()*((100+player.getHpMax())/100));
		healthUpgrade.button.text.setText(healthUpgrade.value);
		
		damageUpgrade.stats.setText(player.getDamage());
		damageUpgrade.value = Math.round(player.getDamage()*((100+player.getDamage()*100)/100));
		damageUpgrade.button.text.setText(damageUpgrade.value);
		
		armorUpgrade.stats.setText(player.getArmor());
		armorUpgrade.value = Math.round(player.getArmor()*(98+(player.getArmor()*200)/100));
		armorUpgrade.button.text.setText(armorUpgrade.value);
		
		speedUpgrade.stats.setText(player.getSpeed());
		speedUpgrade.value = Math.round(player.getSpeed()*((player.getSpeed()*2)/100));
		speedUpgrade.button.text.setText(speedUpgrade.value);
		
		coinsText.setText(player.getCoins());
	},
};