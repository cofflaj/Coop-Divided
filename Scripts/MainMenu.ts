class MainMenuBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    for(let i = 1; i <= 4; i++){
      if( !playerPlaying(i) && Sup.Input.wasGamepadButtonJustPressed(i - 1, xbox["A"])){
        let player = new Player();
        player.PlayerNumber = i;
        Players.push(player);
        Sup.log("added player " + i);
      }
      if(Sup.Input.wasGamepadButtonJustPressed(i-1, xbox["Start"]) && Players.length > 1){
        Sup.loadScene('Stage');
      }
    }
  }
}
Sup.registerBehavior(MainMenuBehavior);

function playerPlaying(n:number){
  for(let player of Players){
    if(player.PlayerNumber == n){
      return true;
    }
  }
  return false;
}