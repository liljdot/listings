import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.tsx'
// @ts-expect-error import from js file
import { seedLocalDatabase } from '@/api/data/seed';

seedLocalDatabase()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
