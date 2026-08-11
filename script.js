// SLP Activities Hub — front-end logic
// Reads activities.json and renders searchable/filterable cards + detail modal.

let ALL_ACTIVITIES = [];
let activeCategory = 'all';

const grid = document.getElementById('activityGrid');
const emptyState = document.getElementById('emptyState');
const categoryChips = document.getElementById('categoryChips');
const searchBox = document.getElementById('searchBox');
const statCount = document.getElementById('statCount');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

const CATEGORY_META = {
  Describing: { label: 'Describir', icon: '🔎' },
  Grammar: { label: 'Gramática', icon: '✏️' },
  Following_Directions_Conceptos_Espaciales: { label: 'Conceptos espaciales', icon: '🧭' },
  Following_Directions_Conceptos_Cuantitativos: { label: 'Conceptos cuantitativos', icon: '🔢' },
  WH_Questions: { label: 'Preguntas WH', icon: '❓' }
};

function metaFor(category) {
  return CATEGORY_META[category] || { label: category, icon: '📋' };
}

function isNew(dateAdded) {
  if (!dateAdded) return false;
  const added = new Date(dateAdded);
  const diffDays = (Date.now() - added.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
}

async function loadActivities() {
  try {
    const res = await fetch('activities.json', { cache: 'no-store' });
    ALL_ACTIVITIES = await res.json();
  } catch (err) {
    console.error('No se pudo cargar activities.json', err);
    ALL_ACTIVITIES = [];
  }
  statCount.textContent = ALL_ACTIVITIES.length;
  buildCategoryChips();
  render();
}

function buildCategoryChips() {
  const categories = [...new Set(ALL_ACTIVITIES.map(a => a.category))];

  const allChip = makeChip('all', 'Todas', '✨');
  categoryChips.appendChild(allChip);

  categories.forEach(cat => {
    const meta = metaFor(cat);
    categoryChips.appendChild(makeChip(cat, meta.label, meta.icon));
  });
}

function makeChip(value, label, icon) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'chip' + (value === activeCategory ? ' active' : '');
  btn.textContent = `${icon} ${label}`;
  btn.dataset.value = value;
  btn.addEventListener('click', () => {
    activeCategory = value;
    [...categoryChips.children].forEach(c => c.classList.toggle('active', c.dataset.value === value));
    render();
  });
  return btn;
}

function filteredActivities() {
  const query = searchBox.value.trim().toLowerCase();
  return ALL_ACTIVITIES.filter(a => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
    const haystack = `${a.title} ${a.skill}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });
}

function render() {
  const items = filteredActivities();
  grid.innerHTML = '';

  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  items.forEach(activity => {
    const meta = metaFor(activity.category);
    const card = document.createElement('article');
    card.className = 'activity-card';
    card.innerHTML = `
      <div class="card-top">
        <span class="badge">${meta.icon} ${meta.label}</span>
        ${isNew(activity.dateAdded) ? '<span class="new-badge">NUEVO</span>' : ''}
      </div>
      <h3>${activity.title}</h3>
      <p class="skill">${activity.skill}</p>
      <div class="card-meta">
        <span>👤 ${activity.ageRange}</span>
        <span>👥 ${activity.groupSize}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(activity));
    grid.appendChild(card);
  });
}

function openModal(activity) {
  const meta = metaFor(activity.category);
  modalContent.innerHTML = `
    <span class="badge">${meta.icon} ${meta.label}</span>
    <h2>${activity.title}</h2>
    <p class="meta-line">👤 Edad: ${activity.ageRange} &nbsp;·&nbsp; 👥 Grupo: ${activity.groupSize}</p>

    <div class="modal-section">
      <h4>🎯 Objetivo</h4>
      <p class="goal-text">${activity.goal}</p>
    </div>

    <div class="modal-section">
      <h4>🧰 Materiales</h4>
      <ul>${activity.materials.map(m => `<li>${m}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <h4>📋 Instrucciones</h4>
      <ol>${activity.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
    </div>

    <div class="modal-section">
      <h4>🚀 Extensión</h4>
      <p class="extension-text">${activity.extension}</p>
    </div>
  `;
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

searchBox.addEventListener('input', render);

document.getElementById('year').textContent = new Date().getFullYear();

loadActivities();
