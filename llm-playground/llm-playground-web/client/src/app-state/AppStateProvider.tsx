/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import storyConfig from '../story/story-config';

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string, //| 'Lilach'| 'Galit' | 'Barak' | 'Smadar'
}

type AppState = {
    status: 'idle' | 'text-loading' | 'view-loading' | 'error';
    inputMessage: '';
    sceneDescription: string;
    innerDialogue: string;
    charactersText: {};
    participants: string[],
    messages: Message[];
}

const initAppState: AppState = {
    status: 'idle',
    inputMessage: '',
    sceneDescription: storyConfig.sceneDescription,
    innerDialogue: '',
    charactersText: {
        'Galit': '',
        'Smadar': '',
        'Barak': ''
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





