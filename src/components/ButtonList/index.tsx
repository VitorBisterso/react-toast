import React from 'react';

import Button from '../Button';
import { useToast } from '../ToastProvider';

import './styles.css';

export default function ButtonList() {
   const Toast = useToast();

   return (
      <div className="buttonContainer">
         <Button
            text="success"
            onClick={() => Toast.success('success message')}
         />
         <Button text="danger" onClick={() => Toast.danger('danger message')} />
         <Button text="info" onClick={() => Toast.info('info message')} />
         <Button
            text="warning"
            onClick={() => Toast.warning('warning message')}
         />
      </div>
   );
}
