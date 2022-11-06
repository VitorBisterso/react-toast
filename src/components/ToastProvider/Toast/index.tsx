import React, { ReactElement, useEffect, useState } from 'react';

import '../styles.css';

function Expire({
   timeout,
   children,
}: {
   timeout: number;
   children: ReactElement;
}) {
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setVisible(false);
      }, timeout);
      return () => clearTimeout(timer);
   }, [timeout]);

   // eslint-disable-next-line react/jsx-no-useless-fragment
   return visible ? <>{children}</> : null;
}

type ToastProps = {
   color: string;
   onClick: () => void;
   title: string;
   message: string;
   timeout: number;
};

export default function Toast({
   color,
   onClick,
   title,
   message,
   timeout = 1000,
}: ToastProps) {
   return (
      <Expire timeout={timeout}>
         <div
            className="notification toast bottom-right"
            style={{ backgroundColor: color }}
         >
            <button onClick={onClick} type="button">
               X
            </button>
            <div>
               <p className="title">{title}</p>
               <p className="message">{message}</p>
            </div>
         </div>
      </Expire>
   );
}
