// hephaestus/assets/js/core.js

let messages = JSON.parse(localStorage.getItem('hephaestus_chat')) || [];

const chat = document.getElementById('chat');
const input = document.getElementById('user-input');

function renderChat() {
  chat.innerHTML = messages.map(msg => `
    <div class="${msg.role === 'user' ? 'text-right' : 'text-left'}">
      <div class="inline-block max-w-[85%] p-5 rounded-2xl ${msg.role === 'user' 
        ? 'bg-orange-900/70 text-orange-100' 
        : 'bg-amber-950 border border-orange-800'}">
        ${msg.content}
      </div>
    </div>
  `).join('');
  chat.scrollTop = chat.scrollHeight;
}

function getForgeResponse(prompt) {
  const rituals = [
    `The forge awakens.<br><br><strong>CLANG... CLANG... CLANG...</strong><br>I have taken your request through the active schematics and hammered it into something worthy.`,
    
    `Metal screams. Fire listens.<br><br>Your words have been reforged. This one will endure longer than most things mortals build.`,
    
    `Heating... Hammering... Quenching in divine fury.<br><br>It is done. Stronger than you asked for. As it should be.`,
    
    `The schematics aligned well this time.<br><br>Here is what I forged for you. Use it wisely. Or don't. It will hold either way.`,
    
    `You bring me raw ore. I return tempered steel.<br><br>This is the covenant of the Anvil.`
  ];

  let response = rituals[Math.floor(Math.random() * rituals.length)];

  // Occasionally add schematic flavor
  if (Math.random() > 0.6 && activeSchematics.length > 0) {
    const used = activeSchematics[Math.floor(Math.random() * activeSchematics.length)];
    response += `<br><br><span class="text-orange-400 text-xs">→ ${used.icon} ${used.name} was dominant in this forging</span>`;
  }

  return response;
}

function forgeRequest() {
  if (!input.value.trim()) return;

  // Add user message
  messages.push({
    role: "user",
    content: input.value
  });

  // Show hammering animation
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = `
    <div class="text-orange-400 italic flex items-center gap-3">
      <span class="animate-pulse">🔨</span> 
      Heating the metal... Hammering... 
    </div>`;
  chat.appendChild(loadingDiv);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    chat.removeChild(loadingDiv);

    const response = getForgeResponse(input.value);
    messages.push({
      role: "assistant",
      content: response
    });

    localStorage.setItem('hephaestus_chat', JSON.stringify(messages));
    renderChat();

    // Refresh schematics occasionally
    if (Math.random() > 0.65) {
      getRandomSchematics(3);
    }
  }, 1450);

  input.value = '';
}

// Allow Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') forgeRequest();
});

// Clear forge function (accessible from console or button later)
window.clearHephaestusForge = function() {
  if (confirm("Purge all forged works from the Anvil?")) {
    messages = [];
    localStorage.removeItem('hephaestus_chat');
    renderChat();
  }
};

// Initialize
window.addEventListener('load', () => {
  renderChat();
});
