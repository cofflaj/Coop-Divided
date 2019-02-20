class GameOverTextBehavior extends Sup.Behavior {
  awake() {
    if(Winner == null){
      this.actor.textRenderer.setText("DEFEAT!");
    }else{
      this.actor.textRenderer.setText("PLAYER " + Winner.PlayerNumber + " WINS!")
    }
    
  }

  update() {
    
  }
}
Sup.registerBehavior(GameOverTextBehavior);
