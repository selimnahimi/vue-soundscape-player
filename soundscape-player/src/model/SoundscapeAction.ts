export default class SoundscapeAction {
  type: string = 'playrandom';
  time: {min: number, max: number} = {min: 1, max: 1};
  volume: {min: number, max: number} = {min: 1, max: 1};
  pitch: {min: number, max: number} = {min: 100, max: 100};
  soundlevel: string = 'SNDLVL_140dB';
  position: string = 'random';
  rndwave: string[] = [];
  soundscapeToPlay: string = '';
}