import {API} from '@doctorweb/endpoints'

// Por enquanto eu não sei qual é o endereço do webservice de autenticação
ws_url = "54.207.68.25:3000"
api = new API(ws_url)

export const connected = api.options("/auth").include("POST")