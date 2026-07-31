/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// UI Lib Components
import { TooltipProvider } from './components/ui/tooltip.tsx';

// UI Local Components
import App from './App.tsx';

/* -------------------------------------------------------------------------- */
/*                                 CREATE ROOT                                */
/* -------------------------------------------------------------------------- */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
);