// Configura aqui se estamos em modo de produção ou debug
const DEBUG = true

let url
if (DEBUG) {
    url = 'https://www.mocky.io/v2'
} else {
    url = 'https://apidev.nextel.n3r.com.br'
}

export const remoteApi = url
export const endpoints = {
    nextel: {
        auth: '/5b691543330000173e32de04',
        user: '/5b860f8f300000904a7294b0',
        products: '/5b84d4523000005600728f06',
        // products: '/5b7e044a3300004e444a04c4',
        // products: '/5b73a8803500009d01531c08',
        // auth: '/vas/token',
        // user: '/feppn/getportfolio/{msisdn}',
        // products: '/feppn/catalogo',
        save: '/feppn/newportfolio',
    },
}
