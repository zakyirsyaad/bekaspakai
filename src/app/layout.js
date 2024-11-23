import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { ThemeProvider } from "@/components/theme-provider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bekaspakai - Marketplace Barang Bekas Berkualitas di Indonesia",
  description: "Bekaspakai adalah platform terpercaya untuk donasi dan jual beli barang bekas berkualitas di Indonesia. Dukung gaya hidup minimalis dengan mudah dan cepat.",
  openGraph: {
    title: "Bekaspakai - Marketplace Barang Bekas Berkualitas di Indonesia",
    description: "Bekaspakai adalah platform terpercaya untuk donasi dan jual beli barang bekas berkualitas di Indonesia. Dukung gaya hidup minimalis dengan mudah dan cepat.",
    url: "https://www.bekaspakai.com",
    type: "website", // Jenis konten (website/blog/article)
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/Bekaspakai-logo-_Logomark%20white.jpg?alt=media&token=0ec9a71a-c82b-451f-a604-dedd8b932e6e", // URL gambar untuk Open Graph
        alt: "Bekaspakai Marketplace Barang Bekas di Indonesia",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: "index, follow", // Instruksi untuk mesin pencari
  canonical: "https://www.bekaspakai.com", // URL kanonis untuk halaman
  keywords: "barang bekas layak pakai, donasi barang beakas, jual beli barang bekas, marketplace barang bekas, preloved Indonesia, beli murah online, marketplace terpercaya, barang bekas berkualitas, transaksi aman online, toko online preloved, secondhand marketplace, barang preloved murah, jual beli aman, barang preloved premium, marketplace Indonesia, jual barang bekas online, preloved fashion, elektronik bekas murah, furniture secondhand, gadget bekas terpercaya, marketplace murah Indonesia",
  author: "Kazuya Team, Zaky Irsyad Rais dan M. Daffa Raihan", // Penulis konten,
};



export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000", // Ganti dengan warna tema Anda
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body
        className={`${poppins.className} antialiased mt-5 mx-5 md:mx-20 lg:mx-40 2xl:mx-80 scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html >
  );
}
