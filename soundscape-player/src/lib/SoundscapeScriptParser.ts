import Soundscape from "@/model/Soundscape";
import SoundscapeAction from "@/model/SoundscapeAction";
import SoundscapeScript from "@/model/SoundscapeScript";

export default class SoundscapeScriptParser {
  private currentSoundscapeScript: SoundscapeScript | null = null;
  private depth: number = 0;
  private isBuildingStringBuffer: boolean = false;
  private currentCharacter: string = '';
  private stringBuffer: string = '';
  private currentSoundscape: Soundscape | null = null;
  private currentAction: SoundscapeAction | null = null;
  private currentActionParameterName: string | null = null;

  parseSoundscapeScript(rawText: string): SoundscapeScript {
    this.currentSoundscapeScript = new SoundscapeScript();
    this.depth = 0;
    this.isBuildingStringBuffer = false;
    this.currentCharacter = '';
    this.stringBuffer = '';
    this.currentSoundscape = null;
    this.currentAction = null;
    this.currentActionParameterName = null;

    rawText.split('').forEach(char => this.processCharacter(char));

    return this.currentSoundscapeScript;
  }

  private processCharacter(character: string) {
    if (!character) return;

    this.currentCharacter = character;

    switch(character) {
      case '{':
        this.increaseDepth();
        break;
      case '}':
        this.decreaseDepth();
        break;
      case '"':
        this.updateStringBuffer();
        break;
      default:
        this.appendToStringBuffer();
    }

    this.assertDepthIsPositive();
  }

  private appendToStringBuffer() {
    if (this.isBuildingStringBuffer) {
      this.stringBuffer += this.currentCharacter;
    }
  }

  private updateStringBuffer() {
    if (this.isBuildingStringBuffer) {
      this.finalizeStringBuffer();

      this.isBuildingStringBuffer = false;
    } else {
      this.isBuildingStringBuffer = true;
    }
  }

  private finalizeStringBuffer() {
    if (this.depth === 0) {
      this.startBuildingSoundscape();
    }

    if (this.depth === 1 && this.isBuildingSoundscape()) {
      this.startBuildingAction();
    }

    if (this.depth === 2 && this.isBuildingActionParameter()) {
      this.buildActionParameter();
    }

    if (this.depth === 2 && this.isBuildingAction() && !this.isBuildingActionParameter()) {
      this.startBuildingActionParameter();
    }

    if (this.depth === 3 && this.isBuildingActionParameter()) {
      this.collectRandomSounds();
    }

    this.stringBuffer = '';
  }

  private collectRandomSounds() {
    if (this.currentActionParameterName !== 'rndwave') return;
    if (this.stringBuffer === 'wave') return;

    this.currentAction!.rndwave.push(this.stringBuffer);
  }

  private isBuildingSoundscape() {
    return this.currentSoundscape !== null;
  }

  private isBuildingAction() {
    return this.currentAction !== null;
  }
  
  private startBuildingSoundscape() {
    this.currentSoundscape = new Soundscape();
    this.currentSoundscape.name = this.stringBuffer;
  }

  private startBuildingAction() {
    this.currentAction = new SoundscapeAction();
    this.currentAction.type = this.stringBuffer;
  }

  private startBuildingActionParameter() {
    this.currentActionParameterName = this.stringBuffer;
  }

  private isBuildingActionParameter() {
    return this.currentActionParameterName !== null;
  }

  private buildActionParameter() {
    const parameter = this.currentActionParameterName;
    const value = this.stringBuffer.trim();

    if (parameter === 'name') {
      this.currentAction!.soundscapeToPlay = value;
    }

    if (parameter === 'soundlevel') {
      this.currentAction!.soundlevel = value;
    }

    if (parameter === 'wave') {
      this.currentAction!.rndwave.push(value);
    }

    if (parameter === 'position') {
      this.currentAction!.position = value;
    }

    if (parameter === 'time') {
      this.currentAction!.time = this.parseRange();
    }

    if (parameter === 'volume') {
      this.currentAction!.volume = this.parseRange();
    }

    if (parameter === 'pitch') {
      this.currentAction!.volume = this.parseRange();
    }

    this.stopBuildingActionParameter();
  }

  private stopBuildingActionParameter() {
    this.currentActionParameterName = null;
  }

  private parseRange(): {min: number, max: number} {
    const split = this.stringBuffer.split(",");

    if (split.length > 1) {
      const start = split[0].trim();
      const end = split[1].trim();
      return {
        min: parseInt(start),
        max: parseInt(end)
      }
    } else {
      const singleNumber = split[0];
      return {
        min: parseInt(singleNumber),
        max: parseInt(singleNumber)
      }
    }
  }

  private increaseDepth() {
    this.depth++;
  }

  private decreaseDepth() {
    const newDepth = this.depth - 1;

    if (newDepth === 1 && this.isBuildingAction()) {
      this.currentSoundscape!.actions.push(this.currentAction!);

      this.currentAction = null;
    }

    if (newDepth === 0 && this.isBuildingSoundscape()) {
      this.currentSoundscapeScript!.soundscapes.push(this.currentSoundscape!);
    }

    this.depth = newDepth;
  }

  private assertDepthIsPositive() {
    if (this.depth < 0) {
      console.error("ERROR: Depth has gone below 0!");
    }
  }
}