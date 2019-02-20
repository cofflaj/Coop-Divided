class Player extends GameObject{
  
  PlayerNumber:number;
  actor:Sup.Actor;
  wetness:number;
  health:number;
  hasSwung:number = 0;
  justSwung:number = 0;
  hitTimer = 0;
  actionPriority:number = 0; //being hit = 10, attacking/sliding = 7-9, walking = 5, put away sword = 2, idle/combad idle = 1.

  direction:Sup.Math.Vector2;
  facing:Sup.Math.Vector2;
  facingRight:boolean;
  invincibilityFrames:number = 0;
  canMove:boolean = true;
  swordDamage = PlayerSwordDamage;
  mana:number = 100;
  maxHealth:number = 100;
  maxMana:number = 100;
  spellCooldown = 0;
  hasFell = false;
  hasFlamelash = false;
  hasNebula = false;
  speed = PlayerSpeed;

  constructor() {
    super();
    this.facingRight = true;
    this.wetness = 0;
    this.health = 100;
    this.direction = new Sup.Math.Vector2(0,0);
    this.facing = new Sup.Math.Vector2(1,0);
  }
  
}
