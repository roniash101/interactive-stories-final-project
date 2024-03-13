/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import storyConfig from '../story/story-config';

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string,
}

type AppState = {
    state: 'start' | 'middle' | 'end',
    interactionEnabled: boolean,
    isVictory: boolean,
    title: string,
    sceneDescription: string;
    status: 'idle' | 'text-loading' | 'view-loading' | 'error';
    inputMessage: string; //
    innerDialogue: string;
    charactersText: {};
    goalProgress: {},
    participants: string[],
    messages: Message[];
}

const initAppState: AppState = {
    state: 'start',
    interactionEnabled: false,
    isVictory: false,
    title: storyConfig.name,
    sceneDescription: storyConfig.startSceneDescription,
    status: 'idle',
    inputMessage: '',
    innerDialogue: storyConfig.innerDialogue,
    charactersText: {
        'Galit': '',
        'Smadar': '',
        'Barak': ''
    },
    goalProgress: {
        'Galit': 0,
        'Smadar': 0,
        'Barak': 0
    },
    participants: ['Lilach'],
    messages: [
        { role: 'system', content: storyConfig.instructions },
    ],
}

const AppStateContext = createContext(initAppState);
const AppStateReducerContext = createContext<Dispatch<SetStateAction<AppState>>>(() => null);

export default function AppStateProvider({ children }: PropsWithChildren) {
    const [appState, setAppState] = useState(initAppState);

    return (
        <AppStateContext.Provider value={appState}>
            <AppStateReducerContext.Provider value={setAppState}>
                {children}
            </AppStateReducerContext.Provider>
        </AppStateContext.Provider>
    )
}

export function useAppState() { return useContext(AppStateContext) }
export function useSetAppState() {
    const set = useContext(AppStateReducerContext);
    return (newState: Partial<AppState>) => {
        set(currentState => ({ ...currentState, ...newState }));
    }
}





