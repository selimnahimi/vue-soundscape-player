import Soundscape from "@/model/Soundscape";
import SoundscapeAction from "@/model/SoundscapeAction";
import SoundscapeScript from "@/model/SoundscapeScript";

export default class SoundscapeScriptParser {
    private soundscapeScript: SoundscapeScript = new SoundscapeScript();
    private depth: number = 0;
    private isBuildingStringBuffer: boolean = false;
    private currentCharacter: string = '';
    private stringBuffer: string = '';
    private currentSoundscape: Soundscape | null = null;
    private currentAction: SoundscapeAction | null = null;
    private currentActionParameterName: string | null = null;

    static parse(rawText: string): SoundscapeScript {
        const parser = new SoundscapeScriptParser();

        rawText.split('')
            .forEach(char => parser.processCharacter(char));

        return parser.getResult();
    }

    private getResult() {
        return this.soundscapeScript;
    }

    private processCharacter(character: string) {
        if (!character) return;

        this.currentCharacter = character;

        switch (character) {
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
        if (this.shouldStartBuildingSoundscape()) {
            this.startBuildingSoundscape();
        }

        if (this.shouldStartBuildingAction()) {
            this.startBuildingAction();
        }

        if (this.shouldBuildActionParameter()) {
            this.buildActionParameter();
        }

        if (this.shouldStartBuildingActionParameter()) {
            this.startBuildingActionParameter();
        }

        if (this.shouldCollectRandomSounds()) {
            this.collectRandomSounds();
        }

        this.resetStringBuffer();
    }

    private shouldStartBuildingSoundscape() {
        return this.depth === 0;
    }

    private startBuildingSoundscape() {
        this.currentSoundscape = new Soundscape();
        this.currentSoundscape.name = this.stringBuffer;
    }

    private isBuildingSoundscape() {
        return this.currentSoundscape !== null;
    }

    private shouldStartBuildingAction() {
        return this.depth === 1 && this.isBuildingSoundscape();
    }

    private startBuildingAction() {
        this.currentAction = new SoundscapeAction();
        this.currentAction.type = this.stringBuffer;
    }

    private isBuildingAction() {
        return this.currentAction !== null;
    }

    private shouldStartBuildingActionParameter() {
        return this.depth === 2 && this.isBuildingAction() && !this.isBuildingActionParameter();
    }

    private startBuildingActionParameter() {
        this.currentActionParameterName = this.stringBuffer;
    }

    private isBuildingActionParameter() {
        return this.currentActionParameterName !== null;
    }

    private shouldBuildActionParameter() {
        return this.depth === 2 && this.isBuildingActionParameter();
    }

    private buildActionParameter() {
        const parameter = this.currentActionParameterName;
        const value = this.stringBuffer.trim();
        const action = this.currentAction!;

        switch(parameter) {
            case 'name':
                action.soundscapeToPlay = value;
                break;
            case 'soundlevel':
                action.soundscapeToPlay = value;
                break;
            case 'wave':
                action.rndwave.push(value);
                break;
            case 'position':
                action.position = value;
                break;
            case 'time':
                action.time = this.parseRange();
                break;
            case 'volume':
                action.volume = this.parseRange();
                break;
            case 'pitch':
                action.pitch = this.parseRange();
                break;
        }

        this.currentAction = action;

        this.stopBuildingActionParameter();
    }

    private stopBuildingActionParameter() {
        this.currentActionParameterName = null;
    }

    private shouldCollectRandomSounds() {
        return this.depth === 3 && this.isBuildingActionParameter();
    }

    private collectRandomSounds() {
        if (this.currentActionParameterName !== 'rndwave') return;
        if (this.stringBuffer === 'wave') return;

        this.currentAction!.rndwave.push(this.stringBuffer);
    }

    private resetStringBuffer() {
        this.stringBuffer = '';
    }

    private parseRange(): { min: number, max: number } {
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
            this.soundscapeScript!.soundscapes.push(this.currentSoundscape!);
        }

        this.depth = newDepth;
    }

    private assertDepthIsPositive() {
        if (this.depth < 0) {
            console.error("ERROR: Depth has gone below 0!");
        }
    }
}