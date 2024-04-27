import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'containers/App';
import './styles/global.sass';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
