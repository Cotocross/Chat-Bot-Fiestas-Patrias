# Chatbot Fiestas Patrias Chilenas 🇨🇱

[![Deploy with Vercel](https://vercel.com/button)](https://chat-bot-fiestas-patrias.vercel.app/)

Un chatbot interactivo y de doble personalidad que utiliza la potencia de la **Inteligencia Artificial (Google Gemini)** para celebrar las Fiestas Patrias de Chile. El usuario puede cambiar entre un asistente experto en las tradiciones chilenas y un personaje cómico que ofrece "anti-consejos" con jerga local.

**[Visita la demo en vivo aquí](https://chat-bot-fiestas-patrias.vercel.app/)**

---

![Captura de pantalla del proyecto](https://i.imgur.com/URL_DE_TU_IMAGEN.png)
*   **Instrucción:** Reemplaza la URL de arriba con una captura de pantalla de tu aplicación. Puedes subir una imagen a [Imgur](https://imgur.com/upload) y pegar el enlace directo.

## 📂 Estructura del Proyecto

El proyecto está organizado siguiendo las convenciones de Next.js 14 (App Router), separando la lógica de la interfaz de usuario, los componentes y los servicios de la API.

```text
chatbot-fiestas-patrias/
├── app/
│   ├── api/chat/route.ts  # Endpoint de la API para el chat
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal (UI del chat)
│   └── globals.css        # Estilos globales
├── components/
│   └── ui/                # Componentes de shadcn/ui
├── lib/
│   └── utils.ts           # Funciones de utilidad
├── public/
│   └── ...                # Archivos estáticos (imágenes, etc.)
├── next.config.mjs        # Configuración de Next.js
└── package.json           # Dependencias y scripts
```

## 🌟 Características

*   **Interfaz de Chat Moderna:** Una interfaz de usuario limpia y responsiva construida con shadcn/ui y Tailwind CSS.
*   **Doble Personalidad:**
    *   **Modo Experto:** Un asistente amable y conocedor de las Fiestas Patrias, la comida típica y las tradiciones.
    *   **Modo "Flaite":** Un personaje humorístico que habla con jerga chilena y da consejos absurdos.
*   **Integración con IA Generativa:** Conectado a la API de **Google Gemini (1.5 Flash)** para generar respuestas dinámicas y coherentes según la personalidad seleccionada.
*   **Cambio de Modo Instantáneo:** El usuario puede alternar entre las personalidades en cualquier momento de la conversación.

## 🛠️ Tecnologías Utilizadas

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E44AD?style=for-the-badge&logo=google-gemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

*   **Framework:** Next.js 14 (con App Router)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **Componentes UI:** shadcn/ui
*   **IA:** Google Gemini API
*   **Despliegue:** Vercel

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu propia máquina.

#### Prerrequisitos

*   Node.js (v18 o superior)
*   pnpm (puedes instalarlo con `npm install -g pnpm`)

#### Pasos

1.  **Clona el repositorio:**
    *   **Instrucción:** Reemplaza `tu-usuario` con tu nombre de usuario de GitHub.
    ```bash
    git clone https://github.com/Cotocross/Chat-Bot-Fiestas-Patrias.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd chatbot-fiestas-patrias
    ```

3.  **Instala las dependencias:**
    ```bash
    pnpm install
    ```

4.  **Configura las variables de entorno:**
    *   Crea una copia del archivo `.env.example` (si existiera) o crea un nuevo archivo llamado `.env.local` en la raíz del proyecto.
    *   Añade tu clave de API de Google Gemini:
    ```
    GEMINI_KEY="aqui_va_tu_api_key"
    ```

5.  **Ejecuta el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.

## 🌐 Despliegue

Este proyecto está desplegado en **Vercel**. El proceso es automático: cada vez que se hace un `push` a la rama `main` en GitHub, Vercel inicia un nuevo despliegue.

Las claves de API y otros secretos se gestionan de forma segura a través de las **Environment Variables** del proyecto en el dashboard de Vercel, asegurando que no queden expuestas en el código fuente.

## 👨‍💻 Autor

Creado por **[Alejandro Javier Contreras Olate]**

*   **Instrucción:** Reemplaza `[Tu Nombre]` y `tu-usuario` con tu información.
*   **GitHub:** [`@Cotocross`](https://github.com/Cotocross)
*   **LinkedIn:** [`@Alejandro Contreras Olate`](www.linkedin.com/in/alejandro-contreras-olate-131b562b9) 
