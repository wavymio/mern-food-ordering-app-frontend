import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const Auth0ProiderWithNavigate = ({ children }) => {
    const navigate = useNavigate()

    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("unable to initialize auth")
    }

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || "/auth-callback")
    }

    return (
        <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
            redirect_uri: redirectUri,
            audience
        }} onRedirectCallback={onRedirectCallback} cacheLocation="localstorage" useRefreshTokens={true}>
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProiderWithNavigate
