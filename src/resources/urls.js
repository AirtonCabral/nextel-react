// Configura aqui se estamos em modo de produção ou debug
const DEBUG = false

let url
if (DEBUG) {
    url = 'https://www.mocky.io/v2'
} else {
    url = 'https://apidev.nextel.n3r.com.br'
}

const nextel_mock = {
    auth: '/5b691543330000173e32de04',
    user: '/5b860f8f300000904a7294b0',
    products: '/5b84d4523000005600728f06',
    save: '/5b8715ff340000db018b586f',
};

const nextel_production = {
    auth:       '/vas/token',
    user:       '/feppn/getportfolio/{msisdn}',
    products:   '/feppn/catalogo',
    save:       '/feppn/newportfolio',
};

export const remoteApi = url
export const endpoints = {
    nextel: DEBUG ? nextel_mock : nextel_production
}
