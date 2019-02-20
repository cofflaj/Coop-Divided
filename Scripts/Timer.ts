class GameTimerBehavior extends Sup.Behavior {
  
  loops = 1;
  awake() {
    
  }

  update() {
    
    Frame++;
    // --------------Mob Spawns------------------
    for(let i = 0; i < this.loops; i++) {
      if(Frame%SpawnRate["Skeleton"] == 0){
        SpawnMob("Skeleton");
      }
      if(Frame%SpawnRate["Slime"] == 0){
        SpawnMob("Slime");
      }
      if(Frame%SpawnRate["Blob"] == 0){
        SpawnMob("Blob");
      }
    }
    if(Frame%(60*45) == 0){
      this.loops++;
    }
    if(Frame%14400 == 0){
      spawnLich();
    }
  }
  
  
}
Sup.registerBehavior(GameTimerBehavior);
