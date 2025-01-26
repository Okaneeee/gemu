import './style.css';
import { Html5QrcodeScanner } from 'html5-qrcode';

let html5QrcodeScanner;

/**
 * Fetch game details from the Steam API
 * @param {string} appId - Steam App ID
 * @returns {Object} Game details
 * @see https://store.steampowered.com/api/appdetails
 */
async function fetchGameDetails(appId) {
  try {
    // Using cors-proxy.io as a CORS proxy
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://store.steampowered.com/api/appdetails?appids=${appId}`)}`);
    const data = await response.json();
    const steamData = JSON.parse(data.contents);
    return steamData[appId].data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
}

/**
 * Get a random ethical rating for a game studio
 * @returns {Object} Random ethical rating
 */
function getRandomEthicalRating() {
  const ratings = [
    { status: 'Ethical', description: 'This studio has shown consistent ethical practices.', color: '#2ecc71' },
    { status: 'Unethical', description: 'This studio has demonstrated concerning practices.', color: '#e74c3c' },
    { status: 'Questionable', description: 'This studio has mixed ethical practices.', color: '#f39c12' }
  ];
  return ratings[Math.floor(Math.random() * ratings.length)];
}

/**
 * Show the game page with details
 * @param {Object} gameData - Game details
 */  
function showGamePage(gameData) {
  const scannerPage = document.getElementById('scanner-page');
  const gamePage = document.getElementById('game-page');
  const gameInfo = document.getElementById('game-info');

  const price = gameData.is_free ? 'Free to Play' : 
    gameData.price_overview ? `$${(gameData.price_overview.final / 100).toFixed(2)}` : 'Price not available';

  const ethicalRating = getRandomEthicalRating();

  gameInfo.innerHTML = `
    <div class="game-header">
      <img src="${gameData.header_image}" alt="${gameData.name}">
      <div class="game-details">
        <h2>${gameData.name}</h2>
        <p class="price">${price}</p>
        <p><strong>Developer:</strong> ${gameData.developers.join(', ')}</p>
        <p><strong>Publisher:</strong> ${gameData.publishers.join(', ')}</p>
        ${gameData.metacritic ? 
          `<p><strong>Reviews:</strong> <span class="${gameData.metacritic.score > 70 ? 'review-positive' : 'review-negative'}">
            ${gameData.metacritic.score}% Positive
          </span></p>` : ''}
        <div class="ethical-rating" style="margin-top: 1rem; padding: 1rem; border-radius: 8px; background-color: ${ethicalRating.color}20; border: 2px solid ${ethicalRating.color}">
          <p style="color: ${ethicalRating.color}; font-weight: bold; margin: 0">
            Studio Ethics Rating: ${ethicalRating.status}
          </p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.9em">
            ${ethicalRating.description}
          </p>
        </div>
      </div>
    </div>
    <div class="game-description">
      <h3>About the Game</h3>
      <p>${gameData.short_description}</p>
    </div>
  `;

  scannerPage.style.display = 'none';
  gamePage.style.display = 'block';

  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear();
  }
}

/**
 * Show the scanner page
 */
function showScannerPage() {
  const scannerPage = document.getElementById('scanner-page');
  const gamePage = document.getElementById('game-page');

  scannerPage.style.display = 'block';
  gamePage.style.display = 'none';

  initializeScanner();
}

/**
 * Handle successful QR code scan
 * @param {string} decodedText - Decoded text from the QR code
 */
async function onScanSuccess(decodedText) {
  // Assuming the scanned text is a Steam App ID
  const appId = decodedText.trim();
  const gameData = await fetchGameDetails(appId);
  
  if (gameData) {
    showGamePage(gameData);
  } else {
    document.getElementById('result').innerHTML = `
      <p style="color: red;">Error: Could not find game with ID ${appId}</p>
    `;
  }
}

function onScanFailure(error) {
  // Handle scan failure, usually better to just ignore
}

/**
 * Initialize the QR code scanner
 */
function initializeScanner() {
  html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { 
      fps: 10,
      qrbox: { width: 250, height: 250 }
    }
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

// Initialize the app
window.addEventListener('load', () => {
  initializeScanner();
  
  // Add back button functionality
  document.getElementById('back-button').addEventListener('click', showScannerPage);
});