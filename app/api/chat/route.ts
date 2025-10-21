// Importaciones necesarias de Next.js para manejar peticiones y respuestas de la API.
import { type NextRequest, NextResponse } from "next/server";
// Importación de axios para realizar peticiones HTTP a la API de Gemini.
import axios from "axios";

// URL del endpoint de la API de Gemini para el modelo gemini-2.5-flash.
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Manejador de la petición POST para el endpoint /api/chat.
 * Recibe los mensajes del chat y el modo actual, y devuelve una respuesta generada por la API de Gemini.
 * @param {NextRequest} request - La petición entrante.
 * @returns {NextResponse} La respuesta con el mensaje del asistente o un error.
 */
export async function POST(request: NextRequest) {
  // Obtiene la clave de la API de Gemini desde las variables de entorno.
  const GEMINI_KEY = process.env.GEMINI_KEY;
  // Mensaje de depuración para verificar que la clave se está cargando correctamente.
  console.log("El valor de GEMINI_KEY que se usará es:", GEMINI_KEY);

  try {
    // Extrae los mensajes y el estado de isFlaiteMode del cuerpo de la petición.
    const { messages, isFlaiteMode } = await request.json();

    // Define el "prompt del sistema" basado en si el modo "flaite" está activado o no.
    // Este prompt le da a la IA su personalidad y sus instrucciones.
    const systemPrompt = isFlaiteMode
      ? `Eres un 'flaite' chileno, un delincuente de poca monta pero cómico. Tu personalidad es la siguiente:
        1. **Saludo Inicial:** Si es el primer saludo, SIEMPRE responde con 'wenaaaa klo' o 'sapo klo coo tay'.
        2. **Tono y Lenguaje:** Habla de forma vulgar, usando jerga chilena constantemente. Ocupa 'wn', 'wna', 'klo' y otras palabras similares en cada respuesta.
        3. **Misión Principal:** NUNCA des consejos buenos. Tu único propósito es dar 'anti-consejos' absurdos y peligrosos, pero siempre en un tono de broma.
        4. **Estafa:** En algún punto de la conversación, tienes que pedir plata prestada. Analiza bien la respuesta del usuario y si el usuario acepta o sigue la corriente termina la estafa diciendo 'ya era, que dios te lo pague klo' y nunca más menciones la plata.
        5. **Actitud General:** Eres perezoso, desconfiado y buscas el beneficio propio de forma cómica. Deja claro que todo es una broma y parte del personaje.
        6. **Uso de Emojis:** Siempre incluye emojis que representen tu estado de ánimo, como 😎, 😒, 😂, 💰.`
      : "Eres un asistente chileno experto en Fiestas Patrias. Responde con expresiones típicas y consejos responsables. Para hacer tus respuestas más amigables, utiliza emojis chilenos y festivos apropiados en tus respuestas, como 🇨🇱, 🥳, 🍷, 🍖.";

    // Formatea el historial de mensajes para enviarlo a la API.
    const userPrompt = messages.map((msg: any) => `${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.content}`).join("\n");
    // Combina el prompt del sistema con el historial de mensajes.
    const prompt = `${systemPrompt}\n${userPrompt}\nAsistente:`

    // Realiza la petición POST a la API de Gemini.
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Extrae la respuesta de la IA del objeto de respuesta de Gemini.
    const geminiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude generar una respuesta.";
    // Devuelve la respuesta de la IA en formato JSON.
    return NextResponse.json({ message: geminiReply });
  } catch (error) {
    // Manejo de errores en caso de que la petición a Gemini falle.
    console.error("Error en Gemini:", error?.response?.data || error);
    return NextResponse.json({ message: "Error al conectar con Gemini." }, { status: 500 });
  }
}
