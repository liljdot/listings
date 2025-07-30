import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.tsx'
// @ts-expect-error import from js file
import { seedLocalDatabase } from '@/api/data/seed';
import { Provider } from 'react-redux';
import store from './state/store.ts';
import AuthProvider from './features/shared/auth/contexts/AuthProvider.tsx';
import ThemeProvider from './features/shared/theme/contexts/ThemeProvider.tsx';

seedLocalDatabase()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  </Provider >,
)
