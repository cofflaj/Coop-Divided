class GameOverBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasGamepadButtonJustPressed(0, xbox["Start"]) || Sup.Input.wasGamepadButtonJustPressed(1, xbox["Start"]) || Sup.Input.wasGamepadButtonJustPressed(2, xbox["Start"]) || Sup.Input.wasGamepadButtonJustPressed(3, xbox["Start"])){
      Players = [];
      Spells = [];
      EffectedTiles = [];
      Enemies = [];
      Frame = 0;
      UIElements = [];
      Pickups = [];
      Sup.loadScene('Main Menu (1)/Main Menu');
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
