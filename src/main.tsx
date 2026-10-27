/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

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
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          hideIconVariant
          classes={{ containerRoot: 'z-[9999]' }}
        >
          <App />
        </SnackbarProvider>
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
);