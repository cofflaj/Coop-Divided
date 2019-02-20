class BlinkBehaviorText extends Sup.Behavior {
  
  ms_To_Show:number = 60;
  ms_To_Hide:number = 60;
  
  private counter:number;
  private visible:boolean;
  
  awake() {
    this.counter = 0;
    this.visible = true;
  }

  update() {
    this.counter++;
    if(this.visible){
      if(this.counter > this.ms_To_Show){
        this.actor.textRenderer.setOpacity(0);
        this.visible = false;
        this.counter = 0;
      }
    }
    else{
      if(this.counter > this.ms_To_Hide){
        this.actor.textRenderer.setOpacity(1);
        this.visible = true;
        this.counter = 0;
      }
    }
  }
}
Sup.registerBehavior(BlinkBehaviorText);

class BlinkBehaviorSprite extends Sup.Behavior {
  
  ms_To_Show:number = 60;
  ms_To_Hide:number = 60;
  
  private counter:number;
  private visible:boolean;
  
  awake() {
    this.counter = 0;
    this.visible = true;
  }

  update() {
    this.counter++;
    if(this.visible){
      if(this.counter > this.ms_To_Show){
        this.actor.spriteRenderer.setOpacity(0);
        this.visible = false;
        this.counter = 0;
      }
    }
    else{
      if(this.counter > this.ms_To_Hide){
        this.actor.spriteRenderer.setOpacity(1);
        this.visible = true;
        this.counter = 0;
      }
    }
  }
}
Sup.registerBehavior(BlinkBehaviorSprite);
