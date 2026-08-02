function inView(el, margin = 80) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - margin;
}

const elementsToReveal = [];

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  elementsToReveal.push(el);
});

function revealVisible() {
  elementsToReveal.forEach(el => {
    if (inView(el, 60)) {
      el.classList.add('visible');
    }
  });
}

revealVisible();
window.addEventListener('scroll', revealVisible, { passive: true });

const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
  setTimeout(() => heroBadge.classList.add('revealed'), 600);
}

const expDots = document.querySelectorAll('.exp-line');
function animateTimeline() {
  expDots.forEach(line => {
    const dot = line.querySelector('.exp-dot');
    if (!dot) return;
    if (inView(line, 100)) {
      dot.classList.add('observed');
    }
  });
}
window.addEventListener('scroll', animateTimeline, { passive: true });
animateTimeline();

const avatar = document.querySelector('.avatar-frame');
if (avatar) {
  avatar.addEventListener('mousemove', e => {
    const rect = avatar.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 6;
    const y = (e.clientY - rect.top - rect.height / 2) / 6;
    avatar.style.transition = 'transform 0s';
    avatar.style.transform = `perspective(200px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  avatar.addEventListener('mouseleave', () => {
    avatar.style.transition = 'transform 0.5s ease';
    avatar.style.transform = 'perspective(200px) rotateY(0) rotateX(0)';
  });
}

const skillPills = document.querySelectorAll('.skill-pill');
skillPills.forEach((pill, i) => {
  pill.style.opacity = '0';
  pill.style.transform = 'scale(0.85) translateY(8px)';
  pill.style.transition = `all 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms`;

  const skillsCard = document.getElementById('skills');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pill.style.opacity = '1';
        pill.style.transform = 'scale(1) translateY(0)';
        observer.unobserve(skillsCard);
      }
    });
  }, { threshold: 0.3 });
  if (skillsCard) observer.observe(skillsCard);
});

const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
    }
  });
}, { threshold: 0.1 });
cards.forEach(c => cardObserver.observe(c));

/* ─── PHOTO MODAL ─── */

function calcAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const birthDate = new Date(1995, 9, 7);
const ageStr = calcAge(birthDate) + ' años';

const ageEl = document.getElementById('modalAge');
const ageBackEl = document.getElementById('modalAgeBack');
if (ageEl) ageEl.textContent = ageStr;
if (ageBackEl) ageBackEl.textContent = ageStr;

const avatarTrigger = document.getElementById('avatarTrigger');
const photoModal = document.getElementById('photoModal');
const modalClose = document.getElementById('modalClose');
const modalFlip = document.getElementById('modalFlip');
const flipToBack = document.getElementById('flipToBack');
const flipToFront = document.getElementById('flipToFront');

function resetFlip() {
  if (modalFlip) modalFlip.classList.remove('flipped');
}

function openModal() {
  resetFlip();
  photoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  photoModal.classList.remove('open');
  document.body.style.overflow = '';
  resetFlip();
}

if (avatarTrigger) {
  avatarTrigger.addEventListener('click', openModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (flipToBack) {
  flipToBack.addEventListener('click', (e) => {
    e.stopPropagation();
    if (modalFlip) modalFlip.classList.add('flipped');
  });
}

if (flipToFront) {
  flipToFront.addEventListener('click', (e) => {
    e.stopPropagation();
    if (modalFlip) modalFlip.classList.remove('flipped');
  });
}

if (photoModal) {
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && photoModal && photoModal.classList.contains('open')) {
    closeModal();
  }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();