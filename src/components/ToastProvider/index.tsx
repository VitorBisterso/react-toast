import React, {
   ReactElement,
   useCallback,
   useContext,
   useMemo,
   useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';
import Toast from './Toast';

type ToastContextType = {
   success: (message: string, timeout?: number) => void;
   danger: (message: string, timeout?: number) => void;
   info: (message: string, timeout?: number) => void;
   warning: (message: string, timeout?: number) => void;
};
const ToastContext = React.createContext<ToastContextType | null>(null);

type ToastType = 'success' | 'danger' | 'info' | 'warning';
type ToastModel = {
   id: string;
   message: string;
   timeout: number;
   type: ToastType;
};

const ToastColor = {
   success: '#198754',
   danger: '#dc3545',
   info: '#0d6efd',
   warning: '#fd7e14',
};

const DEFAULT_TIMEOUT = 3000;

export default function ToastProvider({
   children,
}: {
   children: ReactElement;
}) {
   const [list, setList] = useState([] as Array<ToastModel>);

   const addToast = useCallback(
      (message: string, timeout: number, type: ToastType) => {
         setList([...list, { id: uuidv4(), message, timeout, type }]);
      },
      [list, setList]
   );

   const success = useCallback(
      (message: string, timeout?: number) => {
         addToast(message, timeout || DEFAULT_TIMEOUT, 'success');
      },
      [addToast]
   );

   const danger = useCallback(
      (message: string, timeout?: number) => {
         addToast(message, timeout || DEFAULT_TIMEOUT, 'danger');
      },
      [addToast]
   );

   const info = useCallback(
      (message: string, timeout?: number) => {
         addToast(message, timeout || DEFAULT_TIMEOUT, 'info');
      },
      [addToast]
   );

   const warning = useCallback(
      (message: string, timeout?: number) => {
         addToast(message, timeout || DEFAULT_TIMEOUT, 'warning');
      },
      [addToast]
   );

   const deleteToast = useCallback(
      (id: string) => {
         setList(list.filter(item => item.id !== id));
      },
      [list, setList]
   );

   const providerValue = useMemo(
      () => ({ success, danger, info, warning }),
      [success, danger, info, warning]
   );
   return (
      <ToastContext.Provider value={providerValue}>
         {children}
         <div className="container bottom-right">
            {list.map(({ id, type, message, timeout }) => (
               <Toast
                  key={id}
                  color={ToastColor[type]}
                  onClick={() => deleteToast(id)}
                  title={type}
                  message={message}
                  timeout={timeout}
               />
            ))}
         </div>
      </ToastContext.Provider>
   );
}

export const useToast = () => useContext(ToastContext) as ToastContextType;
