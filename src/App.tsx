import * as React from 'react';
import AppRouter from './components/appRouter/AppRouter';
import TranslationProvider from './utilities/TranslationsProvider'

function App() {
  return (
    <TranslationProvider>
      <AppRouter/>
    </TranslationProvider>
  )
}

export default App;