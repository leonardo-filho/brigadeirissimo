"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaStar, FaHeart } from "react-icons/fa";
import { menuData } from "@/data/menu";

// --- Assets SVG (Ondas e Formas) ---
const WaveDivider = ({ flip = false, color = "fill-cream-50" }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] ${color}`}>
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
    </svg>
  </div>
);

// --- Componentes Internos ---

const SprinklesBackground = () => {
  const [sprinkles, setSprinkles] = useState<{ id: number, delay: number, x: string, y: string, color: string, rotate: number }[]>([]);

  useEffect(() => {
    const newSprinkles = [...Array(15)].map((_, i) => ({
      id: i,
      delay: i * 2,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      color: ["bg-pink-400", "bg-yellow-400", "bg-blue-300", "bg-green-300"][i % 4],
      rotate: Math.random() * 360
    }));
    setSprinkles(newSprinkles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sprinkles.map((sprinkle) => (
        <FloatingSprinkle
          key={sprinkle.id}
          delay={sprinkle.delay}
          x={sprinkle.x}
          y={sprinkle.y}
          color={sprinkle.color}
          rotate={sprinkle.rotate}
        />
      ))}
    </div>
  );
};

const FloatingSprinkle = ({ delay, x, y, color, rotate }: { delay: number, x: string, y: string, color: string, rotate: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{
      opacity: [0, 0.8, 0],
      y: -100,
      rotate: rotate + 360
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay: delay,
      ease: "linear"
    }}
    className={`absolute w-3 h-8 rounded-full ${color} opacity-60 z-0`}
    style={{ left: x, top: y }}
  />
);

const PriceCard = ({ title, price }: { title: string; price: string }) => (
  <motion.div
    whileHover={{ scale: 1.02, rotate: -1 }}
    className="flex justify-between items-center border-b border-dashed border-cocoa-100/50 py-3 px-2 hover:bg-white/50 transition-colors rounded-lg cursor-default"
  >
    <span className="text-cocoa-800 font-medium text-lg font-handwritten">{title}</span>
    <span className="text-pink-600 font-bold text-xl font-handwritten">{price}</span>
  </motion.div>
);

const MenuSection = ({ data, imageSrc, imageAlt }: { data: typeof menuData.tradicionais, imageSrc: string, imageAlt: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex flex-col md:flex-row bg-white rounded-[2rem] shadow-xl overflow-hidden my-12 border-4 border-cocoa-100 transform hover:shadow-2xl transition-shadow duration-500 relative"
  >
    {/* Decorative Blob */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-[100px] -z-0 opacity-50"></div>

    {/* Lado da Imagem */}
    <div className="md:w-2/5 relative min-h-[350px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover hover:scale-110 transition duration-1000 rotate-2 hover:-rotate-2"
      />
    </div>

    {/* Lado do Conteúdo */}
    <div className="p-8 md:w-3/5 z-10">
      <h3 className="text-4xl font-bold text-cocoa-900 mb-6 font-handwritten text-center md:text-left transform -rotate-2">
        {data.title}
        <span className="block h-1 w-full bg-pink-300 rounded-full mt-2 opacity-50"></span>
      </h3>

      <div className="grid gap-8">
        <div>
          <h4 className="text-2xl font-bold mb-4 text-cocoa-800 flex items-center gap-2 font-handwritten">
            <FaStar className="text-yellow-400 animate-pulse" /> Sabores Disponíveis
          </h4>
          <div className="flex flex-wrap gap-3">
            {data.flavors.map((flavor, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1, rotate: 3, backgroundColor: "#fce7f3" }}
                className="bg-cocoa-50 text-cocoa-900 px-4 py-2 rounded-full text-base font-handwritten border border-cocoa-100 cursor-pointer shadow-sm"
              >
                {flavor}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-bold mb-4 text-cocoa-800 font-handwritten">Tabela de Valores</h4>
          <div className="space-y-2 bg-cream-100/50 p-6 rounded-2xl shadow-inner border border-white">
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
      {/* HERO SECTION (Topo) */}
      {/* HERO SECTION (Topo) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-cream-50 text-cocoa-900 overflow-hidden pt-20 pb-32">

        {/* Floating Sprinkles Background */}
        <SprinklesBackground />

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* Lado Esquerdo: Texto e CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 mb-4 border-2 border-pink-400 rounded-full bg-pink-50 text-pink-500 font-bold tracking-wider text-sm uppercase rotate-[-2deg]"
            >
              O melhor de Belém
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-handwritten text-cocoa-900 leading-[0.9] drop-shadow-sm">
              Brigadeiríssimo
            </h1>

            <p className="text-2xl md:text-3xl text-cocoa-800 font-handwritten font-light mb-8 max-w-lg mx-auto md:mx-0 leading-tight">
              <span className="text-pink-500 font-bold">♥</span> Feito à mão, com ingredientes selecionados e muito amor. <span className="text-pink-500 font-bold">♥</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#menu"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_4px_0_rgb(190,24,93)] hover:shadow-[0_2px_0_rgb(190,24,93)] transition-all font-handwritten flex items-center justify-center gap-2"
              >
                Ver Cardápio <FaHeart className="text-pink-200 text-sm" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={whatsappLink}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_4px_0_rgb(21,128,61)] hover:shadow-[0_2px_0_rgb(21,128,61)] transition-all flex items-center justify-center gap-2 font-handwritten"
              >
                <FaWhatsapp size={24} /> Encomendar
              </motion.a>
            </div>
          </motion.div>

          {/* Lado Direito: Imagem Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative order-1 md:order-2 flex justify-center"
          >
            {/* Blob Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

            <div className="relative w-72 h-72 md:w-96 md:h-96 z-10">
              <Image
                src="/images/logo.png"
                alt="Logo Brigadeiríssimo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

        </div>

        <div className="absolute bottom-0 w-full z-20">
          <WaveDivider color="fill-white" />
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-cocoa-900 mb-4 font-handwritten drop-shadow-sm rotate-1">
            Nossas Caixas
          </h2>
          <p className="text-2xl text-cocoa-800 max-w-2xl mx-auto font-handwritten">
            minhas especialidades feitas com carinho
          </p>
          <div className="h-4 w-48 bg-pink-400/50 mx-auto rounded-full mt-6 blur-[1px]"></div>
        </motion.div>

        {/* Cardápio Tradicional */}
        <MenuSection
          data={menuData.tradicionais}
          imageSrc="/images/doce2.jpeg" // <--- FOTO 2 (JPEG)
          imageAlt="Caixa mista de brigadeiros tradicionais"
        />

        {/* Cardápio Especial (Layout Invertido) */}
        {/* Cardápio Especial (Layout Invertido) */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row-reverse bg-white rounded-[2rem] shadow-xl overflow-hidden my-24 border-4 border-cocoa-100 transform hover:shadow-2xl transition-shadow duration-500 relative"
        >
          {/* Decorative Blob */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-100 rounded-tr-[100px] -z-0 opacity-50"></div>

          {/* Lado da Imagem */}
          <div className="md:w-2/5 relative min-h-[350px] overflow-hidden">
            <Image
              src="/images/doce3.jpeg" // <--- FOTO 3 (JPEG)
              alt="Caixa mista de brigadeiros especiais"
              fill
              className="object-cover hover:scale-110 transition duration-1000 -rotate-2 hover:rotate-2"
            />
          </div>

          {/* Lado do Conteúdo */}
          <div className="p-8 md:w-3/5 z-10">
            <h3 className="text-4xl font-bold text-cocoa-900 mb-6 font-handwritten text-right transform rotate-1">
              {menuData.especiais.title}
              <span className="block h-1 w-full bg-yellow-300 rounded-full mt-2 opacity-50"></span>
            </h3>

            <div className="grid gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4 text-cocoa-800 flex items-center gap-2 justify-end font-handwritten">
                  Sabores Disponíveis <FaStar className="text-yellow-400 animate-pulse" />
                </h4>
                <div className="flex flex-wrap gap-3 justify-end">
                  {menuData.especiais.flavors.map((flavor, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.1, rotate: -3, backgroundColor: "#fef3c7" }}
                      className="bg-pink-50 text-pink-900 px-4 py-2 rounded-full text-base font-handwritten border border-pink-100 cursor-pointer shadow-sm"
                    >
                      {flavor}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4 text-cocoa-800 text-right font-handwritten">Tabela de Valores</h4>
                <div className="space-y-2 bg-pink-50/50 p-6 rounded-2xl shadow-inner border border-white">
                  {menuData.especiais.prices.map((item, index) => (
                    <PriceCard key={index} title={item.item} price={item.price} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* INFO BOX (Fundo com textura da imagem 1) */}
        {/* INFO BOX (Fundo com textura da imagem 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="bg-cocoa-900 text-white p-10 md:p-20 rounded-[3rem] text-center mt-32 shadow-2xl mx-auto max-w-5xl relative overflow-hidden group border-8 border-white/10"
        >
          {/* Imagem de fundo sutil */}
          <div className="absolute inset-0 bg-[url('/images/doce1.jpeg')] opacity-10 bg-cover bg-center mix-blend-overlay transition duration-1000 group-hover:scale-110"></div>

          <div className="relative z-10">
            <h3 className="text-5xl font-bold mb-12 font-handwritten border-b-2 border-dashed border-white/20 pb-4 inline-block transform -rotate-2">
              Informações Importantes <FaHeart className="inline text-pink-500 ml-2 animate-bounce" />
            </h3>
            <ul className="grid md:grid-cols-2 gap-6 text-left text-xl font-handwritten">
              {menuData.info.map((info, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition shadow-lg cursor-default"
                >
                  <span className="text-pink-400 text-3xl mt-0">•</span>
                  <span className="leading-relaxed">{info}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cocoa-950 text-cocoa-200 py-16 text-center relative mt-20">
        <div className="absolute top-0 w-full -translate-y-[99%]">
          <WaveDivider flip color="fill-cocoa-950" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">

          <div className="flex justify-center gap-8 mb-10">
            <motion.a
              whileHover={{ y: -10, rotate: 10 }}
              href="https://instagram.com/brigadeiriss1mo" target="_blank" className="p-4 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 text-white rounded-full shadow-lg"
            >
              <FaInstagram size={32} />
            </motion.a>
            <motion.a
              whileHover={{ y: -10, rotate: -10 }}
              href={whatsappLink} target="_blank" className="p-4 bg-green-500 text-white rounded-full shadow-lg"
            >
              <FaWhatsapp size={32} />
            </motion.a>
          </div>

          <p className="text-5xl font-handwritten mb-4 font-bold text-cream-50">Brigadeiríssimo</p>
          <p className="opacity-80 text-2xl font-light font-handwritten">Belém, PA • (91) 99234-2017</p>
          <p className="text-base mt-12 opacity-40 border-t border-white/10 pt-8 w-full font-sans">© 2026 Brigadeiríssimo. Feito com amor.</p>
        </div>
      </footer>
    </main>
  );
}