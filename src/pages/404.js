import React from 'react'
import ConnectedLink from '../lib/link'

export const NotFound = () => (
    <div style={{ 'paddingLeft': 50 }}>
        <h1>Página não encontrada :(</h1>
        <h2><span role="img">🚑 </span>Volte para o seu <ConnectedLink to="/">dashboard</ConnectedLink></h2>
    </div>
)

export default NotFound
