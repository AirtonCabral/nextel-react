import React from 'react';
import renderer from 'react-test-renderer';
import { Login } from '../../../src/pages/auth/login';


/*
    OBSERVE! Teste de Snapshot só é ÚTIL se o desenvolvedor PERMITIR!
    Snapshots só devem ser atualizados se houve mudança de fato na estrutura visual do componente.

    Procedimento Recomendado:
    1. Antes de escrever código que vai atualizar o visual e portanto o snapshot, rode o respectivo teste para
       verificar que este está passando. Se você fizer a mudança antes, o teste falhará e você não saberá se
       foi o seu código ou algum erro anterior.
    2. Não atualize o snapshot que está falhando se você não modificou o seu respectivo componente. O erro
       só ficará  escondido, levando a potenciais bugs difíceis de encontrar.
    3. Evite de gerar snapshots de componentes monolíticos (e.g. algum roteador que contém a estrutura inteira).
       Este raramente será útil e será atualizado constantemente.
    4. Snapshots também deveriam passar por code review! Pode ser que o snapshot gerado não tenha o conteúdo
       que esteja imaginando.

    Veja dicas e mais em - https://blog.kentcdodds.com/effective-snapshot-testing-e0d1a2c28eca

    - joao
*/

describe('Pagina de login', () => {
    it('Renderiza corretamente quando online', () => {
        const tree = renderer.create(<Login online dispatch={() => {}} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Renderiza corretamente quando offline', () => {
        const tree = renderer.create(<Login online={false} dispatch={() => {}} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Relata erro quando campos vazios são enviados', () => {
        const login = renderer.create(<Login dispatch={() => {}} />)
        const instance = login.getInstance()

        // Submit o formulário
        instance.contactSubmit()

        // Inspeção dos erros
        const { email, password } = instance.state.errors
        expect(email).toBe('Entre com um endereço de email válido.')
        expect(password).toBe('Sua senha não pode estar em branco.')

        // Força atualização do render
        // FIXME: Não funciona no momento! Snapshot recebe null. Aguardado respostas no stackoverflow.com
        // Segue: https://stackoverflow.com/questions/50417807/jest-snapshot-is-null-after-react-instance-is-updated
        login.update()
        expect(login.toJSON()).toMatchSnapshot()
    })

    // Finalmente teste de sucesso
    it('Não relata erros com dados corretos', () => {
        const login = renderer.create(<Login email="correto@teste.com" password="12345" dispatch={() => {}} />)
        const instance = login.getInstance()

        instance.handleValidation()

        const { email, password } = instance.state.errors
        expect(email).toBeFalsy()
        expect(password).toBeFalsy()
    })

    // Variável mockeada usada como props nos próximos testes.
    const history = {
        push: jest.fn().mockImplementation(() => {}),
    }

    it('Redireciona para o dashboard no sucesso da autenticação', () => {
        // Precisamos aqui de um dispatch mocked mais sofisticado, já que o signin é uma promessa.
        const dispatch = () => new Promise(resolve => resolve())

        // Note também que estamos colocando um token no props, como se o redux tivesse colocado.
        const login = renderer.create(<Login history={history} email="correto@teste.com" password="12345" dispatch={dispatch} token={'token'} />)
        const instance = login.getInstance()

        instance.contactSubmit().then(() => {
            expect(history.push).toBeCalledWith('/dashboard')
        })
    })

    it('Não redireciona no erro da autenticação e reporta o erro', () => {
        history.push.mockReset()
        // Precisamos aqui de um dispatch mocked mais sofisticado, já que o signin é uma promessa.
        const dispatch = () => new Promise(resolve => resolve())

        // Note também que estamos colocando um token no props, como se o redux tivesse colocado.
        const login = renderer.create(<Login history={history} email="correto@teste.com" password="12345" dispatch={dispatch} token={undefined} />)
        const instance = login.getInstance()

        instance.contactSubmit().then(() => {
            const { email } = instance.state.errors
            // expect(history.push).not.toBeCalled()
            expect(email).toBe('Usuário ou senha inválidos')
            expect(history.push).not.toBeCalled()
        })
    })
})
