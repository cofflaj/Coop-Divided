class CameraBehavior extends Sup.Behavior {
  
  position:Sup.Math.Vector2 = new Sup.Math.Vector2(0,0);
  scale:number = 0;
  
  awake() {
    Camera = this.actor;
  }

  update() {
    let cameraX = 0;
    let cameraY = 0;
    let minX = Players[0].actor.getPosition().x;
    let maxX = Players[0].actor.getPosition().x;
    let minY = Players[0].actor.getPosition().y;
    let maxY = Players[0].actor.getPosition().y;
    for(let player of Players) {
      let x = player.actor.getPosition().x;
      let y = player.actor.getPosition().y;
      cameraX += x;
      cameraY += y;
      if(x < minX) {
        minX = x;
      }
      if(x > maxX) {
        maxX = x;
      }
      if(y < minY) {
        minY = y;
      }
      if(y > maxY) {
        maxY = y;
      }
      let distance = ((maxX-minX)**2 + (maxY-minY)**2)**(1/2);
      distance /= 2;
      if (distance > 2){
        distance = 2;
      }
      else if (distance < .4){
        distance = .4;
      }
      this.actor.camera.setOrthographicScale(distance + 2);
      this.scale = distance + 2;
    }
    cameraX/=Players.length;
    cameraY/=Players.length;
    this.position = new Sup.Math.Vector2(cameraX,cameraY);
    this.actor.setPosition(cameraX, cameraY);
  }
}
Sup.registerBehavior(CameraBehavior);
