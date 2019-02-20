class TileMapRendererBehaviour extends Sup.Behavior {
  awake() {
    TileMapRenderer = this.actor.tileMapRenderer;
    TileMap = TileMapRenderer.getTileMap();
    TileSet = TileMapRenderer.getTileSet();
  }

  update() {
    
  }
}
Sup.registerBehavior(TileMapRendererBehaviour);
