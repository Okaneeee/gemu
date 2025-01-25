import './style.css';
import { Html5QrcodeScanner } from 'html5-qrcode';

let html5QrcodeScanner;

function onScanSuccess(decodedText, decodedResult) {
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `
    <h3>Scanned Code:</h3>
    <p>${decodedText}</p>
  `;
}

function onScanFailure(error) {
  // Handle scan failure, usually better to just ignore
}

// Initialize scanner
window.addEventListener('load', () => {
  html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { 
      fps: 10,
      qrbox: { width: 250, height: 250 }
    }
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});