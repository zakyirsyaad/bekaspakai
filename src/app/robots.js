export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // Ganti atau tambahkan path yang tidak ingin diindeks
        },
        sitemap: 'https://bekaspakai.com/sitemap.xml', // URL sitemap aktual Anda
    }
}
