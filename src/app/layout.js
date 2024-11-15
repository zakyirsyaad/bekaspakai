import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bekaspakai Indonesia",
  description: 'Bekaspakai - Marketplace terpercaya di Indonesia untuk jual beli barang bekas berkualitas. Temukan berbagai barang preloved dengan harga terbaik dan mulai transaksi aman dan mudah hanya di Bekaspakai.',
  openGraph: {
    title: "Bekaspakai Indonesia",
    description: 'Bekaspakai - Marketplace terpercaya di Indonesia untuk jual beli barang bekas berkualitas. Temukan berbagai barang preloved dengan harga terbaik dan mulai transaksi aman dan mudah hanya di Bekaspakai.',
    url: "https://www.bekaspakai.com", // URL utama
    type: "website", // Jenis konten (website/blog/article)
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/logo%20baru%20bg%20transparant%20v.2.png?alt=media&token=6eedb3f1-73b8-4516-872e-6efdf244708d", // URL gambar untuk Open Graph
        width: 4000, // Resolusi gambar
        height: 1000,
        alt: "Bekaspakai - Marketplace Barang Bekas di Indonesia",
      },
    ],
  },
  robots: "index, follow", // Instruksi untuk mesin pencari
  canonical: "https://www.bekaspakai.com", // URL kanonis untuk halaman
  keywords: "jual beli barang bekas, marketplace barang bekas, preloved Indonesia, beli murah online, marketplace terpercaya, barang bekas berkualitas, transaksi aman online, toko online preloved, secondhand marketplace, barang preloved murah, jual beli aman, barang preloved premium, marketplace Indonesia, jual barang bekas online, preloved fashion, elektronik bekas murah, furniture secondhand, gadget bekas terpercaya, marketplace murah Indonesia",
  author: "Bekaspakai Team", // Penulis konten,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#ffffff", // Ganti dengan warna tema Anda
};


export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased mt-5 mx-5 md:mx-20 lg:mx-40 2xl:mx-80 scroll-smooth`}
      >
        <div>
          {children}
        </div>
        <Toaster />
      </body>
    </html >
  );
}
