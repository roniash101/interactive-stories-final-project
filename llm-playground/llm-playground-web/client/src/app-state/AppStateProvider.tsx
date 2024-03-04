/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import storyConfig from '../story/story-config';

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string, //| 'Lilach'| 'Galit' | 'Barak' | 'Smadar'
}

type AppState = {
    title: string,
    sceneDescription: string;
    status: 'idle' | 'text-loading' | 'view-loading' | 'error';
    inputMessage: '';
    innerDialogue: string;
    charactersText: {};
    charactersProgress: {},
    participants: string[],
    messages: Message[];
}

const initAppState: AppState = {
    title: storyConfig.name,
    sceneDescription: storyConfig.sceneDescription,
    status: 'idle',
    inputMessage: '',
    innerDialogue: '',
    charactersText: {
        'Galit': '',
        'Smadar': '',
        'Barak': ''
    },
    charactersProgress: { // todo: change to 0
        'Galit': 0,
        'Smadar': 0,
        'Barak': 0
    },
    participants: ['Lilach', 'Galit'],
    messages: [
        { role: 'system', content: storyConfig.instructions },
        // { role: 'system', content: "SYSTEM: Lilach has Joined the conversation" },
        // { role: 'system', content: "SYSTEM: Galit has Joined the conversation" },
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





