export default function manifest() {
    return {
        name: 'Bekaspakai - Marketplace Barang Bekas',
        short_name: 'Bekaspakai',
        description: 'Marketplace terpercaya di Indonesia untuk jual beli barang bekas berkualitas.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff', // Warna latar belakang aplikasi
        theme_color: '#ffffff', // Warna tema aplikasi (header)
        icons: [
            {
                src: '/android-chrome-192x192.png', // Ikon 192x192 (standar Android)
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png', // Ikon 512x512 (standar untuk PWA)
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-touch-icon.png', // Ikon Apple Touch
                sizes: '180x180',
                type: 'image/png',
            },
            {
                src: '/favicon-16x16.png', // Ikon 16x16 untuk favicon standar
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/favicon-32x32.png', // Ikon 32x32 untuk favicon standar
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/favicon.ico', // Favicon .ico
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/android-chrome-maskable-512x512.png', // Ikon maskable untuk Android
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            }
        ],
        orientation: 'portrait', // Mengunci orientasi ke mode potret
        lang: 'id', // Bahasa aplikasi
    };
}
