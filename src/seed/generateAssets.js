import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../../public');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function buildSvgWrapper(innerElements, bgGrad = '#FAF6F0', circleColor = '#EFE8DE') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGrad}" />
      <stop offset="100%" stop-color="#EBE3D7" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#1F1D1A" flood-opacity="0.08" />
    </filter>
  </defs>
  <rect width="400" height="400" rx="16" fill="url(#bg)" />
  <circle cx="200" cy="200" r="140" fill="${circleColor}" opacity="0.65" />
  ${innerElements}
</svg>`;
}

export function generateAllAssets() {
  const categoriesDir = path.join(publicDir, 'img/categories');
  const productsDir = path.join(publicDir, 'img/products');
  ensureDir(categoriesDir);
  ensureDir(productsDir);

  // Category 1: Cookware
  fs.writeFileSync(
    path.join(categoriesDir, 'cookware.svg'),
    buildSvgWrapper(`
    <g filter="url(#shadow)" transform="translate(200, 205)">
      <!-- Dutch Oven Body -->
      <ellipse cx="0" cy="50" rx="90" ry="42" fill="#C8553D" />
      <path d="M -90 10 C -90 60, -70 80, 0 82 C 70 80, 90 60, 90 10 Z" fill="#B24732" />
      <!-- Handles -->
      <path d="M -90 20 C -115 20, -115 45, -90 45" fill="none" stroke="#8F3523" stroke-width="8" stroke-linecap="round" />
      <path d="M 90 20 C 115 20, 115 45, 90 45" fill="none" stroke="#8F3523" stroke-width="8" stroke-linecap="round" />
      <!-- Lid -->
      <ellipse cx="0" cy="10" rx="90" ry="30" fill="#D9664E" />
      <ellipse cx="0" cy="0" rx="80" ry="24" fill="#C8553D" />
      <!-- Knob -->
      <rect x="-8" y="-18" width="16" height="12" rx="3" fill="#D4AF37" />
      <ellipse cx="0" cy="-18" rx="14" ry="6" fill="#F3E5AB" />
      <!-- Steam lines -->
      <path d="M -25 -40 Q -35 -60 -20 -75" fill="none" stroke="#C8553D" stroke-width="2.5" stroke-dasharray="4,4" opacity="0.6" />
      <path d="M 0 -45 Q 10 -65 0 -85" fill="none" stroke="#C8553D" stroke-width="2.5" stroke-dasharray="4,4" opacity="0.6" />
      <path d="M 25 -40 Q 15 -60 30 -75" fill="none" stroke="#C8553D" stroke-width="2.5" stroke-dasharray="4,4" opacity="0.6" />
    </g>
  `)
  );

  // Category 2: Tableware
  fs.writeFileSync(
    path.join(categoriesDir, 'tableware.svg'),
    buildSvgWrapper(`
    <g filter="url(#shadow)" transform="translate(200, 200)">
      <!-- Main Plate -->
      <ellipse cx="0" cy="30" rx="110" ry="55" fill="#E8E2D8" />
      <ellipse cx="0" cy="28" rx="95" ry="46" fill="#F5F1EB" stroke="#D8CEBF" stroke-width="2" />
      <ellipse cx="0" cy="26" rx="65" ry="30" fill="#EFE9E0" />
      <!-- Bowl on Top -->
      <ellipse cx="-20" cy="-10" rx="55" ry="28" fill="#8A9A5B" />
      <path d="M -75 -10 C -75 25, 35 25, 35 -10 Z" fill="#78874E" />
      <ellipse cx="-20" cy="-12" rx="48" ry="22" fill="#9FB06F" />
      <!-- Fork -->
      <g transform="translate(75, -15) rotate(25)">
        <path d="M 0 -40 L 0 50" stroke="#B3A286" stroke-width="5" stroke-linecap="round" />
        <path d="M -12 -40 C -12 -20, 12 -20, 12 -40" fill="none" stroke="#B3A286" stroke-width="3.5" />
        <path d="M -5 -40 L -5 -25 M 5 -40 L 5 -25" stroke="#B3A286" stroke-width="3" />
      </g>
    </g>
  `)
  );

  // Category 3: Coffee & Tea
  fs.writeFileSync(
    path.join(categoriesDir, 'coffee-tea.svg'),
    buildSvgWrapper(`
    <g filter="url(#shadow)" transform="translate(200, 200)">
      <!-- Glass Carafe -->
      <path d="M -30 20 L -55 75 C -55 90, 55 90, 55 75 L 30 20 Z" fill="#E2EDF0" opacity="0.8" stroke="#ADC8D2" stroke-width="3" />
      <!-- Coffee inside -->
      <path d="M -48 60 C -48 82, 48 82, 48 60 Z" fill="#6A462F" opacity="0.9" />
      <!-- Carafe Handle -->
      <path d="M 40 30 C 70 30, 70 70, 42 70" fill="none" stroke="#ADC8D2" stroke-width="5" stroke-linecap="round" />
      <!-- Ceramic Pour-Over Dripper -->
      <polygon points="-50,-40 50,-40 25,15 -25,15" fill="#C8553D" />
      <ellipse cx="0" cy="-40" rx="50" ry="14" fill="#D9664E" />
      <ellipse cx="0" cy="-42" rx="42" ry="10" fill="#B24732" />
      <!-- Dripper Handle -->
      <path d="M 45 -35 C 65 -35, 65 -15, 30 -5" fill="none" stroke="#C8553D" stroke-width="6" stroke-linecap="round" />
      <!-- Coffee Drop -->
      <circle cx="0" cy="35" r="4" fill="#6A462F" />
      <!-- Steam -->
      <path d="M -10 -60 Q -20 -80 -10 -95" fill="none" stroke="#9A7B68" stroke-width="2.5" stroke-dasharray="3,3" opacity="0.6" />
      <path d="M 12 -62 Q 22 -82 12 -97" fill="none" stroke="#9A7B68" stroke-width="2.5" stroke-dasharray="3,3" opacity="0.6" />
    </g>
  `)
  );

  // Category 4: Pantry
  fs.writeFileSync(
    path.join(categoriesDir, 'pantry.svg'),
    buildSvgWrapper(`
    <g filter="url(#shadow)" transform="translate(200, 200)">
      <!-- Amber Glass Bottle -->
      <rect x="-35" y="-30" width="70" height="110" rx="10" fill="#B85D36" />
      <!-- Bottle neck & Cork -->
      <path d="M -15 -30 L -15 -60 L 15 -60 L 15 -30" fill="#9E4723" />
      <rect x="-18" y="-72" width="36" height="16" rx="4" fill="#D4A373" />
      <!-- Label -->
      <rect x="-26" y="-5" width="52" height="60" rx="4" fill="#FAF6EE" />
      <line x1="-16" y1="12" x2="16" y2="12" stroke="#B85D36" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-12" y1="22" x2="12" y2="22" stroke="#B85D36" stroke-width="2" stroke-linecap="round" />
      <line x1="-18" y1="32" x2="18" y2="32" stroke="#6E675E" stroke-width="1.5" stroke-linecap="round" />
      <!-- Sprig / Botanical illustration on side -->
      <path d="M 45 40 Q 60 15 50 -10" fill="none" stroke="#8A9A5B" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="54" cy="22" rx="8" ry="4" transform="rotate(-30 54 22)" fill="#8A9A5B" />
      <ellipse cx="44" cy="5" rx="8" ry="4" transform="rotate(20 44 5)" fill="#8A9A5B" />
      <ellipse cx="50" cy="-10" rx="7" ry="3.5" transform="rotate(-40 50 -10)" fill="#8A9A5B" />
    </g>
  `)
  );

  // 24 Products SVGs
  const products = [
    // Cookware (1 - 6)
    {
      id: 1,
      file: 'dutch-oven.svg',
      color: '#C8553D',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="0" cy="50" rx="88" ry="40" fill="#C8553D" />
        <path d="M -88 12 C -88 60, -70 82, 0 84 C 70 82, 88 60, 88 12 Z" fill="#AD432D" />
        <path d="M -88 22 C -112 22, -112 44, -88 44" fill="none" stroke="#8F3523" stroke-width="7" stroke-linecap="round" />
        <path d="M 88 22 C 112 22, 112 44, 88 44" fill="none" stroke="#8F3523" stroke-width="7" stroke-linecap="round" />
        <ellipse cx="0" cy="12" rx="88" ry="28" fill="#D9664E" />
        <ellipse cx="0" cy="2" rx="78" ry="22" fill="#C8553D" />
        <rect x="-8" y="-16" width="16" height="12" rx="3" fill="#D4AF37" />
        <ellipse cx="0" cy="-16" rx="13" ry="5" fill="#F3E5AB" />
      </g>`
    },
    {
      id: 2,
      file: 'saute-pan.svg',
      color: '#717D7E',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 215)">
        <ellipse cx="-15" cy="20" rx="75" ry="36" fill="#B0BEC5" />
        <path d="M -90 20 L -90 40 C -90 65, 60 65, 60 40 L 60 20 Z" fill="#90A4AE" />
        <ellipse cx="-15" cy="18" rx="70" ry="32" fill="#CFD8DC" />
        <path d="M 60 25 L 125 10" stroke="#546E7A" stroke-width="9" stroke-linecap="round" />
        <circle cx="125" cy="10" r="3" fill="#CFD8DC" />
      </g>`
    },
    {
      id: 3,
      file: 'carbon-skillet.svg',
      color: '#2E3033',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 210)">
        <ellipse cx="-20" cy="25" rx="80" ry="40" fill="#2E3033" />
        <path d="M -100 25 C -100 55, 60 55, 60 25 Z" fill="#1C1D1F" />
        <ellipse cx="-20" cy="22" rx="74" ry="35" fill="#3D4044" />
        <path d="M 60 25 L 130 5" stroke="#1C1D1F" stroke-width="10" stroke-linecap="round" />
      </g>`
    },
    {
      id: 4,
      file: 'cast-braiser.svg',
      color: '#8A9A5B',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="0" cy="35" rx="92" ry="42" fill="#78874E" />
        <path d="M -92 15 C -92 50, -70 65, 0 68 C 70 65, 92 50, 92 15 Z" fill="#677443" />
        <path d="M -92 20 C -112 20, -112 38, -92 38" fill="none" stroke="#535E35" stroke-width="6.5" stroke-linecap="round" />
        <path d="M 92 20 C 112 20, 112 38, 92 38" fill="none" stroke="#535E35" stroke-width="6.5" stroke-linecap="round" />
        <ellipse cx="0" cy="15" rx="92" ry="28" fill="#8A9A5B" />
        <ellipse cx="0" cy="5" rx="80" ry="22" fill="#9CB06B" />
        <rect x="-8" y="-12" width="16" height="12" rx="3" fill="#D4AF37" />
        <ellipse cx="0" cy="-12" rx="12" ry="5" fill="#F3E5AB" />
      </g>`
    },
    {
      id: 5,
      file: 'copper-saucepan.svg',
      color: '#B85D36',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="-20" cy="35" rx="65" ry="32" fill="#B85D36" />
        <path d="M -85 10 L -85 45 C -85 70, 45 70, 45 45 L 45 10 Z" fill="#9E4723" />
        <ellipse cx="-20" cy="8" rx="65" ry="24" fill="#D97746" />
        <path d="M 45 18 L 125 0" stroke="#70361C" stroke-width="9" stroke-linecap="round" />
        <rect x="-26" y="-6" width="12" height="10" rx="3" fill="#D4AF37" />
      </g>`
    },
    {
      id: 6,
      file: 'griddle-press.svg',
      color: '#343A40',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <rect x="-80" y="20" width="160" height="35" rx="8" fill="#212529" />
        <rect x="-75" y="15" width="150" height="10" rx="4" fill="#495057" />
        <path d="M -40 15 L -40 -15 L 40 -15 L 40 15" fill="none" stroke="#212529" stroke-width="8" stroke-linecap="round" />
        <rect x="-30" y="-24" width="60" height="16" rx="6" fill="#C89D6C" />
      </g>`
    },

    // Tableware (7 - 12)
    {
      id: 7,
      file: 'stoneware-plate.svg',
      color: '#D8CEBF',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="0" cy="20" rx="105" ry="52" fill="#D8CEBF" />
        <ellipse cx="0" cy="18" rx="90" ry="42" fill="#FAF7F2" stroke="#C9BEAC" stroke-width="2" />
        <ellipse cx="0" cy="16" rx="60" ry="28" fill="#EFE8DD" />
      </g>`
    },
    {
      id: 8,
      file: 'pasta-bowls.svg',
      color: '#8A9A5B',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="0" cy="30" rx="95" ry="46" fill="#78874E" />
        <path d="M -95 10 C -95 50, 95 50, 95 10 Z" fill="#677443" />
        <ellipse cx="0" cy="10" rx="92" ry="40" fill="#8A9A5B" />
        <ellipse cx="0" cy="8" rx="80" ry="32" fill="#9FB06F" />
      </g>`
    },
    {
      id: 9,
      file: 'linen-napkins.svg',
      color: '#C8553D',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 200)">
        <polygon points="-70,-20 30,-50 70,30 -30,60" fill="#E8D5CA" opacity="0.9" />
        <polygon points="-55,-5 45,-35 85,45 -15,75" fill="#C8553D" opacity="0.85" />
        <polygon points="-40,10 60,-20 100,60 0,90" fill="#FAF6EE" stroke="#E3DACB" stroke-width="2" />
        <line x1="-30" y1="25" x2="50" y2="-5" stroke="#C8553D" stroke-width="3" stroke-linecap="round" />
      </g>`
    },
    {
      id: 10,
      file: 'fluted-tumblers.svg',
      color: '#A9C4C9',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <path d="M -40 -40 L -30 60 C -30 72, 30 72, 30 60 L 40 -40 Z" fill="#E8F1F3" opacity="0.8" stroke="#A9C4C9" stroke-width="3.5" />
        <ellipse cx="0" cy="-40" rx="40" ry="12" fill="#F5F9FA" stroke="#A9C4C9" stroke-width="2" />
        <ellipse cx="0" cy="60" rx="30" ry="9" fill="#C6DEE3" />
        <line x1="-15" y1="-25" x2="-12" y2="45" stroke="#A9C4C9" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="-25" x2="0" y2="50" stroke="#A9C4C9" stroke-width="2" stroke-linecap="round" />
        <line x1="15" y1="-25" x2="12" y2="45" stroke="#A9C4C9" stroke-width="2" stroke-linecap="round" />
      </g>`
    },
    {
      id: 11,
      file: 'brass-flatware.svg',
      color: '#D4AF37',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 200)">
        <!-- Fork -->
        <g transform="translate(-30, 0)">
          <path d="M 0 -70 L 0 70" stroke="#C69E2E" stroke-width="5" stroke-linecap="round" />
          <path d="M -12 -70 C -12 -45, 12 -45, 12 -70" fill="none" stroke="#C69E2E" stroke-width="3.5" />
          <path d="M -4 -70 L -4 -50 M 4 -70 L 4 -50" stroke="#C69E2E" stroke-width="3" />
        </g>
        <!-- Knife -->
        <g transform="translate(0, 0)">
          <path d="M 0 -70 L 0 70" stroke="#D4AF37" stroke-width="5" stroke-linecap="round" />
          <path d="M 0 -70 C 14 -70, 14 -40, 0 -30 Z" fill="#D4AF37" />
        </g>
        <!-- Spoon -->
        <g transform="translate(30, 0)">
          <path d="M 0 -45 L 0 70" stroke="#C69E2E" stroke-width="5" stroke-linecap="round" />
          <ellipse cx="0" cy="-55" rx="14" ry="22" fill="#D4AF37" />
        </g>
      </g>`
    },
    {
      id: 12,
      file: 'linen-runner.svg',
      color: '#D4A373',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 200)">
        <path d="M -110 -30 Q -50 0 0 -20 Q 50 -40 110 -10 L 95 60 Q 40 30 -10 50 Q -60 70 -125 40 Z" fill="#EADECE" stroke="#CDB8A0" stroke-width="2" />
        <line x1="-120" y1="42" x2="-130" y2="52" stroke="#A8947C" stroke-width="2" />
        <line x1="-115" y1="40" x2="-125" y2="50" stroke="#A8947C" stroke-width="2" />
        <line x1="-110" y1="38" x2="-120" y2="48" stroke="#A8947C" stroke-width="2" />
      </g>`
    },

    // Coffee & Tea (13 - 18)
    {
      id: 13,
      file: 'pourover-dripper.svg',
      color: '#C8553D',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <polygon points="-60,-40 60,-40 30,35 -30,35" fill="#C8553D" />
        <ellipse cx="0" cy="-40" rx="60" ry="18" fill="#D9664E" />
        <ellipse cx="0" cy="-42" rx="50" ry="13" fill="#B24732" />
        <ellipse cx="0" cy="35" rx="45" ry="10" fill="#993826" />
        <path d="M 52 -30 C 78 -30, 78 5, 38 15" fill="none" stroke="#C8553D" stroke-width="7" stroke-linecap="round" />
      </g>`
    },
    {
      id: 14,
      file: 'ceramic-mug.svg',
      color: '#EAE5DB',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <rect x="-45" y="-35" width="90" height="95" rx="14" fill="#FAF6EE" stroke="#E3DACB" stroke-width="3" />
        <!-- Glaze dip bottom -->
        <path d="M -45 20 C -45 50, 45 50, 45 20 L 45 60 C 45 60, 45 60, 45 60 C 45 60, -45 60, -45 60 Z" fill="#D4A373" />
        <ellipse cx="0" cy="-35" rx="45" ry="14" fill="#FAF6EE" stroke="#E3DACB" stroke-width="2" />
        <ellipse cx="0" cy="-36" rx="38" ry="10" fill="#583B28" />
        <!-- Handle -->
        <path d="M 45 -15 C 80 -15, 80 35, 45 35" fill="none" stroke="#FAF6EE" stroke-width="8" stroke-linecap="round" />
        <path d="M 45 -15 C 80 -15, 80 35, 45 35" fill="none" stroke="#E3DACB" stroke-width="2" stroke-linecap="round" />
      </g>`
    },
    {
      id: 15,
      file: 'gooseneck-kettle.svg',
      color: '#343A40',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <!-- Body -->
        <path d="M -50 45 C -55 10, -35 -20, 0 -25 C 35 -20, 55 10, 50 45 Z" fill="#2E3033" />
        <ellipse cx="0" cy="45" rx="50" ry="14" fill="#212529" />
        <ellipse cx="0" cy="-25" rx="28" ry="8" fill="#3D4044" />
        <!-- Lid & Wooden knob -->
        <ellipse cx="0" cy="-30" rx="24" ry="6" fill="#2E3033" />
        <ellipse cx="0" cy="-36" rx="7" ry="4" fill="#C89D6C" />
        <!-- Gooseneck spout -->
        <path d="M -45 30 C -90 10, -90 -25, -60 -45" fill="none" stroke="#2E3033" stroke-width="6" stroke-linecap="round" />
        <!-- Handle -->
        <path d="M 35 -15 C 85 -20, 85 40, 45 42" fill="none" stroke="#C89D6C" stroke-width="8" stroke-linecap="round" />
      </g>`
    },
    {
      id: 16,
      file: 'glass-server.svg',
      color: '#B0BEC5',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <path d="M -25 -30 L -50 45 C -50 65, 50 65, 50 45 L 25 -30 Z" fill="#E8F4F8" opacity="0.8" stroke="#B0BEC5" stroke-width="3" />
        <ellipse cx="0" cy="-30" rx="25" ry="8" fill="#F5FBFC" stroke="#B0BEC5" stroke-width="2" />
        <!-- Liquid -->
        <path d="M -44 25 C -44 55, 44 55, 44 25 Z" fill="#6A462F" opacity="0.85" />
        <!-- Glass Handle -->
        <path d="M 35 -10 C 65 -10, 65 35, 40 35" fill="none" stroke="#B0BEC5" stroke-width="5" stroke-linecap="round" />
      </g>`
    },
    {
      id: 17,
      file: 'kyusu-teapot.svg',
      color: '#3F4E4F',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="-10" cy="20" rx="65" ry="38" fill="#2C3639" />
        <ellipse cx="-10" cy="-5" rx="35" ry="12" fill="#3F4E4F" />
        <circle cx="-10" cy="-12" r="5" fill="#DCD7C9" />
        <!-- Short Spout -->
        <path d="M -70 12 L -90 0 L -75 25 Z" fill="#2C3639" />
        <!-- Side Handle -->
        <rect x="35" y="5" width="60" height="15" rx="5" transform="rotate(-15 35 5)" fill="#2C3639" />
      </g>`
    },
    {
      id: 18,
      file: 'brass-scoop.svg',
      color: '#D4AF37',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <ellipse cx="-35" cy="20" rx="35" ry="25" fill="#D4AF37" />
        <ellipse cx="-35" cy="15" rx="28" ry="18" fill="#C69E2E" />
        <path d="M -10 20 L 85 -25" stroke="#B38B22" stroke-width="7" stroke-linecap="round" />
      </g>`
    },

    // Pantry (19 - 24)
    {
      id: 19,
      file: 'sea-salt.svg',
      color: '#8A9A5B',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <rect x="-45" y="-10" width="90" height="75" rx="10" fill="#FAF6EE" stroke="#E3DACB" stroke-width="3" />
        <ellipse cx="0" cy="-10" rx="45" ry="14" fill="#D4A373" />
        <rect x="-30" y="10" width="60" height="40" rx="4" fill="#EEF1E4" />
        <line x1="-18" y1="24" x2="18" y2="24" stroke="#8A9A5B" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-12" y1="34" x2="12" y2="34" stroke="#8A9A5B" stroke-width="2" stroke-linecap="round" />
        <!-- Salt crystals -->
        <polygon points="-10,-20 -5,-30 5,-25 0,-15" fill="#FFFFFF" stroke="#D3D3D3" stroke-width="1" />
        <polygon points="12,-18 20,-26 26,-20 18,-12" fill="#FFFFFF" stroke="#D3D3D3" stroke-width="1" />
      </g>`
    },
    {
      id: 20,
      file: 'olive-oil.svg',
      color: '#556B2F',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 200)">
        <rect x="-35" y="-30" width="70" height="115" rx="8" fill="#2E4A28" />
        <path d="M -14 -30 L -14 -60 L 14 -60 L 14 -30" fill="#1E331A" />
        <rect x="-16" y="-68" width="32" height="12" rx="3" fill="#C89D6C" />
        <rect x="-25" y="-5" width="50" height="65" rx="4" fill="#FAF5E8" />
        <circle cx="0" cy="18" r="10" fill="#556B2F" />
        <line x1="-15" y1="36" x2="15" y2="36" stroke="#2E4A28" stroke-width="2" stroke-linecap="round" />
        <line x1="-10" y1="46" x2="10" y2="46" stroke="#2E4A28" stroke-width="1.5" stroke-linecap="round" />
      </g>`
    },
    {
      id: 21,
      file: 'wildflower-honey.svg',
      color: '#D4A373',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <rect x="-40" y="-15" width="80" height="80" rx="14" fill="#E89828" opacity="0.9" />
        <ellipse cx="0" cy="-15" rx="40" ry="12" fill="#FAF6EE" stroke="#E3DACB" stroke-width="2" />
        <rect x="-44" y="-30" width="88" height="18" rx="5" fill="#D4A373" />
        <rect x="-26" y="5" width="52" height="42" rx="4" fill="#FAF6EE" />
        <line x1="-16" y1="20" x2="16" y2="20" stroke="#B8731F" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-12" y1="30" x2="12" y2="30" stroke="#6E675E" stroke-width="1.5" stroke-linecap="round" />
      </g>`
    },
    {
      id: 22,
      file: 'peppercorns.svg',
      color: '#212529',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <rect x="-35" y="-20" width="70" height="85" rx="8" fill="#DCD6CD" stroke="#BBB0A3" stroke-width="2.5" />
        <rect x="-38" y="-34" width="76" height="16" rx="4" fill="#8C8275" />
        <rect x="-24" y="-2" width="48" height="48" rx="4" fill="#FAF6EE" />
        <circle cx="0" cy="18" r="8" fill="#212529" />
        <line x1="-12" y1="34" x2="12" y2="34" stroke="#212529" stroke-width="1.5" stroke-linecap="round" />
      </g>`
    },
    {
      id: 23,
      file: 'grain-mustard.svg',
      color: '#C69E2E',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 205)">
        <rect x="-38" y="-15" width="76" height="75" rx="12" fill="#D9A826" opacity="0.9" />
        <rect x="-42" y="-30" width="84" height="16" rx="4" fill="#3D4044" />
        <rect x="-25" y="3" width="50" height="40" rx="3" fill="#FAF6EE" />
        <line x1="-14" y1="18" x2="14" y2="18" stroke="#7A5C0E" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-10" y1="28" x2="10" y2="28" stroke="#7A5C0E" stroke-width="1.5" stroke-linecap="round" />
      </g>`
    },
    {
      id: 24,
      file: 'lavender-syrup.svg',
      color: '#7D6B91',
      svg: `
      <g filter="url(#shadow)" transform="translate(200, 200)">
        <rect x="-30" y="-25" width="60" height="110" rx="10" fill="#7D6B91" opacity="0.85" />
        <path d="M -12 -25 L -12 -55 L 12 -55 L 12 -25" fill="#5F4F72" />
        <rect x="-15" y="-64" width="30" height="12" rx="3" fill="#D4A373" />
        <rect x="-20" y="-2" width="40" height="60" rx="3" fill="#FAF6EE" />
        <line x1="-12" y1="18" x2="12" y2="18" stroke="#5F4F72" stroke-width="2" stroke-linecap="round" />
        <line x1="-8" y1="28" x2="8" y2="28" stroke="#5F4F72" stroke-width="1.5" stroke-linecap="round" />
      </g>`
    }
  ];

  for (const item of products) {
    fs.writeFileSync(path.join(productsDir, item.file), buildSvgWrapper(item.svg));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllAssets();
}
