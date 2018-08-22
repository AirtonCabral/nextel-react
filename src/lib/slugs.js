
export function toSlug(string) {
    let slug = string.trim()
    slug = slug.toLowerCase()

    const from = 'àáãäâèéëêìíïîòóöôùúüûñç·_,:;/'
    const to =   'aaaaaeeeeiiiioooouuuunc-----_'

    for (let i = 0, l = from.length; i < l; i += 1) {
        slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    slug = slug.replace(/[^a-z0-9 _-]/g, '-') // Troca caracteres inválidos por -
        .replace(/\s+/g, '-') // Troca espaço em branco por -
        .replace(/-+/g, '-') // Transforma múltiplos "-" por um
        .replace(/^[^a-z0-9]/, '') // Remova primeiro caracter que não seja alfanumérico
        .replace(/[^a-z0-9]$/, '') // Remova última caracter que não seja alfanumérico

    return slug
}
