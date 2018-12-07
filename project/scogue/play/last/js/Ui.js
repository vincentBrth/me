function newUI(game){
	this.game=game;
	this.barUi={
		main:undefined,
		second:undefined,
	};
	this.healthUi={
		background:undefined,
		display:undefined,
		text:undefined,
	};
	this.coinsUi={
		display:undefined,
		text:undefined,
	};
	this.damageUi={
		display:undefined,
		text:undefined,
	};
	this.armorUi={
		display:undefined,
		text:undefined,
	};
	this.speedUi={
		display:undefined,
		text:undefined,
	};
	this.scoreUi={
		display:undefined,
		text:undefined,
	};
	this.timeUi={
		display:undefined,
		text:undefined,
	};
	this.fpsUi={
		display:undefined,
		text:undefined,
	};
	this.pauseUi={
		button:undefined,
		display:undefined,
		text:undefined,
	};
	this.audioUi={
		button:undefined,
		state:true,
	};
	
	if(typeof player == 'undefined'){
		console.error('Player is undefined');
	}
	
	//************************** Create UI ***********************************
	/*
		Create Bar
	*/
	this.createBarUi = function(){
		//Remove var if already created
		if(typeof this.barUi.main != 'undefined'){
			this.barUi.main.kill();
			delete this.barUi.main;
		}
		if(typeof this.barUi.second != 'undefined'){
			this.barUi.second.kill();
			delete this.barUi.second;
		}
		//barUi.main (background)
		this.barUi.main = this.game.add.graphics(0, 0);
		this.barUi.main.lineStyle(3, 0X222222, 0.6);
		this.barUi.main.beginFill(0X222222, 0.5);
		this.barUi.main.drawRect(0, 0, this.game.width, 50);
		this.barUi.main.fixedToCamera = true;
		//barUi.second (score, time elapsed)
		this.barUi.second = this.game.add.graphics(this.game.width-130, 0);
		this.barUi.second.lineStyle(3, 0X222222, 0.6);
		this.barUi.second.beginFill(0X222222, 0.5);
		this.barUi.second.drawRect(0, 0, this.game.width-130, 50);
		this.barUi.second.fixedToCamera = true;
	};
	
	/*
		Create healthUi.display
	*/
	this.createHealthUi = function(){
		//Remove var if already created
		if(typeof this.healthUi.background != 'undefined'){
			this.healthUi.background.kill();
			delete this.healthUi.background;
		}
		if(typeof this.healthUi.display != 'undefined'){
			this.healthUi.display.kill();
			delete this.healthUi.display;
		}
		if(typeof this.healthUi.text != 'undefined'){
			this.healthUi.text.kill();
			delete this.healthUi.text;
		}		
		//Background
		this.healthUi.background = this.game.add.graphics(330,15);
		this.healthUi.background.lineStyle(3, 0xFFFFFF, 0.1);
		this.healthUi.background.beginFill(0x66ff33, 0.5);
		this.healthUi.background.drawRect(0, 0, 200, 20);
		this.healthUi.background.fixedToCamera = true;
		//Display
		this.healthUi.display = this.game.add.graphics(330,15);
		this.healthUi.display.fixedToCamera = true;
		//Text
		this.healthUi.text = this.game.add.text(430,28,'X',{ font: "12px Arial", fill: "#000000" });
		this.healthUi.text.anchor.setTo(0.5);
		this.healthUi.text.fixedToCamera = true;
	};

	/*
		Create Coins UI
	*/
	this.createCoinsUi = function(){
		//Remove var if already created
		if(typeof this.coinsUi.display != 'undefined'){
			this.coinsUi.display.kill();
			delete this.coinsUi.display;
		}
		if(typeof this.coinsUi.text != 'undefined'){
			this.coinsUi.text.kill();
			delete this.coinsUi.text;
		}
		//Display
		this.coinsUi.display =this.game.add.sprite(30,25,'coin');
		this.coinsUi.display.anchor.setTo(0.5);
		this.coinsUi.display.width=30;
		this.coinsUi.display.height=30;	
		//Text
		this.coinsUi.text = this.game.add.text(60,27,'X',{ font: "24px Arial", fill: "#FFFFFF" });
		this.coinsUi.text.anchor.setTo(0.5);
		//Adjust to the other UI component
		if(this.barUi.main){
			this.coinsUi.display.x=this.barUi.main.x+30;
			this.coinsUi.text.x=this.coinsUi.display.x+30;
			this.coinsUi.display.y=this.barUi.main.height/2;
			this.coinsUi.text.y=this.coinsUi.display.y+2
		}
		this.coinsUi.display.fixedToCamera = true;
		this.coinsUi.text.fixedToCamera = true;
	};
	
	/*
		Create Damage UI
	*/
	this.createDamageUi = function(){
		//Remove var if already created
		if(typeof this.damageUi.display != 'undefined'){
			this.damageUi.display.kill();
			delete this.damageUi.display;
		}
		if(typeof this.damageUi.text != 'undefined'){
			this.damageUi.text.kill();
			delete this.damageUi.text;
		}
		//Display
		this.damageUi.display =this.game.add.sprite(100,25,'damage');
		this.damageUi.display.anchor.setTo(0.5);
		this.damageUi.display.width=30;
		this.damageUi.display.height=30;	
		//Text	
		this.damageUi.text = this.game.add.text(130,27,'X',{ font: "24px Arial", fill: "#FFFFFF" });
		this.damageUi.text.anchor.setTo(0.5);
		//Adjust to the other UI component
		if(this.coinsUi.text){
			this.damageUi.display.x=this.coinsUi.text.x+40;
			this.damageUi.text.x=this.damageUi.display.x+30;
		}
		if(this.barUi.main){
			this.damageUi.display.y=this.barUi.main.height/2;
			this.damageUi.text.y=this.damageUi.display.y+2;
		}
		this.damageUi.display.fixedToCamera = true;
		this.damageUi.text.fixedToCamera = true;
	};
	
	/*
		Create Armor UI
	*/
	this.createArmorUi = function(){	
		//Remove var if already created
		if(typeof this.armorUi.display != 'undefined'){
			this.armorUi.display.kill();
			delete this.armorUi.display;
		}
		if(typeof this.armorUi.text != 'undefined'){
			this.armorUi.text.kill();
			delete this.armorUi.text;
		}
		//Display
		this.armorUi.display =this.game.add.sprite(170,27,'armor');
		this.armorUi.display.anchor.setTo(0.5);
		this.armorUi.display.width=30;
		this.armorUi.display.height=30;
		//Text
		this.armorUi.text = this.game.add.text(200,30,'X',{ font: "24px Arial", fill: "#FFFFFF" });
		this.armorUi.text.anchor.setTo(0.5);
		//Adjust to the other UI component
		if(this.damageUi.text){
			this.armorUi.display.x=this.damageUi.text.x+40;
			this.armorUi.text.x=this.armorUi.display.x+30;
		}
		if(this.barUi.main){
			this.armorUi.display.y=this.barUi.main.height/2;
			this.armorUi.text.y=this.armorUi.display.y+2;
		}
		this.armorUi.display.fixedToCamera = true;
		this.armorUi.text.fixedToCamera = true;
	};

	/*
		Create Speed UI
	*/
	this.createSpeedUi = function(){	
		//Remove var if already created
		if(typeof this.speedUi.display != 'undefined'){
			this.speedUi.display.kill();
			delete this.speedUi.display;
		}
		if(typeof this.speedUi.text != 'undefined'){
			this.speedUi.text.kill();
			delete this.speedUi.text;
		}
		//Display
		this.speedUi.display =this.game.add.sprite(240,27,'speed');
		this.speedUi.display.anchor.setTo(0.5);
		this.speedUi.display.width=30;
		this.speedUi.display.height=30;
		//Text
		this.speedUi.text = this.game.add.text(270,30,'X',{ font: "24px Arial", fill: "#FFFFFF" });
		this.speedUi.text.anchor.setTo(0.5);
		//Adjust to the other UI component
		if(this.damageUi.text){
			this.speedUi.display.x=this.armorUi.text.x+40;
			this.speedUi.text.x=this.speedUi.display.x+30;
		}
		if(this.barUi.main){
			this.speedUi.display.y=this.barUi.main.height/2;
			this.speedUi.text.y=this.speedUi.display.y+2;
		}
		this.speedUi.display.fixedToCamera = true;
		this.speedUi.text.fixedToCamera = true;
	};
	
	
	/*
		Create Score UI
	*/
	this.createScoreUi = function(y){
		//Remove var if already created
		if(typeof this.scoreUi.display != 'undefined'){
			this.scoreUi.display.kill();
			delete this.scoreUi.display;
		}
		if(typeof this.scoreUi.text != 'undefined'){
			this.scoreUi.text.kill();
			delete this.scoreUi.text;
		}
		//Display
		this.scoreUi.display = this.game.add.text(this.game.width-100,20,'Score :',{ font: "12px Arial", fontStyle:"italic", fill: "#AAAAAA" });
		this.scoreUi.display.anchor.setTo(0.5);
		//Text
		this.scoreUi.text = this.game.add.text(this.game.width-40,20,'X',{ font: "12px Arial", fill: "#AAAAAA" });
		this.scoreUi.text.anchor.setTo(0.5);
		//Adjust
		if(this.barUi.second){
			this.scoreUi.display.y=this.barUi.second.height-this.barUi.second.height*0.6;
			this.scoreUi.text.y=this.scoreUi.display.y;
		}
		this.scoreUi.display.fixedToCamera = true;
		this.scoreUi.text.fixedToCamera = true;
	};
	
	/*
		Create the time elapsed
	*/
	this.createTimeElapsedUi = function(){
		//Remove var if already created
		if(typeof this.timeUi.display != 'undefined'){
			this.timeUi.display.kill();
			delete this.timeUi.display;
		}
		if(typeof this.timeUi.text != 'undefined'){
			this.timeUi.text.kill();
			delete this.timeUi.text;
		}
		//Display
		this.timeUi.display = this.game.add.text(this.game.width-100,40,'Time :',{ font: "12px Arial", fontStyle:"italic", fill: "#AAAAAA" });
		this.timeUi.display.anchor.setTo(0.5);
		//Text
		this.timeUi.text = this.game.add.text(this.game.width-40,40,'X',{ font: "12px Arial", fill: "#AAAAAA" });
		this.timeUi.text.anchor.setTo(0.5);
		//Adjust
		if(this.barUi.second){
			this.timeUi.display.y=this.barUi.second.height-this.barUi.second.height*0.3;
			this.timeUi.text.y=this.timeUi.display.y;
		}
		this.timeUi.display.fixedToCamera = true;
		this.timeUi.text.fixedToCamera = true;
	};
	
	/*
		Create a button to disable the audio of the game
	*/
	this.createaudioUi = function(){
		//Remove var if already created
		if(typeof this.audioUi.button != 'undefined'){
			this.audioUi.button.kill();
			delete this.audioUi.button;
		}
		//Create button
		if(this.audioUi.state==true){
			this.audioUi.button = this.game.add.button(this.game.width-178,2,'audio-button',function(){
				this.setAudio();
			},this,0,2,0);	
		}else{
			this.audioUi.button = this.game.add.button(this.game.width-178,2,'audio-button',function(){
				this.setAudio();
			},this,1,3,0);
		}
		this.audioUi.button.scale.setTo(1.3);
		//Adjust
		if(this.barUi.main){
			this.audioUi.button.height=this.barUi.main.height-6;
			this.audioUi.button.width=this.audioUi.button.height;
		}
		this.audioUi.button.fixedToCamera = true;
	};
	
	/*
		Create Pause Button
	*/
	this.createPauseButton = function(){
		//Remove var if already created
		if(typeof this.pauseUi.button != 'undefined'){
			this.pauseUi.button.kill();
			delete this.pauseUi.button;
		}
		//Create button
		this.pauseUi.button = this.game.add.button(this.game.width-226,2,'pause-button',function(){
				this.setPause();
			},this,0,1,1);
		this.pauseUi.button.scale.setTo(1.3);
		//Adjust
		if(this.barUi.main){
			this.pauseUi.button.height=this.barUi.main.height-6;
			this.pauseUi.button.width=this.pauseUi.button.height;
		}
		this.pauseUi.button.fixedToCamera = true;
	};
	
	/*
		Create the PausedDisplay
	*/
	this.createPausedDisplay = function(){
		//Remove var if already created
		if(typeof this.pauseUi.display != 'undefined'){
			this.pauseUi.display.kill();
			delete this.pauseUi.display;
		}
		if(typeof this.pauseUi.text != 'undefined'){
			this.pauseUi.text.kill();
			delete this.pauseUi.text;
		}
		//Create
		//Display
		this.pauseUi.display =game.add.sprite(this.game.width/2,this.game.height/2-70,'paused-display');
		this.pauseUi.display.anchor.setTo(0.5);
		this.pauseUi.display.scale.setTo(1.2);
		this.pauseUi.display.fixedToCamera=true
		this.pauseUi.display.visible=this.game.paused;
		//Text
		this.pauseUi.text = this.game.add.text(this.game.width/2,this.game.height/2, "Tap anywhere to continue or press pause keyboard.",{font:"14px Arial",fill:"#000"});
		this.pauseUi.text.anchor.set(0.5);
		this.pauseUi.text.fixedToCamera=true;
		this.pauseUi.text.visible=this.game.paused;
	};
	
	/*
		Create the FPS display
	*/
	this.createfpsUi = function(){
		//Remove var if already created
		if(typeof this.fpsUi.display != 'undefined'){
			this.fpsUi.display.kill();
			delete this.fpsUi.display;
		}
		if(typeof this.fpsUi.text != 'undefined'){
			this.fpsUi.text.kill();
			delete this.fpsUi.text;
		}
		//Display
		this.fpsUi.display = this.game.add.text(this.game.width-100,10,'FPS :',{ font: "7px Arial", fontStyle:"italic", fill: "#AAAAAA" });
		this.fpsUi.display.anchor.setTo(0.5);
		//Text
		this.fpsUi.text = this.game.add.text(this.game.width-40,10,'X',{ font: "7px Arial", fill: "#AAAAAA" });
		this.fpsUi.text.anchor.setTo(0.5);
		//Adjust
		if(this.barUi.second){
			this.fpsUi.display.y=this.barUi.second.height-this.barUi.second.height*0.8;
			this.fpsUi.text.y=this.fpsUi.display.y;
		}
		this.fpsUi.display.fixedToCamera = true;
		this.fpsUi.text.fixedToCamera = true;
	};
	
	//************************** Getter ***********************************
	/*
		Return the state of the game : pause ON/OFF
	*/
	this.getPause = function(){
		return this.game.paused;
	};
	
	/*
		Return the state of audio
	*/
	this.getAudio = function(){
		return this.audioUi.state;
	};
	
	//************************** Setter ***********************************
	/*
		Show/Hide the pausedDisplay
	*/
	this.setPausedDisplay = function(paused){
		if(typeof this.pauseUi.display != 'undefined' && typeof this.pauseUi.text != 'undefined'){
			if(paused ==true || paused ==false){
				this.pauseUi.display.visible=paused;
				this.pauseUi.text.visible=paused;
			}else{
				this.setPausedDisplay(!this.pauseUi.display.visible);
			}
		}else{
			console.error("Paused Display is undefined")
		}	
	};
	
	/*
		Pause the game and display paused screen
	*/
	this.setPause = function(paused){
		//Change the state of the pause
		if(paused ==true || paused ==false){
			this.game.paused=paused;
		}else{
			this.game.paused=!this.game.paused;
		}
		
		//Display paused screen
		if(this.game.paused){
			this.setPausedDisplay(true);
			console.info("Game Paused");
			//create an event listener in order to unpause the game
			this.game.input.onDown.add(function(){
				this.setPausedDisplay(false);
				this.game.paused = false;
				this.game.input.onDown.removeAll();
				console.info("Game Unpaused");
			}, this);
			
			this.game.input.keyboard.addKey(player.controls.pause.keyCode).onDown.add(function(){
				this.setPausedDisplay(false);
				this.game.paused = false;
				this.game.input.onDown.removeAll();
				console.info("Game Unpaused");
			},this);
			
		}
	};
	
	/*
		Function used to change the audio and update the audioUi
		*/
	this.setAudio = function(audio){
		//Change the state of the audio
		if(audio ==true || audio ==false){
			this.audioUi.state=audio;
		}else{
			this.audioUi.state= !this.audioUi.state;
		}
		//Update the audioUi.		
		if(this.audioUi.state==true){
			this.audioUi.button.setFrames(0,2,0);
			console.info('Audio: Unmuted');
		}else{
			this.audioUi.button.setFrames(1,3,0);
			console.info('Audio: Muted');
		}
	};
	
	//************************** Functions ***********************************
	/*
		Create the UI
	*/
	this.create = function(){
		this.createBarUi();
		this.createCoinsUi();
		this.createDamageUi();
		this.createArmorUi();
		this.createSpeedUi();
		this.createScoreUi();
		this.createTimeElapsedUi();
		this.createaudioUi();
		this.createPauseButton();
		this.createPausedDisplay();
		this.createHealthUi();
		this.createfpsUi();

		console.log('UI Created');
	};
	
	/*
		Adjust the UI by updating the space between component in function of the value of the different text
		
	*/
	this.adjustX = function(gapText,gapDisplay){
		//Add gap
		if(gapText == null){
			gapText=0;
		}
		if(gapDisplay==null){
			gapDisplay=0;
		}
		
		//Adjust
		if(this.coinsUi.text && this.coinsUi.display){
			this.coinsUi.text.cameraOffset.x+=this.coinsUi.display.right-this.coinsUi.text.left+gapText;
		}else{
			console.error('Adjust : Coins UI not created');
		}
		if(this.damageUi.display && this.coinsUi.text){
			this.damageUi.display.cameraOffset.x+=this.coinsUi.text.right-this.damageUi.display.left+gapDisplay;
		}
		if(this.damageUi.text && this.damageUi.display){
			this.damageUi.text.cameraOffset.x+=this.damageUi.display.right-this.damageUi.text.left+gapText;
		}else{
			console.error('Adjust : Damage UI not created');
		}
		if(this.armorUi.display && this.damageUi.text){
			this.armorUi.display.cameraOffset.x+=this.damageUi.text.right-this.armorUi.display.left+gapDisplay;
		}
		if(this.armorUi.text && this.armorUi.display){
			this.armorUi.text.cameraOffset.x+=this.armorUi.display.right-this.armorUi.text.left+gapText;
		}else{
			console.error('Adjust : Armor UI not created');
		}
		if(this.speedUi.display && this.armorUi.text){
			this.speedUi.display.cameraOffset.x+=this.armorUi.text.right-this.speedUi.display.left+gapDisplay;
		}
		if(this.speedUi.text && this.speedUi.display){
			this.speedUi.text.cameraOffset.x+=this.speedUi.display.right-this.speedUi.text.left+gapText;
		}else{
			console.error('Adjust : Speed UI not created');
		}
		if(this.barUi.main){
			this.barUi.main.width=this.game.width;
		}else{
			console.error('Adjust : barUi.main UI not created');
		}
		if(this.barUi.second){
			this.barUi.second.cameraOffset.x=this.game.width-130;
		}else{
			console.error('Adjust : barUi.second UI not created');
		}
		
		if(this.healthUi.background && this.speedUi.text){
			this.healthUi.background.cameraOffset.x=this.speedUi.text.cameraOffset.x+this.speedUi.text.width/2+gapDisplay;
			this.healthUi.display.cameraOffset.x=this.healthUi.background.cameraOffset.x;
			this.healthUi.text.cameraOffset.x =this.healthUi.background.cameraOffset.x+this.healthUi.background.width/2;
			if(this.pauseUi.button){
				this.healthUi.background.width=this.pauseUi.button.left-this.speedUi.text.right-(gapDisplay*2);
			}
		}else{
			console.error('Adjust : Health UI not created');
		}
	};
	
	/*
		Update the UI
	*/
	this.update = function(){
		//Text
		if(typeof player != 'undefined'){
			if(typeof this.coinsUi.text != "undefined"){	
				this.coinsUi.text.text = player.getCoins();
			}else{
				console.error("coinsUi.text is undefined");
			}
			if(typeof this.damageUi.text != "undefined"){
				this.damageUi.text.text = player.getWeapon().damage;
			}else{
				console.error("damageUi.text is undefined");
			}
			if(typeof this.armorUi.text != "undefined"){
				this.armorUi.text.text=player.getArmor();
			}else{
				console.error("armorUi.text is undefined");
			}
			if(typeof this.speedUi.text != "undefined"){
				this.speedUi.text.text=player.getSpeed();
			}else{
				console.error("speedUi.text is undefined");
			}
			if(typeof this.scoreUi.text != "undefined"){
				this.scoreUi.text.text = player.getScore();
			}else{
				console.error("scoreUi.text is undefined");
			}
			if(typeof this.fpsUi.text != "undefined"){
				this.fpsUi.text.text = this.game.time.fps;
			}else{
				console.error("fpsUi.text is undefined");
			}
		}
		
		//healthUi.display
		if(typeof this.healthUi.text != "undefined" && typeof this.healthUi.display != "undefined" && typeof this.healthUi.background != "undefined" && typeof player != 'undefined'){
			var hpPercent=Math.round(player.getHp()/player.getHpMax()*100);
			this.healthUi.text.text = player.getHp()+' / ' + player.getHpMax() + '  ('+hpPercent+'%)';	
			
			if(hpPercent > 30){ //Red if lower than 30%
				this.healthUi.display.beginFill(0x66ff33, 1);
				this.healthUi.display.lineStyle(3, 0x66ff33, 1);
			}else{
				this.healthUi.display.beginFill(0xE62117, 1);
				this.healthUi.display.lineStyle(3, 0xE62117, 1);
			}
			this.healthUi.display.width=this.healthUi.background.width*(hpPercent/100);
			this.healthUi.display.drawRect(0, 0, 200, 20);
		}else{
			if(typeof this.healthUi.text == "undefined"){
				console.error("healthUi.text is undefined");
			}
			if(typeof this.healthUi.display == "undefined"){
				console.error("healthUi.display is undefined");
			}
			if(typeof this.healthUi.background == "undefined"){
				console.error("healthUi.background is undefined");
			}
		}
		
		//timeUi.text
		if(typeof player != 'undefined'){
			if(player.getTimeElasped().h>0){
				if(player.getTimeElasped().s>9){
					if(player.getTimeElasped().m>9){
						this.getTimeElasped().text=player.getTimeElasped().h+" : "+player.getTimeElasped().m+" : "+player.getTimeElasped().s;
					}else{
						this.timeUi.text.text=player.getTimeElasped().h+" : 0"+player.getTimeElasped().m+" : "+player.getTimeElasped().s;
					}
				}else{
					if(player.getTimeElasped().m>9){
						this.timeUi.text.text=player.getTimeElasped().h+" : "+player.getTimeElasped().m+" : 0"+player.getTimeElasped().s;
					}else{
						this.timeUi.text.text=player.getTimeElasped().h+" : 0"+player.getTimeElasped().m+" : 0"+player.getTimeElasped().s;
					}
				}
			}else{
				if(player.getTimeElasped().s>9){
					this.timeUi.text.text=player.getTimeElasped().m+" : "+player.getTimeElasped().s;
				}else{
					this.timeUi.text.text=player.getTimeElasped().m+" : 0"+player.getTimeElasped().s;
				}
			}
		}
		//Adjust UI component
		this.adjustX(10,15);
	};
}