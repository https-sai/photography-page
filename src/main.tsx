// React core imports for rendering
import React from 'react'
import ReactDOM from 'react-dom/client'
// React Router imports for client-side routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Global CSS styles
import './index.css'

// Import page components
import App from './App'
import Narrative from './pages/Narrative'
import Photography from './pages/Photography'
import Contact from './pages/Contact'
import Loading from './pages/Loading'
import Videography from './pages/Videography'

/**
 * Router Configuration
 * Defines all routes and their corresponding components
 * Uses nested routing structure with parent/child relationships
 */
const router = createBrowserRouter([
  {
    // Root route - shows loading page first
    path: '/',
    element: <Loading />,
  },
  {
    // Main app route - parent layout with navigation
    path: '/app',
    element: <App />,
    // Child routes that render inside App component's <Outlet />
    children: [
      // Index route - shows when visiting /app directly
      { index: true, element: <Narrative /> },
      // Individual page routes
      { path: 'narrative', element: <Narrative /> },
      { path: 'videography', element: <Videography />},
      { path: 'photography', element: <Photography /> },
      { path: 'contact', element: <Contact /> },
    ]
  }
])

/**
 * App Entry Point
 * Renders the React app to the DOM with routing enabled
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* RouterProvider makes routing available throughout the app */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
