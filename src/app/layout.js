import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Searchbar from "./Searchbar";

const bekaspakaiFont = localFont({
  src: [
    {
      path: './fonts/Esphimere Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: './fonts/Esphimere Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/Esphimere.otf',
      weight: '400',
      style: 'normal'

    },
    {
      path: './fonts/Esphimere Semi Bold.otf',
      weight: '500',
      style: 'normal'

    },
    {
      path: './fonts/Esphimere Semi Bold.otf',
      weight: '600',
      style: 'normal'

    },
    {
      path: './fonts/Esphimere Bold.otf',
      weight: '700',
      style: 'normal'

    },
    {
      path: './fonts/Esphimere Bold.otf',
      weight: '800',
      style: 'normal'

    },
    {
      path: './fonts/Esphimere Bold.otf',
      weight: '900',
      style: 'normal'

    },
  ],
  variable: '--font-esphimere',
  display: 'swap',
});

export const metadata = {
  title: "Bekaspakai - Marketplace Barang Bekas Berkualitas di Indonesia",
  description: "Bekaspakai adalah platform terpercaya untuk donasi dan jual beli barang bekas berkualitas di Indonesia. Dukung gaya hidup minimalis dengan mudah dan cepat.",
  openGraph: {
    title: "Bekaspakai - Marketplace Barang Bekas Berkualitas di Indonesia",
    description: "Bekaspakai adalah platform terpercaya untuk donasi dan jual beli barang bekas berkualitas di Indonesia. Dukung gaya hidup minimalis dengan mudah dan cepat.",
    url: "https://www.bekaspakai.com",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/Bekaspakai-logo-_Logomark%20white.jpg?alt=media&token=0ec9a71a-c82b-451f-a604-dedd8b932e6e", // URL gambar untuk Open Graph
        alt: "Bekaspakai Marketplace Barang Bekas di Indonesia",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: "index, follow",
  canonical: "https://www.bekaspakai.com",
  keywords: "barang bekas layak pakai, donasi barang beakas, jual beli barang bekas, marketplace barang bekas, preloved Indonesia, beli murah online, marketplace terpercaya, barang bekas berkualitas, transaksi aman online, toko online preloved, secondhand marketplace, barang preloved murah, jual beli aman, barang preloved premium, marketplace Indonesia, jual barang bekas online, preloved fashion, elektronik bekas murah, furniture secondhand, gadget bekas terpercaya, marketplace murah Indonesia",
  author: "Kazuya Team, Zaky Irsyad Rais, M. Daffa Raihan, dan Bryan Firmansyah",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id, in" suppressHydrationWarning>
      <body
        className={`${bekaspakaiFont.className} antialiased mx-3 lg:mx-10 lg:my-5 xl:mx-48 2xl:mx-64`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className=" space-y-5 lg:space-y-10 mb-10">
            <Navbar />
            <Searchbar />
          </section>
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
      <Script type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.CLIENT_KEY_MIDTRANS} />
    </html >
  );
}
