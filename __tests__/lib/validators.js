import { email_isValid } from '../../src/lib/validators'

describe('Validador de Email', () => {
    it('Retorna não válido 1: errado', () => {
        const valid = email_isValid('errado')
        expect(valid).toBeFalsy()
    })

    it('Retorna não válido 2: errado@', () => {
        const valid = email_isValid('errado@')
        expect(valid).toBeFalsy()
    })

    it('Retorna não válido 3: errado@teste', () => {
        const valid = email_isValid('errado@teste')
        expect(valid).toBeFalsy()
    })

    it('Retorna não válido 4: .errado@teste.com', () => {
        const valid = email_isValid('.errado@teste.com')
        expect(valid).toBeFalsy()
    })

    it('Retorna não válido 5: mais..errado@teste.com', () => {
        const valid = email_isValid('mais..errado@teste.com')
        expect(valid).toBeFalsy()
    })

    it('Retorna não válido 6: errado.@teste.com', () => {
        const valid = email_isValid('errado.@teste.com')
        expect(valid).toBeFalsy()
    })

    it('Retorna não válido 7: errado @teste.com', () => {
        const valid = email_isValid('errado @teste.com')
        expect(valid).toBeFalsy()
    })
})