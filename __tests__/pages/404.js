import React from 'react';
import shallow from 'react-test-renderer/shallow';
import { NotFound } from '../../src/pages/404'


// Só quero gerar o snapshot da primeira camada react.
const renderer = new shallow()

describe('Pagina de 404', () => {
    it('Renderiza corretamente', () => {
        const tree = renderer.render(<NotFound />)
        expect(tree).toMatchSnapshot()
    })
})