// Indica que este componente se ejecuta en el lado del cliente.
"use client";

// Inspirado en la librería react-hot-toast.
import * as React from "react";

// Importa tipos de componentes de UI para las notificaciones (toasts).
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

// Límite de toasts que se pueden mostrar simultáneamente.
const TOAST_LIMIT = 1;
// Retraso antes de que un toast sea removido (en milisegundos).
// Un valor muy alto (1,000,000 ms) sugiere que los toasts se cierran manualmente o por interacción.
const TOAST_REMOVE_DELAY = 1000000;

// Tipo para un toast que se gestiona internamente.
type ToasterToast = ToastProps & {
  id: string; // ID único para el toast.
  title?: React.ReactNode; // Título opcional del toast.
  description?: React.ReactNode; // Descripción opcional del toast.
  action?: ToastActionElement; // Elemento de acción opcional (ej. un botón).
};

// Tipos de acciones para el reducer.
const actionTypes = {
  ADD_TOAST: "ADD_TOAST", // Añadir un nuevo toast.
  UPDATE_TOAST: "UPDATE_TOAST", // Actualizar un toast existente.
  DISMISS_TOAST: "DISMISS_TOAST", // Descartar un toast (lo marca para cerrar).
  REMOVE_TOAST: "REMOVE_TOAST", // Remover un toast de la lista.
} as const;

// Contador para generar IDs únicos para los toasts.
let count = 0;

/**
 * Genera un ID único para cada toast.
 * @returns {string} El ID generado.
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Tipo para las acciones del reducer.
type ActionType = typeof actionTypes;

// Definición de los tipos de acciones que el reducer puede manejar.
type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

// Interfaz para el estado global de los toasts.
interface State {
  toasts: ToasterToast[];
}

// Mapa para almacenar los timeouts de remoción de los toasts.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Añade un toast a la cola de remoción con un retardo.
 * @param {string} toastId - El ID del toast a remover.
 */
const addToRemoveQueue = (toastId: string) => {
  // Si ya hay un timeout para este toast, no hace nada.
  if (toastTimeouts.has(toastId)) {
    return;
  }

  // Configura un timeout para remover el toast después de un retardo.
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId); // Elimina el timeout del mapa.
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout); // Almacena el timeout en el mapa.
};

/**
 * Reducer para gestionar el estado de los toasts.
 * @param {State} state - El estado actual de los toasts.
 * @param {Action} action - La acción a realizar.
 * @returns {State} El nuevo estado de los toasts.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Añade un nuevo toast al principio de la lista, respetando el límite.
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      // Actualiza las propiedades de un toast existente.
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Si se especifica un toastId, lo añade a la cola de remoción.
      // Si no se especifica, añade todos los toasts actuales a la cola de remoción.
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Marca el toast (o todos los toasts) como cerrados (open: false).
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      // Remueve un toast de la lista por su ID.
      // Si no se especifica toastId, vacía la lista de toasts.
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// Array de listeners que se notificarán cuando el estado de los toasts cambie.
const listeners: Array<(state: State) => void> = [];

// Estado en memoria de los toasts, fuera del contexto de React para que sea global.
let memoryState: State = { toasts: [] };

/**
 * Despacha una acción al reducer y notifica a todos los listeners.
 * @param {Action} action - La acción a despachar.
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action); // Actualiza el estado.
  listeners.forEach((listener) => {
    listener(memoryState); // Notifica a los listeners.
  });
}

// Tipo para la función `toast` (sin el ID, ya que se genera internamente).
type Toast = Omit<ToasterToast, "id">;

/**
 * Función para mostrar un nuevo toast.
 * @param {Toast} props - Las propiedades del toast (título, descripción, etc.).
 * @returns {{ id: string; dismiss: () => void; update: (props: ToasterToast) => void; }} Objeto con el ID del toast y funciones para controlarlo.
 */
function toast({ ...props }: Toast) {
  const id = genId(); // Genera un ID único para el nuevo toast.

  // Función para actualizar el toast.
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  // Función para descartar el toast.
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Despacha la acción para añadir el toast.
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true, // El toast está abierto por defecto.
      onOpenChange: (open) => {
        // Si el toast se cierra (open es false), lo descarta.
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * Hook personalizado `useToast` para acceder al estado de los toasts y a la función `toast`.
 * @returns {State & { toast: typeof toast; dismiss: (toastId?: string) => void; }} El estado actual de los toasts y funciones para gestionarlos.
 */
function useToast() {
  // Estado local del componente que se sincroniza con el estado global en memoria.
  const [state, setState] = React.useState<State>(memoryState);

  // Efecto para suscribir el componente a los cambios del estado global de toasts.
  React.useEffect(() => {
    listeners.push(setState); // Añade el setState del componente a la lista de listeners.
    return () => {
      // Función de limpieza: remueve el setState del componente de la lista de listeners.
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]); // Dependencia en `state` para re-suscribirse si el estado cambia (aunque `setState` es estable).

  // Devuelve el estado actual de los toasts y las funciones para añadir/descartar toasts.
  return {
    ...state,
    toast, // La función global para añadir toasts.
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Función para descartar toasts.
  };
}

// Exporta el hook `useToast` y la función `toast` para su uso en otros componentes.
export { useToast, toast };