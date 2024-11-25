import Hero from "./containers/Home/Hero";
import HomeMarque from "./containers/Home/HomeMarque";
import Kategori from "./containers/Home/Kategori";
import NewProduct from "./containers/Home/NewProduct";

export default function Home() {

  return (
    <main className="space-y-10">
      <Hero />
      <HomeMarque />
      <Kategori />
      <NewProduct />
    </main>
  );
}
