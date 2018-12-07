function newMap(game){
	this.game=game;
	this.backgroundColor='#3A5963';
	this.map;
	this.tilemap;
	this.tileset;
	this.layerName='Tile Layer 1';
	this.layer;
	this.objectLayer='Object Layer 1';
	this.gid;
	this.collision={
				A: -1,
				B: -1,
			};

	
	//**************************GETTER***********************************
	
	/*
		Return the color of the background
	*/
	this.getBackgroundColor = function(){
		return this.backgroundColor;
	};
	
	/*
		Return the Tilemap used
	*/
	this.getTilemap = function(){
		return this.tilemap;
	};
	
	/*
		Return the Tileset used
	*/
	this.getTileset = function(){
		return this.tileset;
	};
	
	/*
		Return the NAME of the Layer
	*/
	this.getLayerName = function(){
		return this.layerName;
	};
	
	/*
		Return the Layer
	*/
	this.getLayer = function(){
		return this.layer;
	};
	
	/*
		Return Object Layer
	*/
	this.getObjectLayer = function(){
		return this.objectLayerName;
	};
	
	/*
		Reutrn the GID setted (found in the json)
	*/
	this.getGid = function(){
		return this.gid;	
	};
	
	/*
		Return the Map
	*/
	this.getMap = function(){
		return this.map;
	};

	/*
		Return the Collision
	*/
	this.getCollision = function(){
		return this.collision;
	};
	
	/*
		Return in the console the status of the object
	*/
	this.console = function(what){
		
		switch(what){
			case "backgroundColor":
				console.log('backgroundColor: '+this.backgroundColor);
				break;
			case "tilemap":
				console.log('tilemap: '+this.tilemap);
				break;
			case "tileset":
				console.log('tileset: '+this.tileset);
				break;
			case "layerName":
				console.log('layerName: '+this.layerName);
				break;
			case "objectLayerName":
				console.log('objectLayerName: '+this.objectLayerName);
				break;
			case "gid":
				console.log('gid: '+this.gid);
				break;
			case "collision":
				console.log('collisionA: '+this.collision.A + ' collisionB: ' + this.collision.B);
				break;
			default:
				console.log("status null");
		}
	};
	
	//**************************SETTER***********************************
	
	/*
		Set the background color of the stage
	*/
	this.setBackgroundColor= function(color){
		this.backgroundColor=color;
	};
	
	/*
		Set the Tilemap
	*/
	this.setTilemap = function(tilemapKey){
		this.tilemap=tilemapKey;
	};
	
	/*
		Set the Tileset
	*/
	this.setTileset = function(tilesetKey){
		this.tileset=tilesetKey;
	};
	
	/*
		Set the Layer
	*/
	this.setLayer = function(layerKey){
		this.layerName=layerKey;
	};
	
	/*
		Set the Object Layer
	*/
	this.setObjectLayer = function(layerKey){
		this.objectLayerName=layerKey;
	};
	
	/*
		Set the GID (find it in the json)
	*/
	this.setGid = function(gid){
		this.gid=gid;
	};
	/*
		Set the Collision
	*/
	this.setCollision = function(A,B){
		this.collision.A=A;
		this.collision.B=B;
	};
	
	//**************************FUNCTIONS***********************************
	/*
		Create the map (polymorph parameters)
	*/
	this.create= function(tilemap,tileset,layerName,collisionA,collisionB,backgroundColor){
		if(tilemap != null){
			this.setTilemap(tilemap);
		}
		if(tileset != null){
			this.setTileset(tileset);
		}
		if(layerName != null){
			this.setLayer(layerName);
		}
		if(collisionA != null && collisionB != null){
			this.setCollision(collisionA,collisionB);
		}
		if(backgroundColor != null){
			this.setBackgroundColor(backgroundColor);
		}
		
		if(this.tilemap!=null && this.tileset != null && this.layerName != null && this.backgroundColor != null && this.collision !=null){
			this.game.stage.backgroundColor = this.backgroundColor;
			this.map = this.game.add.tilemap(this.tilemap);
			this.map.addTilesetImage(this.tileset,this.tileset);
			layer = this.map.createLayer(this.layerName);
			layer.resizeWorld();	
			this.layer=layer;	//didn't work for no reason if this.layer = this.map.create...
			this.map.setCollisionBetween(this.collision.A,this.collision.B);
			console.log('Map generated');
		}else{
			console.error('Map not generated');
		}
	};
}