import messages from '../../src/reducers/r_messages'
import { SIGNIN, SIGNOUT } from '../../src/actions/types';

describe('Reducer de mensagens', () => {
    const initialState = []
    const examples = [
        {
            titulo: 'Primeira Mensagem',
            mensagem: 'Conteúdo da primeira mensagem',
            dataCadastro: '21/05/2018 16:52',
        },
        {
            titulo: 'Segunda Mensagem',
            mensagem: 'Conteúdo da segunda mensagem',
            dataCadastro: '21/05/2018 16:52',
        },
    ]

    it('Recebe dados na ação SIGNIN', () => {
        const signin = { type: SIGNIN, messages: examples }
        expect(messages(initialState, signin)).toBe(examples)
    })

    it('Elimina dados na ação SIGNOUT', () => {
        const signout = { type: SIGNOUT }
        expect(messages(examples, signout)).toEqual(initialState)
    })

    it('Retorna o estado atual em qualquer outra ação', () => {
        // Essa ação deveria ser ignorada. Se não for ignorada, o reducer vai
        // retornar o estado inicial.
        const other = { type: 'OTHER', messages: initialState }
        expect(messages(examples, other)).toBe(examples)
    })
})
