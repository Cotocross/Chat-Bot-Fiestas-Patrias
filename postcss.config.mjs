/** @type {import('postcss-load-config').Config} */
// Configuración de PostCSS.
const config = {
  // Define los plugins de PostCSS a utilizar.
  plugins: {
    // Habilita el plugin de PostCSS para Tailwind CSS.
    // Esto permite que Tailwind CSS procese las directivas de CSS en los archivos de estilo.
    '@tailwindcss/postcss': {},
  },
};

// Exporta la configuración de PostCSS.
export default config;