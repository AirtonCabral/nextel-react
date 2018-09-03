import modules from '../../src/reducers/r_modules'
import { SIGNIN, SIGNOUT } from '../../src/actions/types';

describe('Reducer de módulos', () => {
    const initialState = []
    const examples = [
        {
            modulo: 'Agendamento Beneficiário',
            link: 'http://54.207.68.25:8080/ords/f?p=111:20&x01=token:wblXkEeQeM',
        },
        {
            modulo: 'Agendamento Prestador',
            link: 'http://54.207.68.25:8080/ords/f?p=111:10&x01=token:wblXkEeQeM',
        },
    ]

    it('Recebe dados na ação SIGNIN', () => {
        const signin = { type: SIGNIN, modules: examples }
        expect(modules(initialState, signin)).toBe(examples)
    })

    it('Elimina dados na ação SIGNOUT', () => {
        const signout = { type: SIGNOUT }
        expect(modules(examples, signout)).toEqual(initialState)
    })

    it('Retorna o estado atual em qualquer outra ação', () => {
        // Essa ação deveria ser ignorada. Se não for ignorada, o reducer vai
        // retornar o estado inicial.
        const other = { type: 'OTHER', modules: initialState }
        expect(modules(examples, other)).toBe(examples)
    })
})
