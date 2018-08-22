import store, { history } from '../store'

// Validação de Email
export function email_isValid(email) {
    return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
}

export function loginRequired() {
    if (store.getState().auth.user == null) {
        history.push('/login')
    }
}
