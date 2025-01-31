import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">&copy; 2025 MAKEUPJM. Todos los derechos reservados.</p>
        <p className="mb-0">Síguenos en:
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">Facebook</a>|
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">Instagram</a>|
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">Twitter</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
