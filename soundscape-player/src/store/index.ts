import type Soundscape from '@/model/Soundscape'
import type SoundscapeScript from '@/model/SoundscapeScript'
import { type InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
    soundFiles: { [key: string]: File},
    soundscapeScripts: SoundscapeScript[],
    currentlyPlayingSoundscapes: Soundscape[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        soundFiles: {},
        soundscapeScripts: [],
        currentlyPlayingSoundscapes: []
    },
    getters: {
        soundscapeScripts(state: State) {
            return state.soundscapeScripts;
        },

        currentlyPlayingSoundscapes(state: State) {
            return state.currentlyPlayingSoundscapes;
        },

        allSoundscapes(state: State) {
            return state.soundscapeScripts.flatMap(script => script.soundscapes); 
        },

        soundFiles(state: State) {
            return state.soundFiles;
        }
    },
    mutations: {
        addSoundscapeScript(state: State, script: SoundscapeScript) {
            state.soundscapeScripts.push(script);
        },

        playSoundscape(state: State, soundscape: Soundscape) {
            console.log(state.currentlyPlayingSoundscapes);
            state.currentlyPlayingSoundscapes.push(soundscape);
        },

        clearPlayingSoundscapes(state: State) {
            state.currentlyPlayingSoundscapes = [];
        },

        addSoundFile(state: State, file: File) {
            const path = file.webkitRelativePath;
            if (path in state.soundFiles)
                return;
            
            state.soundFiles[path] = file;
        }
    },
    actions: {
        addSoundscapeScript(context: Store<State>, payload: any) {
            context.commit('addSoundscapeScript', payload.script)
        },

        playSoundscape(context: Store<State>, payload: any) {
            context.commit('playSoundscape', payload.soundscape);
        },

        clearPlayingSoundscapes(context: Store<State>) {
            context.commit('clearPlayingSoundscapes');
        },

        addSoundFile(context: Store<State>, payload: any) {
            context.commit('addSoundFile', payload.file);
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}