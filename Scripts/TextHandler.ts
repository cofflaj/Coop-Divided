let Texts:Text[] = [];

class TextHandlerBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    for(let i = Texts.length - 1; i >= 0 ; i--){
      Texts[i].timeLeft--;
      if(Texts[i].timeLeft <= 0){
        Texts[i].actor.destroy();
        Texts.splice(i,1);
      }
    }
  }
}
Sup.registerBehavior(TextHandlerBehavior);

class Text {
  
  actor:Sup.Actor;
  timeLeft:number;

  constructor(actor:Sup.Actor, time:number){
    this.actor = actor;
    this.timeLeft = time;
  }
  
}
