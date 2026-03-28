import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'
import { clearUser, setUser } from './redux/auth/authSlice'

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    )
  } else {
    store.dispatch(clearUser())
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
