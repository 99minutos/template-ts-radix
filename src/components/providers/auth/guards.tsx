import { useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren, useEffect } from 'react';

import { LoadingPage } from './loading';
import { Auth0WithoutPermission } from './restricted';

// redirect to login page if not authenticated
export const AuthRequired = (props: PropsWithChildren) => {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !error) {
      loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
      });
    }
  }, [isAuthenticated, error, isLoading, loginWithRedirect]);

  if (isLoading || (!isAuthenticated && !isLoading && !error)) {
    return <LoadingPage />;
  }

  if (error) {
    return <Auth0WithoutPermission />;
  }

  return props.children;
};
