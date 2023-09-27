// store.ts
import type Soundscape from '@/model/Soundscape'
import type SoundscapeScript from '@/model/SoundscapeScript'
import { type InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
    soundscapeScripts: SoundscapeScript[],
    currentlyPlayingSoundscapes: Soundscape[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
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
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}