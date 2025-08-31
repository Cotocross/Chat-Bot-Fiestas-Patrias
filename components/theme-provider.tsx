// Indica que este componente se ejecuta en el lado del cliente.
'use client'

// Importaciones necesarias de React y de la librería next-themes.
import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Componente proveedor de tema que envuelve la aplicación para habilitar el cambio de temas (claro/oscuro).
 * Utiliza la librería `next-themes` para manejar la lógica del cambio de tema.
 * @param {ThemeProviderProps} props - Las propiedades para el proveedor de tema, incluyendo los `children`.
 * @returns {JSX.Element} El elemento JSX que provee el contexto del tema a sus hijos.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Renderiza el proveedor de temas de next-themes, pasando todas las propiedades y los hijos.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}