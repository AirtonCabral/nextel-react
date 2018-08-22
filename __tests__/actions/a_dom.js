import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { loadPage } from '../../src/actions/a_dom'
import { LOAD_PAGE } from '../../src/actions/types'

// Para testar ações assíncronas (que usam dispatch), é necessário fazer o mock do redux
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Ação loadPage', () => {

    const store = mockStore()

    beforeEach(() => {
        store.clearActions()
    })

    it('Contém `page` que é igual ao string de entrada', () => {
        const arg = '/string'
        store.dispatch(loadPage(arg))
        const action = store.getActions()[0]

        expect(action.page).toBe(arg)
    })

    it('Retorna tipo LOAD_PAGE quando argumento é string', () => {
        const arg = '/string'
        store.dispatch(loadPage(arg))
        const action = store.getActions()[0]

        expect(action.type).toBe(LOAD_PAGE)
    })

    it('Retorna tipo LOAD_PAGE quando argumento é numérico', () => {
        const arg = 9999
        store.dispatch(loadPage(arg))
        const action = store.getActions()[0]

        expect(action.type).toBe(LOAD_PAGE)
        expect(action.page).toBe(arg.toString())
    })

    it('Não retorna tipo quando argumento é função', () => {
        // Argumento é uma função
        const arg = () => {}
        store.dispatch(loadPage(arg))
        const actions = store.getActions()

        expect(actions).toEqual([])
    })

    it('Não retorna tipo quando argumento é objeto', () => {
        // Argumento é uma função
        const arg = {}
        store.dispatch(loadPage(arg))
        const actions = store.getActions()

        expect(actions).toEqual([])
    })

    it('Aceita parâmetros em forma de objeto', () => {
        const arg = '/string'
        const params = {
            item1: 'item1',
            item2: 'item2',
        }

        store.dispatch(loadPage(arg,params))
        const action = store.getActions()[0]
        expect(action.params).toEqual(params)
    })

    it('Ignora parâmetros que não seja em forma de objeto', () => {
        const arg = '/string'
        const params = 'dontacceptstringparams'

        store.dispatch(loadPage(arg,params))
        const action = store.getActions()[0]
        expect(action.params).toEqual({})
    })
})
