function newAudio(game,audio,volume,loop){
	this.game=game;
	this.audio;
	
	this.audio = this.game.add.audio(audio,volume,loop);
	
	if(typeof ui == 'undefined'){
		console.error('UI is undefined');
	}

	
	this.audio.play();
	
	//**************************GETTER***********************************
	/*
		Return the current volume (0-1)
	*/
	this.getVolume = function(){
		return this.audio.volume;
	};
	
	/*
		Return the state of the audio
	*/
	this.getPause = function(){
		return this.audio.isPlaying;
	};
	
	//**************************SETTER***********************************
	/*
		Set the volume
	*/
	this.setVolume = function(volume){
		if(volume >=0 && volume <= 1){
			this.audio.volume=volume;
		}
	};
	
	/*
		Set the Pause
	*/
	this.setPause = function(pause){
		if(typeof pause != 'undefined'){
			if(pause== true){
				this.audio.pause();
			}else{
				this.audio.resume();
			}
		}else{
			if(this.audio.isPlaying){
				this.audio.pause();;
			}else{
				this.audio.resume();
			}
		}
	};
	//**************************Function***********************************
	/*
		Update the object
	*/
	this.update = function(){
		if(typeof ui != 'undefined'){
			this.audio.mute=!ui.getAudio();
			if(ui.getPause()){
				this.setPause(true);
			}else{
				this.setPause(!ui.getAudio());
			}
		}
	};		
	
	/*
		Play the audio
	*/
	this.play = function(){
		this.audio.play();
	};
	
	/*
		Stop the audio
	*/
	this.stop = function(){
		this.audio.stop();
	};
}