import React, {
   ReactElement,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';

type ToastContextType = {
   success: (message: string) => void;
   danger: (message: string) => void;
   info: (message: string) => void;
   warning: (message: string) => void;
};
const ToastContext = React.createContext<ToastContextType | null>(null);

type ToastType = 'success' | 'danger' | 'info' | 'warning';
type ToastModel = {
   id: string;
   message: string;
   type: ToastType;
};

const ToastColor = {
   success: '#198754',
   danger: '#dc3545',
   info: '#0d6efd',
   warning: '#fd7e14',
};

export default function ToastProvider({
   children,
}: {
   children: ReactElement;
}) {
   const [list, setList] = useState([] as Array<ToastModel>);

   const addToast = useCallback(
      (message: string, type: ToastType) => {
         setList([...list, { id: uuidv4(), message, type }]);
      },
      [list, setList]
   );

   const success = useCallback(
      (message: string) => {
         addToast(message, 'success');
      },
      [addToast]
   );

   const danger = useCallback(
      (message: string) => {
         addToast(message, 'danger');
      },
      [addToast]
   );

   const info = useCallback(
      (message: string) => {
         addToast(message, 'info');
      },
      [addToast]
   );

   const warning = useCallback(
      (message: string) => {
         addToast(message, 'warning');
      },
      [addToast]
   );

   const deleteToast = useCallback(
      (id: string) => {
         setList(list.filter(item => item.id !== id));
      },
      [list, setList]
   );

   useEffect(() => {
      const interval = setInterval(() => {
         if (list.length > 0) {
            deleteToast(list[0].id);
         }
      }, 3000);

      return () => {
         clearInterval(interval);
      };
   }, [list, deleteToast]);

   const providerValue = useMemo(
      () => ({ success, danger, info, warning }),
      [success, danger, info, warning]
   );
   return (
      <ToastContext.Provider value={providerValue}>
         {children}
         <div className="container bottom-right">
            {list.map(toast => (
               <div
                  key={toast.id}
                  className="notification toast bottom-right"
                  style={{ backgroundColor: ToastColor[toast.type] }}
               >
                  <button onClick={() => deleteToast(toast.id)} type="button">
                     X
                  </button>
                  <div>
                     <p className="title">{toast.type}</p>
                     <p className="message">{toast.message}</p>
                  </div>
               </div>
            ))}
         </div>
      </ToastContext.Provider>
   );
}

export const useToast = () => useContext(ToastContext) as ToastContextType;
