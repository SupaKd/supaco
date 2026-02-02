import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'

// Cacher le loader une fois React monté
const hideLoader = () => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 300);
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Cacher le loader dès que l'app est montée
setTimeout(hideLoader, 100);