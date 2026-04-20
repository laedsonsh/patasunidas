const text = `Oi Clara, passando só pra te desejar feliz aniversário.

Eu poderia começar essa mensagem de várias formas…
mas a verdade é que, mesmo com o nosso distanciamento,
ainda existe uma parte de mim que lembra de você em silêncio
principalmente em dias como hoje.

Eu lembro do seu sorriso
(era tão bom te ver sorrindo),
da sua voz,
da forma como você iluminava até os momentos mais simples.

Nunca vou esquecer de como você me fazia sentir
nos momentos em que havia leveza entre nós.

E mesmo que a vida tenha trilhado caminhos diferentes pra nós dois,
nada disso deixou de ser real
ou importante pra mim.

Hoje, mais do que qualquer coisa,
eu só quero te desejar coisas boas.

Que sua vida esteja leve,
que seus dias sejam felizes,
que você esteja sendo cuidada pela vida
do jeito que merece, espero que possa realizar todos seus sonhos e metas.

A gente não foi pra sempre…
mas foi verdadeiro.

E isso sempre vai ter valor pra mim.

Fica com Deus,
e feliz aniversário.

MFDM 🩵
21/04/2026
` 

let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;

    let delay = Math.random() * 60 + 20;

    // pausas 
    if (text.substring(i-10, i).includes("aniversário")) delay = 800;
    if (text.substring(i-10, i).includes("verdadeiro")) delay = 1000;

    setTimeout(typeWriter, delay);
  }
}

window.onload = () => {
  typeWriter();

  // música começa baixa
  const music = document.getElementById("bgMusic");
  music.volume = 0.2;
};

function openImage() {
  document.getElementById("modal").classList.add("active");

  // vibração (mobile)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

function closeImage() {
  document.getElementById("modal").classList.remove("active");
}

const music = document.getElementById("bgMusic");

document.body.addEventListener("click", () => {
  music.volume = 0.15;
  music.play();
}, { once: true });

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

class Particle {
  constructor() {
    // 🔥 espalha pela tela inteira desde o início
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    // profundidade (efeito parallax leve)
    this.speed = Math.random() * 0.3 + 0.05;

    this.size = Math.random() < 0.9
      ? Math.random() * 1.2
      : Math.random() * 3 + 1;

    this.colorType = Math.random();
  }

  update() {
    // movimento vertical contínuo
    this.y += this.speed;

    // leve drift lateral (vida no fundo)
    this.x += Math.sin(this.y * 0.01) * 0.1;

    // reaparece no topo
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    const color = this.colorType < 0.2
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,230,120,0.6)";

    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function createUniverse() {
  particles = [];
  for (let i = 0; i < 1800; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

createUniverse();
animate();