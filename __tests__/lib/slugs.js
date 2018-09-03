import { toSlug } from '../../src/lib/slugs'

describe('Slugificador de strings transforma', () => {
    it('"Slug Normal" -> "slug-normal"', () => {
        const slug = toSlug('Slug Normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug-normal" -> "slug-normal"', () => {
        const slug = toSlug('slug-normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug---normal" -> "slug-normal"', () => {
        const slug = toSlug('slug---normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug   normal" -> "slug-normal"', () => {
        const slug = toSlug('slug   normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug?normal" -> "slug-normal"', () => {
        const slug = toSlug('slug?normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug/normal" -> "slug_normal"', () => {
        const slug = toSlug('slug/normal')
        expect(slug).toBe('slug_normal')
    })

    it('"/slug/com/path" -> "slug_com_path"', () => {
        const slug = toSlug('/slug/com/path')
        expect(slug).toBe('slug_com_path')
    })

    it('"/slug/com/path/" -> "slug_com_path"', () => {
        const slug = toSlug('/slug/com/path/')
        expect(slug).toBe('slug_com_path')
    })

    it('"slug\\normal" -> "slug-normal"', () => {
        const slug = toSlug('slug\\normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug:normal" -> "slug-normal"', () => {
        const slug = toSlug('slug:normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug_normal" -> "slug-normal"', () => {
        const slug = toSlug('slug_normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug___normal" -> "slug-normal"', () => {
        const slug = toSlug('slug___normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug,normal" -> "slug-normal"', () => {
        const slug = toSlug('slug,normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug,,,normal" -> "slug-normal"', () => {
        const slug = toSlug('slug,,,normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug;normal" -> "slug-normal"', () => {
        const slug = toSlug('slug;normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slug;;;normal" -> "slug-normal"', () => {
        const slug = toSlug('slug;;;normal')
        expect(slug).toBe('slug-normal')
    })

    it('"slúgé-nörmálï" -> "sluge-normali"', () => {
        const slug = toSlug('slúgã-nörmál')
        expect(slug).toBe('sluga-normal')
    })

    it('"slug 1234567890 normal" -> "slug-123567890-normal"', () => {
        const slug = toSlug('slug 1234567890 normal')
        expect(slug).toBe('slug-1234567890-normal')
    })
})