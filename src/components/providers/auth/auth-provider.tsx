import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { VITE_AUTH0_CLIENT_ID, VITE_AUTH0_DOMAIN } from '@/utils/envs';

export default function AuthProvider(props: PropsWithChildren) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      authorizationParams={{
        prompt: 'login',
        redirect_uri: `${window.location.origin}`,
        audience: `https://${VITE_AUTH0_DOMAIN}`,
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
    >
      {props.children}
    </Auth0Provider>
  );
}
