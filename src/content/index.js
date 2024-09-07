const SPEED_OPTIONS = [
  { label: '0.5x', value: 0.5 },
  { label: '1x', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2 },
];

const CHECK_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxOSAxNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UmVjdGFuZ2xlIDUwICsgUmVjdGFuZ2xlIDUwIENvcHk8L3RpdGxlPjxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIuMTIxIDZsNi4zNjQgNi4zNjQtMi4xMjEgMi4xMjJMMCA4LjEyMnoiLz48cGF0aCBkPSJNMTguNzI4IDIuMTIxTDcuMTIgMTMuNzI4IDUgMTEuNjA3IDE2LjYwNyAwbDIuMTIgMi4xMjF6Ii8+PC9nPjwvc3ZnPg==';
const SPEED_CONTROL_BUTTON_CLASS = 'atvwebplayersdk-speedcontrol-button';
const SPEED_MENU_CLASS = 'fq40py8';
const HIDEABLETOPBUTTONS_CONTAINER_CLASS = 'atvwebplayersdk-hideabletopbuttons-container';

function setPlaybackRate(speed) {
  document.querySelectorAll('video').forEach(video => {
    video.playbackRate = speed;
  });
}

function createSpeedControlHTML() {
  return `
    <button class="speed-control-button" aria-label="Playback Speed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-double-right speed-control-icon" viewBox="0 0 16 16">
        <path fill="currentColor" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
        <path fill="currentColor" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
      </svg>
      <span class="speed-control-tooltip">Playback Speed</span>
    </button>
  `;
}

function createSpeedMenuHTML() {
  return `
    <div class="speed-menu">
      <h2 class="speed-menu-title">Playback Speed</h2>
      ${SPEED_OPTIONS.map(createSpeedOptionHTML).join('')}
    </div>
  `;
}

function createSpeedOptionHTML(option) {
  return `
    <div class="speed-option">
      <input type="radio" id="speed-${option.value}" name="speed" value="${option.value}" class="speed-option-radio">
      <span class="speed-option-checkmark">
        <img src="${CHECK_ICON}" alt="Check Icon" />
      </span>
      <label for="speed-${option.value}" class="speed-option-label">${option.label}</label>
    </div>
  `;
}

function createSpeedControl() {
  const speedControl = document.createElement('div');
  speedControl.className = 'speed-control';
  speedControl.innerHTML = createSpeedControlHTML();

  const speedMenu = document.createElement('div');
  speedMenu.innerHTML = createSpeedMenuHTML();

  speedControl.appendChild(speedMenu);

  const speedButton = speedControl.querySelector('.speed-control-button');
  const menuContent = speedControl.querySelector('.speed-menu');

  setupEventListeners(speedButton, menuContent, speedControl);

  return speedControl;
}

function setupEventListeners(speedButton, menuContent, speedControl) {
  speedButton.addEventListener('click', (e) => toggleSpeedMenu(e, menuContent));

  speedControl.querySelectorAll('.speed-option').forEach((option) => {
    option.addEventListener('click', (e) => handleSpeedOptionClick(e, option));
  });

  updateSpeedMenuVisual(speedControl.querySelector('input[value="1"]'));

  document.addEventListener('click', () => {
    menuContent.style.display = 'none';
  });
}

function toggleSpeedMenu(e, menuContent) {
  e.stopPropagation();
  closeOtherMenus(menuContent);
  menuContent.style.display = menuContent.style.display === 'none' ? 'block' : 'none';
}

function closeOtherMenus(currentMenu) {
  document.querySelectorAll(`.${SPEED_MENU_CLASS}`).forEach(menu => {
    if (menu !== currentMenu) {
      menu.style.display = 'none';
    }
  });
}

function handleSpeedOptionClick(e, option) {
  e.stopPropagation();
  const speed = parseFloat(option.querySelector('input').value);
  setPlaybackRate(speed);
  updateSpeedMenuVisual(option.querySelector('input'));
}

function updateSpeedMenuVisual(selectedInput) {
  selectedInput.checked = true;
}

function addSpeedControl(container) {
  if (container && container.firstChild && !container.querySelector(`.${SPEED_CONTROL_BUTTON_CLASS}`)) {
    container.firstChild.prepend(createSpeedControl());
  }
}

const observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      const container = document.querySelector(`.${HIDEABLETOPBUTTONS_CONTAINER_CLASS}`);
      if (container) {
        addSpeedControl(container);
        observer.disconnect();
        break;
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});