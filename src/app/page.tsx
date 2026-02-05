"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaStar } from "react-icons/fa";
import { menuData } from "@/data/menu";

// --- Componentes Internos ---

const PriceCard = ({ title, price }: { title: string; price: string }) => (
  <div className="flex justify-between items-center border-b border-cocoa-100/30 py-2">
    <span className="text-cocoa-800 font-medium">{title}</span>
    <span className="text-pink-500 font-bold">{price}</span>
  </div>
);

const MenuSection = ({ data, imageSrc, imageAlt }: { data: typeof menuData.tradicionais, imageSrc: string, imageAlt: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden my-12 border border-cocoa-100"
  >
    {/* Lado da Imagem */}
    <div className="md:w-2/5 relative min-h-[350px]">
       <Image 
         src={imageSrc}
         alt={imageAlt}
         fill
         className="object-cover hover:scale-105 transition duration-700"
       />
    </div>

    {/* Lado do Conteúdo */}
    <div className="p-8 md:w-3/5">
      <h3 className="text-3xl font-bold text-cocoa-900 mb-6 border-l-4 border-pink-500 pl-4">
        {data.title}
      </h3>

      <div className="grid gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 text-cocoa-800 flex items-center gap-2">
            <FaStar className="text-yellow-500" /> Sabores Disponíveis
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.flavors.map((flavor, index) => (
              <span key={index} className="bg-cocoa-100 text-cocoa-900 px-3 py-1 rounded-full text-sm">
                {flavor}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-4 text-cocoa-800">Tabela de Valores</h4>
          <div className="space-y-2 bg-cream-50 p-4 rounded-xl shadow-inner">
            {data.prices.map((item, index) => (
              <PriceCard key={index} title={item.item} price={item.price} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Componente Principal ---

export default function Home() {
  // Configuração do Link do WhatsApp
  const phoneNumber = "5591992342017";
  const message = "Olá! gostaria de fazer um pedido de doces do brigadeirissimo";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      
      {/* HERO SECTION (Topo) */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center bg-gradient-to-b from-cocoa-900 to-cocoa-800 text-white text-center px-4 overflow-hidden">
        
        {/* Fundo: Imagem de Caixa Mista desfocada */}
        <div className="absolute inset-0 opacity-25">
            <Image 
              src="/images/doce1.jpeg" // <--- FOTO 1 (JPEG)
              alt="Fundo de brigadeiros gourmet"
              fill
              className="object-cover blur-sm scale-110"
              priority
            />
        </div>
        <div className="absolute inset-0 bg-cocoa-950/60 mix-blend-multiply"></div> 

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col items-center"
        >
          {/* LOGO */}
          <div className="relative w-52 h-52 md:w-72 md:h-72 mb-8 drop-shadow-2xl">
            <Image 
              src="/images/logo.png" // <--- LOGO
              alt="Logo Brigadeiríssimo"
              fill
              className="object-contain filter drop-shadow-lg"
              priority
            />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-4 font-serif tracking-tight text-cream-50 drop-shadow-lg">
            Brigadeiríssimo
          </h1>
          <p className="text-xl md:text-2xl text-cocoa-100 max-w-2xl mx-auto font-light drop-shadow-md">
            O doce sabor da felicidade em cada caixinha.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 flex flex-col md:flex-row gap-5 z-10"
        >
          <a href="#menu" className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold transition shadow-xl transform hover:scale-105 border-2 border-pink-400">
            Ver Cardápio
          </a>
          <a 
            href={whatsappLink} // <--- Link atualizado aqui
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold transition shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 border-2 border-green-400"
          >
            <FaWhatsapp size={24} /> Encomendar
          </a>
        </motion.div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cream-50 to-transparent"></div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-cocoa-900 mb-4 font-serif">
            Nossas Caixas
          </h2>
          <p className="text-xl text-cocoa-800 max-w-2xl mx-auto">
            Escolha sua combinação perfeita de sabores artesanais.
          </p>
          <div className="h-2 w-32 bg-pink-500 mx-auto rounded-full mt-6"></div>
        </motion.div>
        
        {/* Cardápio Tradicional */}
        <MenuSection 
            data={menuData.tradicionais} 
            imageSrc="/images/doce2.jpeg" // <--- FOTO 2 (JPEG)
            imageAlt="Caixa mista de brigadeiros tradicionais"
        />

        {/* Cardápio Especial (Layout Invertido) */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row-reverse bg-white rounded-3xl shadow-xl overflow-hidden my-16 border border-cocoa-100"
          >
            {/* Lado da Imagem */}
            <div className="md:w-2/5 relative min-h-[350px]">
              <Image 
                src="/images/doce3.jpeg" // <--- FOTO 3 (JPEG)
                alt="Caixa mista de brigadeiros especiais"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* Lado do Conteúdo */}
            <div className="p-8 md:w-3/5">
              <h3 className="text-3xl font-bold text-cocoa-900 mb-6 border-r-4 border-pink-500 pr-4 text-right">
                {menuData.especiais.title}
              </h3>
               
               <div className="grid gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-cocoa-800 flex items-center gap-2 justify-end">
                    Sabores Disponíveis <FaStar className="text-yellow-500" />
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {menuData.especiais.flavors.map((flavor, index) => (
                      <span key={index} className="bg-pink-100 text-pink-900 px-3 py-1 rounded-full text-sm">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-cocoa-800 text-right">Tabela de Valores</h4>
                  <div className="space-y-2 bg-pink-50 p-4 rounded-xl shadow-inner">
                    {menuData.especiais.prices.map((item, index) => (
                      <PriceCard key={index} title={item.item} price={item.price} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </motion.div>

        {/* INFO BOX (Fundo com textura da imagem 1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-cocoa-900 text-white p-10 md:p-20 rounded-[3rem] text-center mt-32 shadow-2xl mx-auto max-w-5xl relative overflow-hidden group"
        >
           {/* Imagem de fundo sutil */}
           <div className="absolute inset-0 bg-[url('/images/doce1.jpeg')] opacity-10 bg-cover bg-center mix-blend-overlay transition duration-1000 group-hover:scale-110"></div>
           
           <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-12 font-serif border-b border-white/20 pb-4 inline-block">
              Informações Importantes
            </h3>
            <ul className="grid md:grid-cols-2 gap-6 text-left text-lg">
              {menuData.info.map((info, idx) => (
                <li key={idx} className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition shadow-lg">
                  <span className="text-pink-500 text-2xl mt-1">•</span> 
                  <span className="leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cocoa-950 text-cocoa-200 py-16 text-center border-t-4 border-pink-900 relative">
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
          
          <div className="flex justify-center gap-8 mb-10">
            <a href="https://instagram.com/brigadeiriss1mo" target="_blank" className="p-4 bg-cocoa-900 rounded-full hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 text-white transition duration-300 transform hover:-translate-y-2 shadow-lg">
              <FaInstagram size={32} />
            </a>
            <a href={whatsappLink} target="_blank" className="p-4 bg-cocoa-900 rounded-full hover:bg-green-500 text-white transition duration-300 transform hover:-translate-y-2 shadow-lg">
              <FaWhatsapp size={32} />
            </a>
          </div>

          <p className="text-4xl font-serif mb-4 font-bold text-cream-50">Brigadeiríssimo</p>
          <p className="opacity-80 text-xl font-light">Belém, PA • (91) 99234-2017</p>
          <p className="text-sm mt-12 opacity-40 border-t border-white/10 pt-8 w-full">© 2026 Brigadeiríssimo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}