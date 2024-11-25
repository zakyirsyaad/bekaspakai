export default function manifest() {
    return {
        name: 'Bekaspakai - Marketplace Barang Bekas Berkualitas di Indonesia',
        short_name: 'Bekaspakai',
        description: "Bekaspakai adalah platform terpercaya untuk donasi dan jual beli barang bekas berkualitas di Indonesia. Dukung gaya hidup minimalis dengan transaksi aman, cepat, dan mudah melalui Bekaspakai.",
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
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
                sizes: '48x48',
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
