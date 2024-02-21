/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import storyConfig from '../story/story-config';

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string, //| 'Lilach'| 'Galit' | 'Barak' | 'Smadar'
}

type AppState = {
    sceneDescription: string,
    messages: Message[];
    innerDialogue: string,
    status: 'idle' | 'loading' | 'error';
    inputMessage: '';
}

const initAppState: AppState = {
    sceneDescription: storyConfig.sceneDescription,
    messages: [
        { role: 'system', content: storyConfig.instructions },
        // { role: 'assistant', content: storyConfig.openingLine },
        // { role: 'assistant', content: storyConfig.callToAction }
    ],
    innerDialogue: '',
    status: 'idle',
    inputMessage: '',
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





