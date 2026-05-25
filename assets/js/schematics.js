// hephaestus/assets/js/schematics.js

const schematicsDeck = [
  {
    id: "strength",
    name: "STRENGTH RUNE",
    icon: "🛠️",
    weight: 0.9
  },
  {
    id: "endurance",
    name: "ENDURANCE FORGE",
    icon: "⛓️",
    weight: 0.85
  },
  {
    id: "innovation",
    name: "INNOVATION SPARK",
    icon: "⚡",
    weight: 0.75
  },
  {
    id: "precision",
    name: "PRECISION HAMMER",
    icon: "🔧",
    weight: 0.8
  },
  {
    id: "fire",
    name: "DIVINE FIRE",
    icon: "🔥",
    weight: 0.95
  },
  {
    id: "legacy",
    name: "LEGACY ANVIL",
    icon: "🏛️",
    weight: 0.7
  }
];

let activeSchematics = [];

function getRandomSchematics(count = 3) {
  const shuffled = [...schematicsDeck].sort(() => 0.5 - Math.random());
  activeSchematics = shuffled.slice(0, count);
  renderActiveSchematics();
}

function renderActiveSchematics() {
  const container = document.getElementById('active-schematics');
  container.innerHTML = activeSchematics.map(s => `
    <div class="schematic active flex items-center gap-2">
      <span>${s.icon}</span>
      <span>${s.name}</span>
    </div>
  `).join('');
}

// Initialize schematics on load
window.addEventListener('load', () => {
  getRandomSchematics(3);
});
