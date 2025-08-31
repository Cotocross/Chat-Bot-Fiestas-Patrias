// Importaciones necesarias de React y Next.js.
import type React from "react";
import type { Metadata } from "next";
// Importación de las fuentes Geist Sans y Mono para un estilo de tipografía moderno.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// Importación de los estilos globales de la aplicación.
import "./globals.css";

// Metadatos de la página, importantes para el SEO y la información que se muestra en el navegador.
export const metadata: Metadata = {
  title: "Chatbot Fiestas Patrias Chile 🇨🇱", // Título de la página.
  description: "Tu asistente virtual para celebrar las Fiestas Patrias de Chile con consejos y recomendaciones", // Descripción de la página.
  generator: "v0.app", // Indica la herramienta con la que se generó la aplicación.
};

/**
 * RootLayout es el componente de diseño principal que envuelve toda la aplicación.
 * @param {React.ReactNode} children - Los componentes hijos que serán renderizados dentro de este diseño.
 * @returns {JSX.Element} El elemento JSX que representa el diseño raíz de la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Define el idioma principal de la página como español.
    <html lang="es">
      <head>
        {/* 
          Inyecta estilos en el <head> para configurar las fuentes de la aplicación.
          Utiliza las variables de CSS para que las fuentes Geist Sans y Mono estén disponibles en toda la app.
        */}
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      {/* El cuerpo de la página donde se renderizarán los componentes hijos. */}
      <body>{children}</body>
    </html>
  );
}