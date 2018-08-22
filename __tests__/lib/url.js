import { parseGetParams } from 'lib/url'

describe('Parser de parâmetros GET', () => {
    it('?test=1 => {test: 1}', () => {
        let location = {
            search: '?test=1'
        }
        let expected = { test: '1' }

        expect(parseGetParams(location)).toEqual(expected)
    })

    it('?test=1&test2=2 => {test1: "1", test2: "2"}', () => {
        let location = {
            search: '?test1=1&test2=2'
        }
        let expected = { test1: '1', test2: '2' }

        expect(parseGetParams(location)).toEqual(expected)
    })

    it('"" => {}', () => {
        let location = {
            search: ''
        }
        let expected = {}

        expect(parseGetParams(location)).toEqual(expected)
    })
})