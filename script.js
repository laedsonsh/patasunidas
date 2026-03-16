const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const topbar = document.querySelector('.topbar');
const copyPixBtn = document.getElementById('copyPixBtn');
const pixKey = document.getElementById('pixKey');
const copyFeedback = document.getElementById('copyFeedback');
const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('main section[id]');
const counters = document.querySelectorAll('.counter');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const donationChips = document.querySelectorAll('.donation-chip');

const updateTopbarState = () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 16);
};


const getHeaderHeight = () => topbar ? topbar.offsetHeight + 48 : 0;
const getAnchorAdjustment = (targetId) => {
  if (targetId === 'inicio') return 0;
  if (window.innerWidth <= 720) {
    return targetId === 'doacao' ? 24 : 34;
  }
  return targetId === 'doacao' ? 28 : 46;
};

const scrollToTarget = (target) => {
  if (!target) return;
  const targetId = target.id || '';
  if (targetId === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderHeight() + getAnchorAdjustment(targetId);
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
};

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

const copyPix = async () => {
  if (!pixKey) return false;
  try {
    await navigator.clipboard.writeText(pixKey.value);
    return true;
  } catch (error) {
    try {
      pixKey.removeAttribute('readonly');
      pixKey.select();
      pixKey.setSelectionRange(0, 99999);
      document.execCommand('copy');
      pixKey.setAttribute('readonly', true);
      return true;
    } catch {
      return false;
    }
  }
};

if (copyPixBtn && pixKey) {
  copyPixBtn.addEventListener('click', async () => {
    const ok = await copyPix();
    copyFeedback.textContent = ok ? 'Chave PIX copiada com sucesso!' : 'Não foi possível copiar automaticamente. Copie manualmente.';
    copyPixBtn.textContent = ok ? 'PIX copiado!' : 'Tentar novamente';
    setTimeout(() => {
      copyFeedback.textContent = '';
      copyPixBtn.textContent = 'Copiar chave PIX';
    }, 2200);
  });
}

donationChips.forEach((chip) => {
  chip.addEventListener('click', async () => {
    donationChips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');
    const amount = chip.dataset.amount;
    await copyPix();
    if (copyFeedback) {
      copyFeedback.textContent = `Sugestão selecionada: R$ ${amount}. A chave PIX já foi copiada.`;
      setTimeout(() => {
        copyFeedback.textContent = '';
      }, 2600);
    }
  });
});

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.replaceState(null, '', href);
    if (nav) {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach((element) => revealObserver.observe(element));

const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = `+${current}`;
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = `+${target}`;
  };
  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.dataset.target) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => {
  if (counter.dataset.target) counterObserver.observe(counter);
});

const updateActiveNav = () => {
  const marker = window.scrollY + getHeaderHeight() + 90;
  let currentId = 'inicio';
  sections.forEach((section) => {
    if (marker >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', () => {
  updateActiveNav();
  updateTopbarState();
}, { passive: true });
window.addEventListener('load', () => {
  updateActiveNav();
  updateTopbarState();
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) setTimeout(() => scrollToTarget(target), 80);
  }
});
window.addEventListener('resize', () => {
  updateActiveNav();
  updateTopbarState();
});


const supportList = document.getElementById('supportList');
const supportEntries = [
  { name: 'Ana', amount: 50 },
  { name: 'Marcos', amount: 30 },
  { name: 'Juliana', amount: 100 },
  { name: 'Paula', amount: 20 },
  { name: 'Carlos', amount: 40 },
  { name: 'Fernanda', amount: 60 },
  { name: 'Beatriz', amount: 35 },
  { name: 'Lucas', amount: 25 },
  { name: 'Marina', amount: 80 },
  { name: 'Pedro', amount: 45 },
  { name: 'Aline', amount: 70 },
  { name: 'João', amount: 55 }
];

const shuffleArray = (items) => {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const renderSupportList = () => {
  if (!supportList) return;
  const selected = shuffleArray(supportEntries).slice(0, 4);
  supportList.innerHTML = selected
    .map(({ name, amount }) => `<li><span>${name}</span><b>R$ ${amount}</b></li>`)
    .join('');
};

renderSupportList();
