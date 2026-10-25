const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const moduleCards = [...document.querySelectorAll('.module-card')];
const levelTabs = [...document.querySelectorAll('.level-tab')];
const topicSearch = document.getElementById('topicSearch');
const expandAll = document.getElementById('expandAll');
const emptyState = document.getElementById('emptyState');
const moduleDialog = document.getElementById('moduleDialog');
const dialogTitle = document.getElementById('dialogTitle');
let activeLevel = 'all';

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

function applyFilters() {
  const term = topicSearch.value.trim().toLowerCase();
  let visibleCount = 0;
  moduleCards.forEach(card => {
    const levelMatch = activeLevel === 'all' || card.dataset.level === activeLevel;
    const searchText = (card.dataset.search + ' ' + card.innerText).toLowerCase();
    const searchMatch = !term || searchText.includes(term);
    const visible = levelMatch && searchMatch;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
}

levelTabs.forEach(tab => tab.addEventListener('click', () => {
  activeLevel = tab.dataset.level;
  levelTabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  applyFilters();
}));
topicSearch.addEventListener('input', applyFilters);

document.querySelectorAll('.module-head').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.module-card');
  const isOpen = card.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
  button.querySelector('.module-chevron').textContent = isOpen ? '−' : '＋';
}));

expandAll.addEventListener('click', () => {
  const visibleCards = moduleCards.filter(card => !card.hidden);
  const shouldExpand = visibleCards.some(card => !card.classList.contains('open'));
  visibleCards.forEach(card => {
    card.classList.toggle('open', shouldExpand);
    const button = card.querySelector('.module-head');
    button.setAttribute('aria-expanded', String(shouldExpand));
    button.querySelector('.module-chevron').textContent = shouldExpand ? '−' : '＋';
  });
  expandAll.textContent = shouldExpand ? 'Collapse all −' : 'Expand all +';
});

document.querySelectorAll('.practice-link').forEach(button => button.addEventListener('click', () => {
  dialogTitle.textContent = button.dataset.topic;
  moduleDialog.showModal();
}));
document.getElementById('dialogClose').addEventListener('click', () => moduleDialog.close());
document.getElementById('dialogOk').addEventListener('click', () => moduleDialog.close());
moduleDialog.addEventListener('click', event => {
  if (event.target === moduleDialog) moduleDialog.close();
});
