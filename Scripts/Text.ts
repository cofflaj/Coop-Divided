class TextBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasGamepadButtonJustPressed(0,0)){
      this.actor.textRenderer.setText("Button 0 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,1)){
      this.actor.textRenderer.setText("Button 01 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,2)){
      this.actor.textRenderer.setText("Button 02 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,3)){
      this.actor.textRenderer.setText("Button 03 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,4)){
      this.actor.textRenderer.setText("Button 04 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,5)){
      this.actor.textRenderer.setText("Button 05 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,6)){
      this.actor.textRenderer.setText("Button 06 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,7)){
      this.actor.textRenderer.setText("Button 07 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,8)){
      this.actor.textRenderer.setText("Button 08 was pressed");
    }
    if(Sup.Input.wasGamepadButtonJustPressed(0,9)){
      this.actor.textRenderer.setText("Button 09 was pressed");
    }
  }
}
Sup.registerBehavior(TextBehavior);
