import { SETTINGS } from "../settings"
import AppStateProvider from "./app-state/AppStateProvider"
import InteractorInputView from "./components/interactor-input/InteractorInput"
import ContentView from "./views/content-view/ContentView"

function App() {

  return (
    <AppStateProvider>
      <ContentView />
    </AppStateProvider>
  )
}

export default App
