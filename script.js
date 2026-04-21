const text = `Oi Clara, passando só pra te desejar feliz aniversário.

Eu poderia começar essa mensagem de várias formas…
mas a verdade é que, mesmo com o nosso distanciamento
ainda existe uma parte de mim que lembra de você em silêncio
principalmente em dias como hoje.

Eu lembro do seu sorriso
(era tão bom te ver sorrindo)
da sua voz,
da forma como você iluminava até os momentos mais simples.

Nunca vou esquecer de como você me fazia se sentir
nos momentos em que havia leveza entre a gente.

E mesmo que a vida tenha trilhado caminhos diferentes pra nós dois,
nada disso deixou de ser real
ou importante pra mim.

Hoje, mais do que qualquer coisa,
eu só quero te desejar coisas boas.

Que sua vida agora esteja leve,
que seus dias sejam felizes,
que você esteja sendo cuidada pela vida
do jeito que merece, espero que possa realizar todos seus sonhos e metas.

A gente não foi pra sempre…
mas foi verdadeiro.

E isso sempre vai ter valor pra mim.

Continue sendo essa garota que contagia todos ao seu redor com sua alegria e seu jeito único.
Espero que a vida tenha o melhor reservado pra você, que nunca te faltem motivos pra sorrir.

Fica com Deus,
e meus mais sinceros: feliz aniversário!

MFDM 🩵
21/04/2026


𝐻𝑎́ 𝑎𝑚𝑜𝑟𝑒𝑠 𝑞𝑢𝑒 𝑠𝑜́ 𝑝𝑜𝑑𝑒𝑚 𝑣𝑖𝑣𝑒𝑟 𝑒𝑚 𝑠𝑒𝑢 𝑐𝑜𝑟𝑎𝑐̧𝑎̃𝑜, 𝑛𝑎̃𝑜 𝑒𝑚 𝑠𝑢𝑎 𝑣𝑖𝑑𝑎.
`;

let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;

    let delay = Math.random() * 60 + 20;

    if (text.substring(i - 10, i).includes("aniversário")) delay = 800;
    if (text.substring(i - 10, i).includes("verdadeiro")) delay = 1000;

    setTimeout(typeWriter, delay);
  }
}

window.onload = () => {
  const music = document.getElementById("bgMusic");
  music.volume = 0.2;
};

function openImage() {
  document.getElementById("modal").classList.add("active");

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
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 0.3 + 0.05;

    this.size = Math.random() < 0.9
      ? Math.random() * 1.2
      : Math.random() * 3 + 1;

    this.colorType = Math.random();
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.y * 0.01) * 0.1;

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

const intro = document.getElementById("introPrompt");
const continueBtn = document.getElementById("continueBtn");

let started = false;

document.querySelector(".container").style.display = "none";
document.getElementById("icon").style.display = "none";
document.getElementById("serendipia").style.display = "none";

function startSite() {
  if (started) return;
  started = true;

  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";

    document.querySelector(".container").style.display = "block";
    document.getElementById("icon").style.display = "flex";
    document.getElementById("serendipia").style.display = "block";

    i = 0;
    document.getElementById("text").innerHTML = "";

    typeWriter();
  }, 500);
}

continueBtn.onclick = startSite;

window.addEventListener("load", () => {
  const imgURL = "https://i.ibb.co/d4N2rVDG/paper-heart-1.webp";


  function createFloatingImage() {
    const img = document.createElement("img");
    img.src = imgURL;
    img.className = "floating-img";

    img.style.left = Math.random() * (window.innerWidth - 40) + "px";

    const size = Math.random() * 25 + 20;
    img.style.width = size + "px";

    const duration = Math.random() * 8 + 12;
    img.style.animationDuration = duration + "s";

    document.body.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingImage, i * 300);
  }

  setInterval(createFloatingImage, 8200);
});

window.addEventListener("load", () => {
  const imgURL = "https://i.ibb.co/k6BgC341/4d9527b4-af50-4c87-898e-997489655d69.png";


  function createFloatingImage() {
    const img = document.createElement("img");
    img.src = imgURL;
    img.className = "floating-img";

    img.style.left = Math.random() * (window.innerWidth - 40) + "px";

    const size = Math.random() * 18 + 20;
    img.style.width = size + "px";

    const duration = Math.random() * 8 + 12

    ;
    img.style.animationDuration = duration + "s";

    document.body.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, duration * 1000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingImage, i * 300);
  }

  setInterval(createFloatingImage, 5200);
});