import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'

const hideLoader = () => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 300);
  }
};

// Wrapper pour cacher le loader au premier paint React
function Root() {
  useEffect(() => {
    hideLoader();
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);