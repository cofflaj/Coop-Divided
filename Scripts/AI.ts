

class AI {
  
  target:Sup.Math.Vector2;
  direction:Sup.Math.Vector2 = new Sup.Math.Vector2(0,0);
  meatsuit:Enemy;
  inteligence:number = 3;
  currentActionTime:number = 0;
  aggroedPlayer:Player;
  detectionRadius = 2;

  think(){
    this.currentActionTime--;
    if(this.aggroedPlayer) {
      this.targetPlayer(this.aggroedPlayer);
    }
    else if(this.isPlayerClose()) {
      this.targetPlayer(this.closestPlayer());
    }
    else if(this.currentActionTime <= 0) {
      let rnd = Sup.Math.Random.integer(0,9);
      if(this.inteligence > rnd){
        this.targetPlayer(this.closestPlayer());
        this.currentActionTime = 120;
      }
      else {
        rnd = Sup.Math.Random.integer(0,1);
        if(rnd == 0) {
          this.idle();
          this.currentActionTime = 120;
        }
        else {
          this.wander();
          this.currentActionTime = 120;
        }
      }
    }
  }

  idle() {
    this.direction = new Sup.Math.Vector2(0,0);
  }

  isPlayerWithinRange(){
    let closest:Player;
    let min = .3;
    for(let player of Players) {
      let distance:number;
      let x = player.position.x;
      let y = player.position.y;
      distance = (this.meatsuit.position.x-player.position.x) ** 2 + (this.meatsuit.position.y-player.position.y) ** 2;
      if(distance < min){
        min = distance;
        closest = player;
      }
    }
    if(closest){
      return true;
    }
    return false;
    
  }  

  wander() {
    this.direction = new Sup.Math.Vector2(Sup.Math.Random.integer(0,99)/100, Sup.Math.Random.integer(0,99)/100);
  }
  
  targetPlayer(player:Player) {
      if(player) {
        this.target = player.position.clone();
      }
      this.direction.x = this.target.x - this.meatsuit.position.x;
      this.direction.y = this.target.y - this.meatsuit.position.y;
      this.direction.normalize();
  }

  closestPlayer(){
    let closest:Player;
    let min = 10000;
    for(let player of Players) {
      let distance:number;
      let x = player.position.x;
      let y = player.position.y;
      distance = (this.meatsuit.position.x-player.position.x) ** 2 + (this.meatsuit.position.y-player.position.y) ** 2;
      if(distance < min){
        min = distance;
        closest = player;
      }
    }
    return closest;
  }

  isPlayerClose() {
    
    let closest:Player;
    let min = this.detectionRadius;
    for(let player of Players) {
      let distance:number;
      let x = player.position.x;
      let y = player.position.y;
      distance = (this.meatsuit.position.x-player.position.x) ** 2 + (this.meatsuit.position.y-player.position.y) ** 2;
      if(distance < min){
        min = distance;
        closest = player;
      }
    }
    if(closest){
      return true;
    }
    return false;
    
  }
  
}

class LichAI extends AI {
  think(){
    this.target = new Sup.Math.Vector2(0,32);
    let x = -1 * this.meatsuit.position.x;
    let y = 32 - this.meatsuit.position.y;
    this.direction = new Sup.Math.Vector2(x,y).normalize();
  }
}