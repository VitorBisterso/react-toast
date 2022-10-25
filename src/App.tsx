import React from 'react';

import ToastProvider from './components/ToastProvider';
import ButtonList from './components/ButtonList';

import './App.css';

function App() {
   return (
      <ToastProvider>
         <div className="root">
            <h1>React toast</h1>
            <ButtonList />
         </div>
      </ToastProvider>
   );
}

export default App;
