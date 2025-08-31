// Importación de React.
import * as React from "react";

// Define el punto de quiebre (breakpoint) para considerar un dispositivo como móvil.
const MOBILE_BREAKPOINT = 768; // En píxeles.

/**
 * Hook personalizado `useIsMobile` para detectar si el dispositivo actual es móvil.
 * Utiliza `window.matchMedia` y el ancho de la ventana para determinarlo.
 * @returns {boolean} `true` si el dispositivo es móvil, `false` en caso contrario.
 */
export function useIsMobile() {
  // Estado para almacenar si el dispositivo es móvil. Se inicializa como `undefined`
  // para evitar un parpadeo inicial antes de que se determine el tamaño de la ventana.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  // Efecto que se ejecuta una vez al montar el componente para configurar el listener de cambio de tamaño.
  React.useEffect(() => {
    // Crea un objeto MediaQueryList para escuchar cambios en el ancho de la ventana.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Función que se ejecuta cuando cambia el estado de la media query.
    const onChange = () => {
      // Actualiza el estado `isMobile` basándose en el ancho actual de la ventana.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Agrega el listener para el evento 'change' de la media query.
    mql.addEventListener("change", onChange);
    // Establece el estado inicial de `isMobile` al cargar el componente.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Función de limpieza que se ejecuta al desmontar el componente para remover el listener.
    return () => mql.removeEventListener("change", onChange);
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar.

  // Devuelve el estado `isMobile`, asegurándose de que siempre sea un booleano.
  return !!isMobile;
}