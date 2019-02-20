class SpellHandlerBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    for(let i = 0; i < Spells.length; i++) {
      Spells[i].time--;
      if(Spells[i].time < 1 || Spells[i].durability <=0) {
        Spells[i].actor.destroy();
        Spells.splice(i,1);
      }
      else{
        if(Spells[i].velocity.x == 0 && Spells[i].velocity.y == 0){
          Spells[i].position = Spells[i].caster.position.clone();
        }
        else{
          Spells[i].position = new Sup.Math.Vector2(Spells[i].position.x + SpellSpeeds[Spells[i].type] * Spells[i].velocity.x,
                                      Spells[i].position.y + SpellSpeeds[Spells[i].type] * Spells[i].velocity.y);
        }
        Spells[i].actor.setPosition(Spells[i].position);
        for(let enemy of Enemies) {
          if(enemy.invincibilityFrames <= 0 && isColliding(Spells[i], enemy)) {
            enemy.health -= Spells[i].damage;
            enemy.invincibilityFrames = EnemyInvincibilityFrames;
            enemy.brain.aggroedPlayer = Spells[i].caster;
            Spells[i].durability--;
          }
        }
      }
    }
  }
}
Sup.registerBehavior(SpellHandlerBehavior);

class Spell extends GameObject {
  
  time:number;
  type:string;
  actor:Sup.Actor;
  velocity:Sup.Math.Vector2 = new Sup.Math.Vector2(0,0);
  position:Sup.Math.Vector2;
  damage:number;
  durability:number;
  caster:Player;

  constructor(time:number,type:string, actor:Sup.Actor){
    super();
    this.time = time;
    this.type = type;
    this.actor = actor;
    this.damage = SpellDamage[type];
    this.durability = SpellDurability[type];
  }
}

function castSpell(spellName:string, duration:number, owner:Player, movementStyle:string){
  if(owner.mana < SpellCost[spellName] || owner.spellCooldown > 0){
    return false;
  }
  else{
    owner.mana -= SpellCost[spellName];
    owner.spellCooldown = SpellCooldown[spellName];
    Sup.Audio.playSound("Sounds/" + spellName, 1);
  }
  let spell = new Sup.Actor(spellName);
  new Sup.SpriteRenderer(spell);
  spell.setLocalScale(SpellScale[spellName]);
  spell.setPosition(owner.actor.getPosition());
  spell.spriteRenderer.setSprite("Spells/" + spellName);
  spell.spriteRenderer.setAnimation("Cast");
  if(movementStyle == "Follow Player"){
    spell.setParent(owner.actor);
  }
  let spellObject = new Spell(duration,spellName,spell);
  spellObject.position = owner.position.clone();
  spellObject.width = spell.spriteRenderer.getSprite().getGridSize().width * spell.getLocalScale().x / 100
  spellObject.height = spell.spriteRenderer.getSprite().getGridSize().height * spell.getLocalScale().y / 100
  spellObject.caster = owner;
  if(movementStyle == "Projectile"){
    spellObject.velocity = owner.facing.clone().normalize();
  }
  Spells.push(spellObject);
    
}