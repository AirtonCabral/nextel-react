export function parseGetParams(location) {
    let params = {}
    let query = location.search.substring(1)
    
    if (query.length === 0) return {}

    query.split('&').forEach((filter) => { 
        let item = filter.split('=')
        params[item[0]] = decodeURIComponent(item[1])
    })

    return params
}