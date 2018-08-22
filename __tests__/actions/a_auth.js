import { API } from '@doctorweb/endpoints';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/a_auth';
import * as types from '../../src/actions/types';

/* global describe, expect, it, jest */
jest.mock('@doctorweb/endpoints')

// Para testar ações assíncronas (que usam dispatch), é necessário fazer o mock do redux
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Verificador de conectividade com webservice', () => {
    const store = mockStore()
    it('Coloca online quando há msgError na resposta', () => {
        store.clearActions()
        const expectedActions = [
            { type: types.ATTEMPT_CONNECTION, online: true },
        ]

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve({ codErro: 9990, msgErro: 'Usuário não encontrado' })),
        }))

        return store.dispatch(actions.attemptConnection())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Coloca offline quando não há msgErro na resposta', () => {
        store.clearActions()
        const expectedActions = [
            { type: types.ATTEMPT_CONNECTION, online: false },
        ]

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve({})),
        }))

        return store.dispatch(actions.attemptConnection())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Coloca offline quando não há resposta', () => {
        store.clearActions()
        const expectedActions = [
            { type: types.ATTEMPT_CONNECTION, online: false },
        ]

        API.mockImplementation(() => ({
            post: () => new Promise((resolve) => { throw resolve }),
        }))

        return store.dispatch(actions.attemptConnection())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})


describe('Serviço de autenticação', () => {
    const store = mockStore()
    const username = 'username'

    // Resposta exemplo.
    const response = {
        token: 'wblXkEeQeM',
        linkAcesso: 'http://54.207.68.25:8080/ords/f?p=111:1&x01=token:wblXkEeQeM',
        modulosAcesso: {
            modulos: [
                {
                    modulo: 'Agendamento Beneficiário',
                    link: 'http://54.207.68.25:8080/ords/f?p=111:20&x01=token:wblXkEeQeM',
                },
                {
                    modulo: 'Agendamento Prestador',
                    link: 'http://54.207.68.25:8080/ords/f?p=111:10&x01=token:wblXkEeQeM',
                },
            ],
        },
        mensagensAcesso: [],
    }

    it('Força o SIGNOUT antes de dar SIGNIN', () => {
        store.clearActions()
        const expectedAction = { type: types.SIGNOUT }

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                // Primeira ação é o SIGNOUT
                expect(store.getActions()[0]).toMatchObject(expectedAction)
            })
    })

    it('Registra o usuário e token com retorno de sucesso', () => {
        store.clearActions()
        const expectedAction = { type: types.SIGNIN, user: username, token: 'wblXkEeQeM' }

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                // Pula a primeira ação ([0]), pois esse deveria conter SIGNOUT
                expect(store.getActions()[1]).toMatchObject(expectedAction)
            })
    })

    it('Registra os módulos e mensagens de acesso do usúario', () => {
        store.clearActions()

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                // Pula a primeira ação ([0]), pois esse deveria conter SIGNOUT
                let action = store.getActions()[1]
                expect(action.modules).toBeTruthy()
                expect(action.messages).toBeTruthy()
            })
    })

    it('Não registra ação com retorno de erro', () => {
        store.clearActions()

        API.mockImplementation(() => ({
            post: () => new Promise((resolve) => { throw resolve }),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                // Length 1 implica que apenas o signout anterior ocorreu
                expect(store.getActions()).toHaveLength(1)
            })
    })

    // Os seguintes testes usam a variável warn
    const warn = jest.spyOn(console, 'warn')
    // É possível rodar o teste apenas com o spyOn, mas quero
    // Eliminar ruído no relatório do teste. Warn faz nada.
    warn.mockImplementation(() => {})

    it('Reclama quando o webservice não retorna token', () => {
        const bad_response = { ...response }
        delete bad_response.token

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(bad_response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                expect(warn).toHaveBeenCalled()
                warn.mockReset()
            })
    })

    it('Reclama quando o webservice não retorna módulo', () => {
        const bad_response = { ...response }
        delete bad_response.modulosAcesso

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(bad_response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                expect(warn).toHaveBeenCalled()
                warn.mockReset()
            })
    })

    it('Reclama quando o webservice não retorna mensagens', () => {
        const bad_response = { ...response }
        delete bad_response.mensagensAcesso

        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(bad_response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                expect(warn).toHaveBeenCalled()
                warn.mockReset()
            })
    })

    it('Não reclama quando o webservice retorna corretamente', () => {
        API.mockImplementation(() => ({
            post: () => new Promise(resolve => resolve(response)),
        }))

        return store.dispatch(actions.signIn(username, 'password'))
            .then(() => {
                expect(warn).not.toHaveBeenCalled()
                warn.mockReset()
            })
    })

    it('Tem ação signOut cujo tipo é SIGNOUT', () => {
        store.clearActions()
        const expectedActions = [
            { "type": types.SIGNOUT }
        ]
        store.dispatch(actions.signOut())
        expect(store.getActions()).toMatchObject(expectedActions)
    })
})
