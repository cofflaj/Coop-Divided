class AnimationHandlerBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    for(let player of Players){
      let frameindex = player.actor.spriteRenderer.getAnimationFrameIndex();
      let framecount = player.actor.spriteRenderer.getAnimationFrameCount();
      if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber-1, xbox["A"]) && player.actionPriority < 6 && player.justSwung <=0){
        player.actor.spriteRenderer.setAnimation("Slashing1", false);
        player.actionPriority = 7;
        player.canMove = false;
        player.hasSwung = 300;
        player.justSwung = 50;
        Sup.Audio.playSound("Sounds/Sword Swing");
      } else if(Sup.Input.isGamepadButtonDown(player.PlayerNumber-1, xbox["A"]) && player.actionPriority == 7 && frameindex == framecount-2){
        player.actor.spriteRenderer.setAnimation("Slashin2", false);
        player.actionPriority = 8;
        player.canMove = false;
        player.hasSwung = 300;
        player.justSwung = 50;
        Sup.Audio.playSound("Sounds/Sword Swing");
      } else if(Sup.Input.isGamepadButtonDown(player.PlayerNumber-1, xbox["A"]) && player.actionPriority == 8 && frameindex == framecount-2){
        player.actor.spriteRenderer.setAnimation("Slashing3", false);
        player.actionPriority = 9;
        player.canMove = false;
        player.hasSwung = 300;
        player.justSwung = 50;
        Sup.Audio.playSound("Sounds/Sword Swing");
      } else if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber-1, xbox["B"]) && player.actionPriority < 6){
        player.actor.spriteRenderer.setAnimation("Casting", false);
        player.actionPriority = 7;
        player.canMove = false;
        player.hasSwung = 300;
      } else if(Sup.Input.isGamepadButtonDown(player.PlayerNumber-1, xbox["B"]) && player.actionPriority >= 7 && frameindex == framecount-2){
        player.actor.spriteRenderer.setAnimation("Casting", false);
        if(player.actionPriority <= 6){
          player.actionPriority == 7
        }else{
          player.actionPriority++;
        }
        player.canMove = false;
        player.hasSwung = 300;
      } else if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber-1, xbox["Y"]) && player.actionPriority < 6){
        player.actor.spriteRenderer.setAnimation("Casting", false);
        player.actionPriority = 7;
        player.canMove = false;
        player.hasSwung = 300;
      } else if(Sup.Input.isGamepadButtonDown(player.PlayerNumber-1, xbox["Y"]) && player.actionPriority >= 7 && frameindex == framecount-2){
        player.actor.spriteRenderer.setAnimation("Casting", false);
        if(player.actionPriority <= 6){
          player.actionPriority == 7
        }else{
          player.actionPriority++;
        }
        player.canMove = false;
        player.hasSwung = 300;
      } else if(Sup.Input.wasGamepadButtonJustPressed(player.PlayerNumber-1, xbox["X"]) && player.actionPriority < 6){
        player.actor.spriteRenderer.setAnimation("Casting", false);
        player.actionPriority = 7;
        player.canMove = false;
        player.hasSwung = 300;
      } else if(Sup.Input.isGamepadButtonDown(player.PlayerNumber-1, xbox["X"]) && player.actionPriority >= 7 && frameindex == framecount-2){
        player.actor.spriteRenderer.setAnimation("Casting", false);
        if(player.actionPriority <= 6){
          player.actionPriority == 7
        }else{
          player.actionPriority++;
        }
        player.canMove = false;
        player.hasSwung = 300;
      } else if((player.direction.x != 0 || player.direction.y != 0) && player.actionPriority <=5){
        player.actor.spriteRenderer.setAnimation("TheseBootsBeForWalkin");
        player.actionPriority = 5;
        player.canMove = true;
        if(player.direction.x < 0){
          player.actor.spriteRenderer.setHorizontalFlip(true);
        } else if(player.direction.x > 0){
          player.actor.spriteRenderer.setHorizontalFlip(false);
        }
      } else if((player.direction.x == 0) && player.actionPriority <=5){
        if(player.hasSwung > 1){
          player.actor.spriteRenderer.setAnimation("Combat Idle");
          player.hasSwung--;
        } else if(player.hasSwung == 1){
          player.actor.spriteRenderer.setAnimation("Put Sword Away");
          player.hasSwung--;
        } else if(frameindex == framecount-1 || player.actor.spriteRenderer.getAnimation() == "Idle"){
          player.actor.spriteRenderer.setAnimation("Idle");
        }
        player.actionPriority = 1;
        player.canMove = true;
      }
      if(frameindex == framecount-1){
        player.actionPriority = 0;
      }
      player.justSwung--;
    }
  }
}
Sup.registerBehavior(AnimationHandlerBehavior);
