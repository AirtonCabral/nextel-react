// Configura aqui se estamos em modo de produção ou debug
const DEBUG = true

let url
if (DEBUG) {
    url = 'http://www.mocky.io/v2'
} else {
    url = 'https://apidev.nextel.n3r.com.br'
}

export const remoteApi = url
export const endpoints = {
    nextel: {
        auth: '/5b691543330000173e32de04',
        user: '/5b69199f3200004c00af5a45',
        services: '/5b73a8803500009d01531c08',
        // auth: '/vas/token',
        // user: '/feppn/getportfolio/{msisdn}',
        // services: '/feppn/catalogo',
        save: '/feppn/newportfolio',
    },
}
