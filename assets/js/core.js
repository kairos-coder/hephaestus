// hephaestus/assets/js/core.js

let messages = JSON.parse(localStorage.getItem('hephaestus_chat')) || [];
let editor;

// Initialize CodeMirror
function initEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "monokai",
    lineWrapping: true,
    viewportMargin: Infinity,
    readOnly: false
  });
  
  // Default starting code
  editor.setValue(`// Forged by Hephaestus\n// The Anvil awaits your command...\n\nconsole.log("The forge is hot.");\n`);
}

const chat = document.getElementById('chat');
const input = document.getElementById('user-input');

function renderChat() {
  chat.innerHTML = messages.map(msg => `
    <div class="${msg.role === 'user' ? 'text-right' : 'text-left'}">
      <div class="inline-block max-w-[90%] p-5 rounded-2xl ${msg.role === 'user' 
        ? 'bg-orange-900/70' 
        : 'bg-amber-950 border border-orange-800'}">
        ${msg.content}
      </div>
    </div>
  `).join('');
  chat.scrollTop = chat.scrollHeight;
}

function getForgeResponse(prompt) {
  const rituals = [
    `Heating the ore of your request...<br><br>I have forged something for you in the Code Canvas.`,
    `The schematics aligned. Hammer strikes true.<br><br>Behold what I have built for you.`,
    `This one took some fire. Good.<br><br>Check the Code Forge Canvas.`,
    `Raw idea → Tempered creation.<br><br>It is done.`
  ];

  return rituals[Math.floor(Math.random() * rituals.length)];
}

function generateCodeSnippet(prompt) {
  const lower = prompt.toLowerCase();
  
  if (lower.includes("button") || lower.includes("click")) {
    return `// Interactive Button - Forged by Hephaestus
const btn = document.createElement('button');
btn.textContent = "Strike the Anvil";
btn.className = "px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold transition";
btn.onclick = () => alert("🔨 The forge echoes!");
document.body.appendChild(btn);`;
  }
  
  if (lower.includes("animation") || lower.includes("spark")) {
    return `// Spark Animation - Forged by Hephaestus
const spark = document.createElement('div');
spark.style.cssText = 'position:fixed; font-size:2rem; pointer-events:none;';
spark.textContent = '✦';
document.body.appendChild(spark);

let y = 300;
const anim = setInterval(() => {
  y -= 8;
  spark.style.transform = \`translate(\${Math.random()*100-50}px, \${y}px)\`;
  spark.style.opacity = y / 300;
  if (y < 0) {
    clearInterval(anim);
    spark.remove();
  }
}, 30);`;
  }

  // Default code
  return `// Creation Forged from: "${prompt}"
// Hephaestus • The Eternal Anvil

function forgeSolution(input) {
  console.log("🔨 Heating input:", input);
  
  // Your forged logic goes here
  return {
    status: "tempered",
    strength: "unyielding",
    message: "It will hold."
  };
}

console.log(forgeSolution("${prompt}"));`;
}

function forgeRequest() {
  if (!input.value.trim()) return;

  messages.push({ role: "user", content: input.value });
  renderChat();

  const loading = document.createElement('div');
  loading.innerHTML = `<span class="text-orange-400 italic">🔨 Heating metal... Hammering...</span>`;
  chat.appendChild(loading);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    chat.removeChild(loading);

    const responseText = getForgeResponse(input.value);
    messages.push({ role: "assistant", content: responseText });
    
    // Forge code in the canvas
    const code = generateCodeSnippet(input.value);
    editor.setValue(code);

    localStorage.setItem('hephaestus_chat', JSON.stringify(messages));
    renderChat();

    // Refresh schematics
    if (Math.random() > 0.5) getRandomSchematics(3);
  }, 1600);

  input.value = '';
}

function copyCode() {
  const code = editor.getValue();
  navigator.clipboard.writeText(code).then(() => {
    const btns = document.querySelectorAll('button');
    const original = btns[btns.length-1].textContent;
    btns[btns.length-1].textContent = "COPIED ✓";
    setTimeout(() => btns[btns.length-1].textContent = "COPY CODE", 2000);
  });
}

function clearCanvas() {
  if (confirm("Purge the current forging?")) {
    editor.setValue(`// New creation awaits...\n`);
  }
}

// Initialize everything
window.addEventListener('load', () => {
  initEditor();
  renderChat();
  
  // Enter key support
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') forgeRequest();
  });
});
