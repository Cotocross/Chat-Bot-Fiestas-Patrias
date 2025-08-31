/** @type {import('next').NextConfig} */
// Configuración de Next.js.
const nextConfig = {
  // Configuración de ESLint.
  eslint: {
    // Ignora los errores de ESLint durante el proceso de construcción.
    // Esto puede ser útil en entornos de desarrollo o para proyectos que no requieren una validación estricta en el build.
    ignoreDuringBuilds: true,
  },
  // Configuración de TypeScript.
  typescript: {
    // Ignora los errores de TypeScript durante el proceso de construcción.
    // Similar a ESLint, puede ser útil para builds rápidos o cuando los errores de tipo no son críticos para el despliegue.
    ignoreBuildErrors: true,
  },
  // Configuración de optimización de imágenes.
  images: {
    // Deshabilita la optimización automática de imágenes de Next.js.
    // Esto significa que las imágenes se servirán tal cual, sin redimensionamiento ni optimización de formato.
    // Puede ser útil si ya se están optimizando las imágenes manualmente o si se usan servicios externos.
    unoptimized: true,
  },
};

// Exporta la configuración de Next.js.
export default nextConfig;