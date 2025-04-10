// prettier-ignore
import '@radix-ui/themes/styles.css';
// prettier-ignore
import '@/styles/global.css';

import { RouteManager } from '@/router-manager';
import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './components/providers/auth/auth-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme
        //radius="full"
        accentColor="lime"
        grayColor="slate"
        panelBackground="solid"
        //scaling="110%"
      >
        <AuthProvider>
          <RouteManager />
        </AuthProvider>
      </Theme>
    </BrowserRouter>
  </StrictMode>,
);
