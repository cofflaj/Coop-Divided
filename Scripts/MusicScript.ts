class MusicScriptBehavior extends Sup.Behavior {
  awake() {
    let inGameMusicPlayer = new Sup.Audio.SoundPlayer("Sounds/Music1", 0.3, { loop: true });
    inGameMusicPlayer.play();
  }

  update() {
    
  }
}
Sup.registerBehavior(MusicScriptBehavior);
