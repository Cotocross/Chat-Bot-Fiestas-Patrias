// Indica que este componente se ejecuta en el lado del cliente.
"use client";

// Importaciones de hooks de React para el manejo de estado y referencias.
import { useState, useRef, useEffect } from "react";

// Definición de la interfaz para la estructura de un mensaje en el chat.
interface Message {
  role: "user" | "assistant"; // El rol puede ser 'user' o 'assistant'.
  content: string; // El contenido del mensaje.
}

/**
 * Componente principal del Chatbot de Fiestas Patrias.
 * Maneja la lógica del chat, el estado de los mensajes y la interacción con la API.
 * @returns {JSX.Element} El elemento JSX que representa la interfaz del chatbot.
 */
export default function FiestasPatriasBot() {
  // Estado para almacenar la lista de mensajes del chat.
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola, compadre! Soy tu asistente para las Fiestas Patrias. ¿En qué te puedo ayudar para que celebres como corresponde?",
    },
  ]);
  // Estado para el valor del input del usuario.
  const [input, setInput] = useState("");
  // Estado para controlar si el chatbot está esperando una respuesta.
  const [isLoading, setIsLoading] = useState(false);
  // Estado para controlar si el "Modo Flaite" está activado.
  const [isFlaiteMode, setIsFlaiteMode] = useState(false);
  // Referencia al final de la lista de mensajes para hacer scroll automático.
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Función para hacer scroll suavemente hasta el último mensaje.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect que se ejecuta cada vez que la lista de mensajes cambia para hacer scroll.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Función asíncrona para enviar un mensaje a la API del chatbot.
   */
  const sendMessage = async () => {
    // Evita enviar mensajes vacíos.
    if (!input.trim()) return;

    // Crea el mensaje del usuario y lo agrega al estado de mensajes.
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Limpia el input.
    setIsLoading(true); // Activa el indicador de carga.

    try {
      // Petición a la API de chat.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          isFlaiteMode,
        }),
      });

      const data = await response.json();

      // Manejo de errores de la respuesta.
      if (!response.ok) {
        throw new Error(data.message || "Error en la respuesta del servidor");
      }

      // Agrega la respuesta del asistente al estado de mensajes.
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "¡Uy! Algo salió mal, compadre. Inténtalo de nuevo.";
      // Muestra un mensaje de error en el chat.
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false); // Desactiva el indicador de carga.
    }
  };

  /**
   * Función para cambiar entre el modo normal y el "Modo Flaite".
   */
  const toggleMode = () => {
    setIsFlaiteMode(!isFlaiteMode);
    const modeMessage: Message = {
      role: "assistant",
      content: isFlaiteMode
        ? "¡Volvimos al modo normal, compadre! Ahora te daré consejos responsables para las fiestas patrias."
        : "¡Modo flayte activadoooo, sapooo klooo! Ahora te voy a dar puros anti-consejos. ¡Invita su terremoto po wn no seai cagao!",
    };
    setMessages((prev) => [...prev, modeMessage]);
  };

  /**
   * Función para reiniciar el chat a su estado inicial.
   */
  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "¡Hola, compadre! Soy tu asistente para las Fiestas Patrias. ¿En qué te puedo ayudar para que celebres como corresponde?",
      },
    ]);
    setIsFlaiteMode(false);
  };

  // Renderizado del componente.
  return (
    // Contenedor principal con fondo de estilo de videojuego.
    <div className="game-screen-with-bg">
      
      {/* Ventana de diálogo principal del chat. */}
      <div className="game-dialog-window">
        <div className="dialog-frame">
          {/* Cabecera de la ventana de diálogo. */}
          <div className="dialog-header">
            <div className="header-title">CHATBOT FIESTAS PATRIAS</div>
          </div>

          {/* Área de contenido del chat donde se muestran los mensajes. */}
          <div className="dialog-content">
            <div className="messages-area">
              {/* Mapeo y renderizado de cada mensaje. */}
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  {message.content}
                </div>
              ))}
              {/* Muestra un mensaje de "Pensando..." mientras se carga la respuesta. */}
              {isLoading && <div className="message assistant loading">Pensando...</div>}
              {/* Elemento de referencia para el scroll automático. */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Botones de acción para controlar el modo y reiniciar el chat. */}
          <div className="dialog-buttons">
            <button
              className={`game-button ${!isFlaiteMode ? "active" : ""}`}
              onClick={() => !isFlaiteMode || toggleMode()}
            >
              <div className="button-text">MODO NORMAL</div>
            </button>

            <button
              className={`game-button ${isFlaiteMode ? "active" : ""}`}
              onClick={() => isFlaiteMode || toggleMode()}
            >
              <div className="button-text">MODO FLAYTE</div>
            </button>

            <button className="game-button" onClick={resetChat}>
              <div className="button-text">REINICIAR</div>
            </button>
          </div>

          {/* Área de input para que el usuario escriba su mensaje. */}
          <div className="dialog-input">
            <div className="input-label">ESCRIBE TU PREGUNTA:</div>
            <div className="input-row">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="game-input"
                placeholder="Pregúntame sobre las fiestas patrias..."
                disabled={isLoading}
              />
              <button className="send-button" onClick={sendMessage} disabled={isLoading || !input.trim()}>
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-cotocross pixel-footer-text">
        Creado con 💓 por Cotocross visita este y otros proyectos en mi <a href="https://github.com/Cotocross" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  );
}
