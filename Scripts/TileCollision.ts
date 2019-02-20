class TileCollisionBehavior extends Sup.Behavior {
  awake() {
    
  }
  update() {
    for(let player of Players) {
      let x = player.actor.getPosition().x;
      let y = player.actor.getPosition().y;
      let tilePosition = new Sup.Math.Vector2(Math.floor(x * 100 / 16),Math.floor(y * 100 / 16))
      let tile = TileMap.getTileAt(0,tilePosition.x,tilePosition.y);
      let properties = TileSet.getTileProperties(tile);
      
      // -------------------- For each player, check what tile they're on ------------------------------------
      
      
      if(properties["Wet"] && player.wetness < + properties["Wet"]){ // ------- If tile is wet, make player wet
        player.wetness = + properties["Wet"];
      }
      let tileOnOne = TileMap.getTileAt(1,tilePosition.x,tilePosition.y);
      let tileOneProps = TileSet.getTileProperties(tileOnOne);
      if(tileOneProps["Grass"]){
        if(player.actor.spriteRenderer.getAnimation() == "Slashing1"
            || player.actor.spriteRenderer.getAnimation() == "Slashin2"
            || player.actor.spriteRenderer.getAnimation() == "Slashing3"){
            TileMap.setTileAt(1,tilePosition.x,tilePosition.y, 5);
        }
      }
      if(tileOneProps["Prickly"]){
        player.health-=5;
        if(player.direction.x == 0){
          player.position.x += .5 * -1 * .1;
        }
        else{
          player.position.x += player.direction.x * -1 * .1;
        }
      }
      
      
      if( +properties["Wet"] > 90) {
        player.actor.setZ(-1);
      }
      else {
        player.actor.setZ(2);
      }
      
      if(player.wetness > 10 && (tile == 5 || tile == 15)) { // --------------- If player is wet and tile is grass, make tile wet
        wetTile(tilePosition, tile);
      }
      
      for(let tile of EffectedTiles){ // -------------------------------------- Check the Player-wetted tiles and re-wet them if necessary
        if(player.wetness > 10 && tilePosition.x == tile.position.x && tilePosition.y == tile.position.y) {
          tile.wet = 240;
        }
      }
      
      tile = TileMap.getTileAt(2,tilePosition.x,tilePosition.y);
      properties = TileSet.getTileProperties(tile);
      if(properties["Solid"]){
        player.position.x -= player.direction.x * PlayerSpeed;
        player.position.y -= player.direction.y * PlayerSpeed;
      }
    }
    
    for(let i = EffectedTiles.length - 1 ; i >= 0 ; i--){ // ------------------ If the tile isn't wet anymore, make it look dry
      EffectedTiles[i].wet--;
      if(EffectedTiles[i].wet < 1) {
        TileMap.setTileAt(0,EffectedTiles[i].position.x,EffectedTiles[i].position.y,EffectedTiles[i].defaultTile);
        EffectedTiles.splice(i,1)
      }
      
    }
    
  }
  
}
Sup.registerBehavior(TileCollisionBehavior);

class Tile {
  
  position:Sup.Math.Vector2;
  defaultTile:number;
  wet:number = 0;

  constructor(position:Sup.Math.Vector2, defaultTile:number){
    this.position = position;
    this.defaultTile = defaultTile;
  }
}

function wetTile(tilePosition:Sup.Math.Vector2, tile:number){
  let effectedTile = new Tile(tilePosition, tile);
  effectedTile.wet = 240;
  EffectedTiles.push(effectedTile);
  TileMap.setTileAt(0,tilePosition.x,tilePosition.y, 163);
}