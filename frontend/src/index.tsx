import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RootLayout from './app/layout';

async function deferRender() {
  if (import.meta.env.VITE_NODE_ENV === 'integration') {
    console.log('Integration environment');
    const { worker } = await import('./test-utils/browser');
    return worker.start();
  }
  return Promise.resolve();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

deferRender().then(() => {
  root.render(
    <React.StrictMode>
      <RootLayout />
    </React.StrictMode>,
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
