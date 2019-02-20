class UIBehavior extends Sup.Behavior {
  awake() {
    for(let player of Players) {
      let healthBar = new UIElement();
      healthBar.actor = new Sup.Actor("Player " + player.PlayerNumber + " Health");
      new Sup.SpriteRenderer(healthBar.actor);
      healthBar.actor.setLocalScale(.5);
      healthBar.owner = player;
      healthBar.actor.spriteRenderer.setSprite("Health Diamond");
      healthBar.value = 100;
      healthBar.max = 100;
      healthBar.type = "Health Bar";
      UIElements.push(healthBar);
      
      let manaBar = new UIElement();
      manaBar.actor = new Sup.Actor("Player " + player.PlayerNumber + " Mana");
      new Sup.SpriteRenderer(manaBar.actor);
      manaBar.actor.setLocalScale(.5);
      manaBar.owner = player;
      manaBar.actor.spriteRenderer.setSprite("Health Diamond");
      manaBar.value = 100;
      manaBar.max = 100;
      manaBar.type = "Mana Bar";
      UIElements.push(manaBar);
      
      
    }
  }

  update() {
    for(let element of UIElements) {
      let color;
      if(element.type == "Health Bar") {
        element.max = element.owner.maxHealth;
        element.value = element.owner.health;
        color = new Sup.Color((element.max - element.value)/100 ,element.value/element.max,0);
      }
      else if(element.type == "Mana Bar"){
        element.max = element.owner.maxMana;
        element.value = element.owner.mana;
        color = new Sup.Color((element.max - element.value)/100 ,0,element.value/element.max);
        if(element.owner.spellCooldown > 0) {
          element.actor.spriteRenderer.setOpacity(.5);
        }
        else{
          element.actor.spriteRenderer.setOpacity(1);
        }
      }
      let camera = Camera.getBehavior(CameraBehavior);
      let manaAdjust = 0;
      if(element.type == "Mana Bar") {
        manaAdjust = -.2;
      }
      let position = new Sup.Math.Vector3(camera.position.x - 2 + element.owner.PlayerNumber/3, camera.position.y + camera.scale/2 - .3 + manaAdjust, 5);
      element.actor.setLocalScale(.5*camera.scale/5);
      element.actor.setPosition(position);
      element.actor.spriteRenderer.setColor(color);
    }
  }
}
Sup.registerBehavior(UIBehavior);

class UIElement {
  
  type:string
  actor:Sup.Actor;
  value:number;
  max:number;
  owner:Player;
  
}