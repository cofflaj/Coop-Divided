class EnemyHandlerBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    for(let i = 0; i < Enemies.length; i++){
      Enemies[i].invincibilityFrames--;
      Enemies[i].brain.think();
      Enemies[i].position = new Sup.Math.Vector2(Enemies[i].position.x + Enemies[i].speed * Enemies[i].brain.direction.x,
                                                 Enemies[i].position.y + Enemies[i].speed * Enemies[i].brain.direction.y);
      if(Enemies[i].position.x < LeftBound) Enemies[i].position.x = LeftBound;
      if(Enemies[i].position.x > RightBound) Enemies[i].position.x = RightBound;
      if(Enemies[i].position.y < BottomBound) Enemies[i].position.y = BottomBound;
      if(Enemies[i].position.y > TopBound) Enemies[i].position.y = TopBound;
      Enemies[i].actor.setPosition(Enemies[i].position);
      
      //-----------------------------------------Enemy Facing Direction-------------------------------------------------
      if(Enemies[i].type == "Slime" || Enemies[i].type == "Blob" || Enemies[i].type == "Lich"){
        if(Enemies[i].brain.direction.x < 0) {
          Enemies[i].actor.spriteRenderer.setHorizontalFlip(false);
        }
        else{
          Enemies[i].actor.spriteRenderer.setHorizontalFlip(true);
        }
      }
      else{
        if(Enemies[i].brain.direction.x < 0) {
          Enemies[i].actor.spriteRenderer.setHorizontalFlip(true);
        }
        else{
          Enemies[i].actor.spriteRenderer.setHorizontalFlip(false);
        }
      }
      
      //---------------------------------------Enemy Animations------------------------------------------------------------
      if((Enemies[i].type == "Slime" || Enemies[i].type == "Blob") && Enemies[i].brain.isPlayerWithinRange()) {
        Enemies[i].actor.spriteRenderer.setAnimation("Attacking");
      }
      else if(Enemies[i].brain.direction.x !=0 && Enemies[i].brain.direction.y != 0){
        Enemies[i].actor.spriteRenderer.setAnimation("Walking");
      }
      else{
        Enemies[i].actor.spriteRenderer.setAnimation("Idle");
      }
      
      if(Enemies[i].invincibilityFrames > 0){
        Enemies[i].actor.spriteRenderer.setColor(EnemyBeingHitColor);
      }
      else {
        Enemies[i].actor.spriteRenderer.setColor(NoColor);
      }
      if(Enemies[i].health <- 0) {
        Enemies[i].actor.destroy();
        Enemies.splice(i,1);
      }
      else if(Enemies[i].type == "Lich" && Enemies[i].position.x < 2.5 && Enemies[i].position.y > 30){
        Enemies[i].actor.destroy();
        Enemies.splice(i,1);
        evolveLich();
      }
    }
  }
}
Sup.registerBehavior(EnemyHandlerBehavior);

function SpawnMob(mobType:string){
  let enemy = new Enemy(mobType);
  let rnd = Sup.Math.Random.integer(0,19)
  enemy.actor.setPosition(Gates[rnd]);
  enemy.position = Gates[rnd].clone();
  Enemies.push(enemy);
}

class Enemy extends GameObject{
  
  type:string;
  actor:Sup.Actor;
  health:number;
  damage:number;
  speed:number;
  knockback:number;
  invincibilityFrames:number = 0;
  brain:AI;
  
  constructor(type:string){
    super();
    this.actor = new Sup.Actor(type);
    new Sup.SpriteRenderer(this.actor);
    this.type = type;
    this.health = MobHealth[type];
    this.speed = MobSpeed[type];
    this.damage = MobDamage[type];
    this.actor.spriteRenderer.setSprite("Mobs/" + type);
    this.knockback = MobKnockback[type];
    this.width = this.actor.spriteRenderer.getSprite().getGridSize().width * this.actor.getLocalScale().x / 100;
    if(type == "Blob"){
      this.width /= 2;
    }
    this.height = this.actor.spriteRenderer.getSprite().getGridSize().height * this.actor.getLocalScale().y / 100;
    this.brain = new AI();
    this.brain.meatsuit = this;
  }

}
function evolveLich(){
  let knight = new Enemy("Knight");
  knight.actor.setPosition(2,30);
  knight.position = knight.actor.getPosition().toVector2();
  Enemies.push(knight);
  alertText("The Lich summoned a Knight! Fight for your lifes!");
}

function spawnLich() {
  let lich = new Enemy("Lich");
  lich.actor.setPosition(47,1);
  lich.position = lich.actor.getPosition().toVector2();
  lich.brain = new LichAI();
  lich.brain.meatsuit = lich;
  Enemies.push(lich);
  alertText("A Lich has spawned in the Southeast! \n Dont let it reach the Dead Forest in the NorthWest!");
  
}

function alertText(string:string){
  
  let text = new Sup.Actor("lich text");
  new Sup.TextRenderer(text);
  text.textRenderer.setFont("Alert");
  text.textRenderer.setSize(200);
  text.textRenderer.setText(string);
  text.setPosition(Camera.getBehavior(CameraBehavior).position.x,Camera.getBehavior(CameraBehavior).position.y,6);
  Texts.push(new Text(text,600));
}