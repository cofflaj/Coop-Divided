class PlayerInBehavior extends Sup.Behavior {
  PlayersIn_String;
  awake() {
    this.PlayersIn_String = '';
  }

  update() {
    for(let player of Players)
      this.PlayersIn_String += "Player " + player.PlayerNumber + " is ready! \n" ;
    this.actor.textRenderer.setText(this.PlayersIn_String);
    this.PlayersIn_String = '';
  }
}
Sup.registerBehavior(PlayerInBehavior);
