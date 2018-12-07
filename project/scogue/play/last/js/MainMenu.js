Game.MainMenu = function(game){
	
};

Game.MainMenu.prototype = {
	create:function(game){
		this.game.keyboard="QWERTY"; //Define default keyboard
		//Background
		this.stage.backgroundColor='#000';
		
		//Title
		this.text= game.add.text(game.width/2,game.height/2- 200,'Scogue');
		this.text.anchor.setTo(0.5);
		this.text.align='center';
		this.text.font='Arial';
		this.text.fontWeight='bold';
		this.text.fontSize=70;
		this.text.fill='#fff';

		//Title reflect
		this.textReflect = game.add.text(game.width/2,game.height/2- 120, this.text.text);
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
			
			
			this.setPosition = function(x,y){
				//Position
				if(isNaN(x)==false && typeof x != 'undefined'){
					this.text.x=x;
					this.button.x=x;
				}
				if(isNaN(y)==false && typeof y != 'undefined'){
					this.text.y=y;
					this.button.y=y;
				}
				
				this.button.onInputOver.add(function(){
					this.text.fill='#FFD750';
				},this);
			
				this.button.onInputOut.add(function(){
					this.text.fill='#FFFFFF';
				},this);
			};

			this.setText = function(text){
				this.text.text=text;
			};
		};

		//KeyboardButton
		this.keyboardButton = new LabelButton(game,"keyboardSelected",game.width/2,game.height/2-100,200,50,function(){
			if(game.keyboard=="QWERTY"){
				game.keyboard = "AZERTY";
				console.log('Keyboard changed to AZERTY');
			}else{
				game.keyboard = "QWERTY";
				console.log('Keyboard changed to QWERTY');
			}
		},{font:"9px Arial",fill:"#fff",align:"center"})
		//PlayButton	
		this.playButton = new LabelButton(game,"Play",game.width/2,game.height/2+10,200,50,function(){
			game.state.start('Level1');
			console.log('Tutorial launched');
		})
		
		//Tutorial button
		this.tutorialButton = new LabelButton(game,"Tutorial",game.width/2,game.height/2+110,200,50,function(){
			game.state.start('Tutorial');
			console.log('Tutorial launched');
		})
		
		//Credits
		this.creditsButton = new LabelButton(game,"\u00A9 vberthet.net - V1.31 12/12/2016",game.width/2,game.height/2,200,50,function(){
			 window.location = "http://vberthet.net";
		},{font:"12px Arial",fill:"#fff",align:"center"})

		//GameWindow
		this.button800x600 = new LabelButton(game,'800x600',game.width/2,game.height/2-100,200,50,function(){
			game.scale.setGameSize(800, 600);
			console.info('Game Launched in : '+game.width+'x'+game.height);
		},{font:"12px Arial",fill:"#fff",align:"center"})
		
		this.button1200x780 = new LabelButton(game,'1200x780',game.width/2,game.height/2-100,200,50,function(){
			game.scale.setGameSize(1200, 780);
			console.info('Game Launched in : '+game.width+'x'+game.height);
		},{font:"12px Arial",fill:"#fff",align:"center"})
		
		//GameWindow Current Indicator
		this.indicator = this.game.add.graphics(0, 0);
		this.indicator.width = 300;
		this.indicator.lineStyle(3, 0XFFD750, 0.6);
		this.indicator.beginFill(0XFFD750, 0.5);
	},
	update:function(game){
		this.keyboardButton.setText(game.keyboard);
		//800x600
		if(game.width==800 && game.height==600){
			this.text.x=game.width/2;
			this.text.y=game.height/2 - 200;
			this.textReflect.x = game.width/2;
			this.textReflect.y=game.height/2- 120;
			this.playButton.setPosition(game.width/2,game.height/2-60);
			this.tutorialButton.setPosition(game.width/2,this.playButton.text.y+60);
			this.creditsButton.setPosition(game.width/2,game.height-10);
			this.button800x600.setPosition(game.width/2-100,this.tutorialButton.text.y+100);
			this.button1200x780.setPosition(game.width/2+100,this.tutorialButton.text.y+100);
			this.keyboardButton.setPosition(game.width/2,this.tutorialButton.text.y+50);
			this.indicator.width=this.button800x600.text.width;
			this.indicator.drawRect(0, 0, 20, 1);
			this.indicator.y=this.button800x600.text.y+7;
			this.indicator.x=this.button800x600.text.x-this.button800x600.text.width/2+3;
		}
		//1200x780
		if(game.width==1200 && game.height==780){
			this.text.x=game.width/2;
			this.text.y=game.height/2 - 200;
			this.textReflect.x = game.width/2;
			this.textReflect.y=game.height/2- 120;
			this.playButton.setPosition(game.width/2,game.height/2-60);
			this.tutorialButton.setPosition(game.width/2,game.height/2+60);
			this.creditsButton.setPosition(game.width/2,game.height-10);
			this.button800x600.setPosition(game.width/2-100,this.tutorialButton.text.y+100);
			this.button1200x780.setPosition(game.width/2+100,this.tutorialButton.text.y+100);
			this.keyboardButton.setPosition(game.width/2,this.tutorialButton.text.y+50);
			this.indicator.width=this.button1200x780.text.width;
			this.indicator.drawRect(0, 0, 20, 1);
			this.indicator.y=this.button1200x780.text.y+7;
			this.indicator.x=this.button1200x780.text.x-this.button1200x780.text.width/2+3;
		}
	},
	
	
	
};