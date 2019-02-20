class PlayerHandler extends Sup.Behavior {
  awake() {
    for(let player of Players){
      let actor = new Sup.Actor("Player " + player.PlayerNumber);
      new Sup.SpriteRenderer(actor);
      actor.setLocalScale(.6);
      actor.setEulerX(.01);
      actor.spriteRenderer.setSprite("Characters/MaMainMan");
      player.width = actor.spriteRenderer.getSprite().getGridSize().width * .004;
      player.height = actor.spriteRenderer.getSprite().getGridSize().height * .006;
      actor.spriteRenderer.setColor(PlayerColors[player.PlayerNumber - 1]);
      //actor.setPosition(16 + player.PlayerNumber,12,2);
      actor.setPosition(4 + player.PlayerNumber/3,5,2);
      player.position = actor.getPosition().toVector2();
      player.actor = actor;
      player.hitTimer = 0;
    }
  }

  update() {
    for(let player of Players){
      if(player.mana > player.maxMana){
        player.mana = player.maxMana;
      }
      if(player.position.x < LeftBound) player.position.x = LeftBound;
      if(player.position.x > RightBound) player.position.x = RightBound;
      if(player.position.y < BottomBound) player.position.y = BottomBound;
      if(player.position.y > TopBound) player.position.y = TopBound;
      player.invincibilityFrames--;
      player.spellCooldown--;
      player.hitTimer--;
      player.mana += .15;
      
      if(player.invincibilityFrames > 0){
        player.actor.spriteRenderer.setOpacity(.7);
      }
      else{
        player.actor.spriteRenderer.setOpacity(1);
      }
      
      player.direction.x = Sup.Input.getGamepadAxisValue(player.PlayerNumber-1, xbox["MoveX"]);
      player.direction.y = Sup.Input.getGamepadAxisValue(player.PlayerNumber-1, xbox["MoveY"]) * -1;
      if(player.direction.x != 0){
        player.facing.x = player.direction.x;
      }
      if(player.direction.y != 0){
        player.facing.y = player.direction.y;
      }
      
      player.wetness -= .5;
      if(player.wetness < 0){
        player.wetness = 0;
      }
      if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber - 1, xbox["X"]) && player.hasFell){
        castSpell("Fell", 100, player, "Projectile");
      }
      else if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber - 1, xbox["Y"]) && player.hasFlamelash){
        castSpell("Flamelash", 50, player,"Follow Player");
      }
      else if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber - 1, xbox["B"]) && player.hasNebula){
        castSpell("Nebula", 100, player, "Projectile");
      }
      if(player.canMove){
        player.position.x += player.direction.x * (player.speed * (1-player.wetness/200));
        player.position.y += player.direction.y * (player.speed * (1-player.wetness/200));
        player.actor.setPosition(player.position);
      }
      
      for(let enemy of Enemies) {
        if( (player.actor.spriteRenderer.getAnimation() == "Slashing1"
            || player.actor.spriteRenderer.getAnimation() == "Slashin2"
            || player.actor.spriteRenderer.getAnimation() == "Slashing3")
            && player.position.x - player.width < enemy.position.x + enemy.width/2 
            && player.position.x + player.width > enemy.position.x - enemy.width/2
            && player.position.y - player.height/2 < enemy.position.y + enemy.height/2 
            && player.position.y + player.height/2 > enemy.position.y - enemy.height/2
            && enemy.invincibilityFrames <= 0) {
            enemy.health -= player.swordDamage;
            enemy.invincibilityFrames = EnemyInvincibilityFrames;
            if(player.hitTimer <= 0){
              Sup.Audio.playSound("Sounds/Sword Hit");
              player.hitTimer = 22;
            }
            enemy.brain.aggroedPlayer = player;
        }
        else if(player.invincibilityFrames < 1 
           && player.position.x - player.width/5 < enemy.position.x + enemy.width/2 
           && player.position.x + player.width/5 > enemy.position.x - enemy.width/2
           && player.position.y - player.height/4 < enemy.position.y + enemy.height/2 
           && player.position.y + player.height/4 > enemy.position.y - enemy.height/2) {
          player.health -= enemy.damage;
          player.invincibilityFrames = MaxInvincibilityFrames;
          //let position = player.actor.getPosition();
          if(player.direction.x == 0){
            player.position.x += .5 * -1 * enemy.knockback;
          }
          else{
            player.position.x += player.direction.x * -1 * enemy.knockback;
          }
          //player.position.y += player.direction.y * -1 * enemy.knockback;
          player.actor.setPosition(player.position);
        }
      }
    }
    for (let i = Players.length - 1; i >= 0; i--) {
      
      if(Players[i].health <= 0) {
        Players[i].actor.destroy();
        Players.splice(i,1);
      }
    }
    if(Players.length <= 1){
        if(Players.length == 1){
          Winner = Players[0];
        }
        Sup.loadScene('Game Over/GAME OVER MAN!');
      }
  }
}
Sup.registerBehavior(PlayerHandler);

function isColliding (obj1:GameObject, obj2:GameObject) {
  
        if(obj1.position.x - obj1.width/5 < obj2.position.x + obj2.width/2 
           && obj1.position.x + obj1.width/5 > obj2.position.x - obj2.width/2
           && obj1.position.y - obj1.height/4 < obj2.position.y + obj2.height/2 
           && obj1.position.y + obj1.height/4 > obj2.position.y - obj2.height/2) {
          return true;
        }
  return false;
}

