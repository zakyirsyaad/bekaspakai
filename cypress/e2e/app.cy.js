describe('Website Navigation', () => {
    beforeEach(() => {
        // Kunjungi halaman utama sebelum setiap pengujian
        cy.visit('http://localhost:3000/')
    })

    it('should navigate to the home page and verify content', () => {
        // Verifikasi halaman utama
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('should navigate to the specified product page', () => {
        // Temukan link dengan href yang mengarah ke halaman produk tertentu dan klik
        cy.get('a[href*="JenisProduct/Jual-Beli/5f135b8f-6a8f-45e5-8590-dd0b61eb8bb7"]').click()

        // Verifikasi URL halaman produk
        cy.url().should('include', 'JenisProduct/Jual-Beli/5f135b8f-6a8f-45e5-8590-dd0b61eb8bb7')
    })

    it('should navigate to the categories page', () => {
        // Temukan link yang mengarah ke halaman kategori dan klik
        cy.get('a[href*="kategori/Peralatan-Dapur"]').click()

        // Verifikasi URL halaman kategori
        cy.url().should('include', '/kategori/Peralatan-Dapur')

        // Verifikasi konten halaman kategori
        cy.contains('Kategori') // Sesuaikan teks atau elemen yang ada di halaman kategori
    })
})
