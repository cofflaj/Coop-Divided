let TileMapRenderer:Sup.TileMapRenderer;
let TileMap:Sup.TileMap;
let TileSet:Sup.TileSet;
let Players:Player[] = [];
let Spells:Spell[] = [];
let EffectedTiles:Tile[] = [];
let Enemies:Enemy[] = [];
let Frame:number = 0;
let Camera:Sup.Actor;
let UIElements:UIElement[] = [];
let Pickups:Pickup[] = [];


class Pickup extends GameObject {
  
  type:string;
  actor:Sup.Actor;

  constructor() {
    super();
  }
  
}

class PickupBehavior extends Sup.Behavior {
  
  type:string;
  
  awake(){
  
    let pickup = new Pickup();
    pickup.type = this.type;
    pickup.actor = this.actor;
    pickup.position = this.actor.getPosition().toVector2();
    pickup.width = this.actor.spriteRenderer.getSprite().getGridSize().width * this.actor.getLocalScale().x / 100;
    pickup.height = this.actor.spriteRenderer.getSprite().getGridSize().height * this.actor.getLocalScale().y / 100;
    Pickups.push(pickup);
  
  }
  
  update(){
    
  }
  
}

Sup.registerBehavior(PickupBehavior);

class PickupHandler extends Sup.Behavior {
  
  awake(){
  
  }
  
  update(){
    for(let i = Pickups.length - 1; i >= 0; i--) {
      for (let player of Players) {
        if(isColliding(player, Pickups[i]) && Pickups[i].type == "Nebula" && !player.hasNebula){
          player.hasNebula = true;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertPickup("Nebula", "B", player);
        }
        
        else if(isColliding(player, Pickups[i]) && Pickups[i].type == "Fell" && !player.hasFell){
          player.hasFell = true;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertPickup("Fell", "X", player);
        }
        
        else if(isColliding(player, Pickups[i]) && Pickups[i].type == "Flamelash" && !player.hasFlamelash){
          player.hasFlamelash = true;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertPickup("Flamelash", "Y", player);
        }
        
        else if(isColliding(player, Pickups[i]) && Pickups[i].type == "Damage"){
          player.swordDamage += DamagePickupBonus;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertCoin("Damage", player);
        }
        else if(isColliding(player, Pickups[i]) && Pickups[i].type == "MovementSpeed"){
          player.speed += SpeedPickupBonus;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertCoin("Speed", player);
        }
        else if(isColliding(player, Pickups[i]) && Pickups[i].type == "MaxMana"){
          player.maxMana += ManaPickupBonus;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertCoin("Max Mana", player);
        }
        else if(isColliding(player, Pickups[i]) && Pickups[i].type == "MaxHP"){
          player.maxHealth += HealthPickupBonus;
          player.health += HealthPickupBonus;
          Pickups[i].actor.destroy();
          Pickups.splice(i,1);
          alertCoin("Max Health", player);
        }
        
      }
    }
  } 
}
Sup.registerBehavior(PickupHandler);

function alertPickup(type:string, button:string, player:Player){
  let text = new Sup.Actor("pickup text");
  new Sup.TextRenderer(text);
  text.textRenderer.setFont("Alert");
  text.textRenderer.setSize(100);
  text.textRenderer.setText("Player " + player.PlayerNumber + " got " + type + "! Press " + button + " to use it!");
  text.setPosition(Camera.getBehavior(CameraBehavior).position.x,Camera.getBehavior(CameraBehavior).position.y,6);
  Texts.push(new Text(text,600));
}

function alertCoin(type:string, player:Player){
  let text = new Sup.Actor("pickup text");
  new Sup.TextRenderer(text);
  text.textRenderer.setFont("Alert");
  text.textRenderer.setSize(100);
  text.textRenderer.setText("Player " + player.PlayerNumber + " got a " + type + "boost!");
  text.setPosition(Camera.getBehavior(CameraBehavior).position.x,Camera.getBehavior(CameraBehavior).position.y,6);
  Texts.push(new Text(text,600));
}




