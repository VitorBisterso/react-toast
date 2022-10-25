import React from 'react';

import './styles.css';

type ButtonProps = {
   text: string;
   onClick: () => void;
};

export default function Button({ text, onClick }: ButtonProps) {
   return (
      <button type="button" className="button" onClick={onClick}>
         {text}
      </button>
   );
}
