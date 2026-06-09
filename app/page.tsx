import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Servicios from "@/components/sections/servicios";
import Proyectos from "@/components/sections/proyectos";
import Nosotros from "@/components/sections/nosotros";
import Herramientas from "@/components/sections/herramientas";
import Cotizador from "@/components/sections/cotizador";
import Contacto from "@/components/sections/contacto";
import FooterSection from "@/components/sections/footer-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Proyectos />
        <Nosotros />
        <Herramientas />
        <Cotizador />
        <Contacto />
      </main>
      <FooterSection />
    </>
  );
}
