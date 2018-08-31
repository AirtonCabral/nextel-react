import auth from '../../src/reducers/r_auth'
import { SIGNIN, SIGNOUT, ATTEMPT_CONNECTION } from '../../src/actions/types';

describe('Reducer de mensagens', () => {
    const initialState = {
        online: true,
        user: null,
        token: null,
    }

    const data = {
        user: 'username',
        token: 'token',
    }

    it('Recebe user e token na ação SIGNIN', () => {
        const signin = { ...data, type: SIGNIN }
        expect(auth(initialState, signin)).toMatchObject(data)
    })

    it('Elimina dados na ação SIGNOUT', () => {
        const signout = { type: SIGNOUT }
        expect(auth(data, signout)).toMatchObject({ user: null, token: null })
    })

    it('Configura corretamente a conectividade com a ação ATTEMPT_CONNECTION 1: online', () => {
        const attempt = { type: ATTEMPT_CONNECTION, online: true }
        expect(auth(initialState, attempt).online).toBeTruthy()
    })

    it('Configura corretamente a conectividade com a ação ATTEMPT_CONNECTION 1: offline', () => {
        const attempt = { type: ATTEMPT_CONNECTION, online: false }
        expect(auth(initialState, attempt).online).toBeFalsy()
    })

    it('Retorna o estado atual em qualquer outra ação', () => {
        // Essa ação deveria ser ignorada. Se não for ignorada, o reducer vai
        // retornar o estado inicial.
        const other = { type: 'OTHER', user: 'other-user', token: 'other-token' }
        expect(auth(data, other)).toBe(data)
    })
})
