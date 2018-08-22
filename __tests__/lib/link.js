import React from 'react'
import shallow from 'react-test-renderer/shallow'
import { Router } from 'react-router-dom'
import { ConnectedLink } from '../../src/lib/link'
import configureMockStore from 'redux-mock-store';

// Necessário usar renderer shallow (apenas 1 camada), para evitar que o react reclame que o 
// Link precisa de um pai router, o que complicaria muito o teste.
const renderer = new shallow()
const mockStore = configureMockStore();

describe('ConnectedLink', () => {
    it('Renderiza corretamente', () => {
        const tree = renderer.render(<ConnectedLink to="/home"/>)
        expect(tree).toMatchSnapshot()
    })

    it('Chama callback loadPage no onClick com argumentos corretos', () => {

        // loadPage mocked. Em uso real, não precisa colocar a função nos props, pois o redux cuida disso.
        const loadPage = jest.fn().mockImplementation(() => {})
        const link = renderer.render(<ConnectedLink  loadPage={loadPage} to="/home">Link</ConnectedLink>)

        // Chama o onClick, e verifica se loadPage foi chamado com o argumento correto.
        link.props.onClick()
        expect(loadPage).toBeCalledWith('/home')
    })

    // No último teste falei que o redux cuida disso, mas e se isso não acontecer? 
    const warn = jest.spyOn(console, 'warn')
    warn.mockImplementation(() => {})

    it('Reclama com warning se loadPage não for passado', () => {
        const link = renderer.render(<ConnectedLink to="/home">Link</ConnectedLink>)
        link.props.onClick()

        expect(warn).toBeCalledWith('ConnectedLink foi chamado sem especificar prop loadPage')
    })
})