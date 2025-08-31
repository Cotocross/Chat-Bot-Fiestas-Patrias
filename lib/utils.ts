// Importación de las librerías clsx y tailwind-merge.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Función de utilidad para combinar y fusionar clases de CSS de forma condicional.
 * Es especialmente útil en componentes de React para manejar clases dinámicas.
 * `clsx` permite definir clases condicionalmente.
 * `twMerge` fusiona inteligentemente las clases de Tailwind CSS, evitando conflictos.
 * @param {...ClassValue[]} inputs - Una lista de clases de CSS para combinar.
 * @returns {string} Una cadena de texto con las clases de CSS finales.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}