const SPEED_OPTIONS = [
  { label: '0.5x', value: 0.5 },
  { label: '1x', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2 },
];

const SPEED_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIxMyAxNyAxOCAxMiAxMyA3Ij48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9IjYgMTcgMTEgMTIgNiA3Ij48L3BvbHlsaW5lPjwvc3ZnPg==';

const SPEED_CONTROL_BUTTON_CLASS = 'atvwebplayersdk-speedcontrol-button';
const SPEED_OPTION_CONTAINER_CLASS = 'atvwebplayersdk-speedoption-container';
const SPEED_MENU_CLASS = 'fq40py8';
const HIDEABLETOPBUTTONS_CONTAINER_CLASS = 'atvwebplayersdk-hideabletopbuttons-container';

function setPlaybackRate(speed) {
  document.querySelectorAll('video').forEach(video => {
    video.playbackRate = speed;
  });
}

function createSpeedControlHTML() {
  return `
    <div class="f1qd5172 f7mv6lt">
      <span>
        <div class="fewcsle fcmecz0">
          <div class="fqye4e3 f1ly7q5u fk9c3ap fz9ydgy f1xrlb00 f1hy0e6n fgbpje3 f1uteees f1h2a8xb f760yrh f1mic5r1 f13ipev8 ${SPEED_CONTROL_BUTTON_CLASS} f1a9wsg7 f15v4vpu frcngjs f12ossvl f45h" aria-label="Playback Speed" style="padding: 0px; min-width: 0px;">
            <div class="f45h">
              <img class="fuorrko" src="${SPEED_ICON}" alt="Speed">
            </div>
          </div>
          <div class="f1wp6x33">
            <div class="fhjv49j f1svrrcm f1tep9b4 fqlubke">Playback Speed</div>
          </div>
        </div>
      </span>
    </div>
  `;
}

function createSpeedMenuHTML() {
  return `
    <div>
      <div class="${SPEED_MENU_CLASS}" style="margin-left: 50%; margin-right: auto; display: none; top: 0px;">
        <div class="f1h19n93 fl0ztaa f12c980i tooltip">
          <div class="f28nw8n fscgtd2 fsc5qjh f12c980i f1jmqpjd f1jtm5hu fv0eje7" style="left: 50%; transform: translateX(-50%);"></div>
          <div class="f1hoalfx f1na3q09">
            <div class="f1f1ygnm">
              <div class="f179par0 fsp955f f1ani1ax ftmvva6 atvwebplayersdk-speedcontrol-container">
                <h2 class="fhpnewt f1ly7q5u" tabindex="0">Playback Speed</h2>
                <div class="f1mgyl9u f17kbju9 fcmecz0">
                  <div class="f1dqudmj">
                    ${SPEED_OPTIONS.map(createSpeedOptionHTML).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createSpeedOptionHTML(option) {
  return `
    <div class="f15n26ui f1yahgwu fk7dnjf ${SPEED_OPTION_CONTAINER_CLASS} f11d1lkh">
      <input type="radio" aria-label="${option.label}" style="opacity: 0; position: absolute; bottom: 8px;">
      <div class="f1i37wl0 f6aowa3 f1txmk7m f12afzei f1wzj1ki f1y75yoj fb62a6i"></div>
      <label class="f1l62hc4 f1ly7q5u f1o6anob f1v99b2e f1m37uyw f1hxvvt7 f164wq86 fiqc9rt atvwebplayersdk-speedoption-text">${option.label}</label>
    </div>
  `;
}

function createSpeedControl() {
  const speedControl = document.createElement('div');
  speedControl.className = 'fewcsle fcmecz0';
  speedControl.innerHTML = createSpeedControlHTML();

  const speedMenu = document.createElement('div');
  speedMenu.className = 'f1mgyl9u f1kgbam0';
  speedMenu.innerHTML = createSpeedMenuHTML();

  speedControl.appendChild(speedMenu);

  const speedButton = speedControl.querySelector(`.${SPEED_CONTROL_BUTTON_CLASS}`);
  const menuContent = speedMenu.querySelector(`.${SPEED_MENU_CLASS}`);

  setupEventListeners(speedButton, menuContent, speedMenu);

  return speedControl;
}

function setupEventListeners(speedButton, menuContent, speedMenu) {
  speedButton.addEventListener('click', (e) => toggleSpeedMenu(e, menuContent));

  speedMenu.querySelectorAll(`.${SPEED_OPTION_CONTAINER_CLASS}`).forEach((option, index) => {
    option.addEventListener('click', (e) => handleSpeedOptionClick(e, option, index));
  });

  updateSpeedMenuVisual(speedMenu.querySelectorAll(`.${SPEED_OPTION_CONTAINER_CLASS}`)[1]);

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

function handleSpeedOptionClick(e, option, index) {
  e.stopPropagation();
  const speed = SPEED_OPTIONS[index].value;
  setPlaybackRate(speed);
  updateSpeedMenuVisual(option);
}

function updateSpeedMenuVisual(selectedOption) {
  const speedMenu = selectedOption.closest('.f1mgyl9u.f1kgbam0');
  if (speedMenu) {
    speedMenu.querySelectorAll(`.${SPEED_OPTION_CONTAINER_CLASS}`).forEach(opt => {
      const div = opt.querySelector('div');
      const label = opt.querySelector('label');
      div.classList.toggle('f1bhki25', opt === selectedOption);
      label.classList.toggle('f1f4ffwn', opt === selectedOption);
    });
  }
}

function addSpeedControl(container) {
  if (container && container.firstChild && !container.querySelector(`.${SPEED_CONTROL_BUTTON_CLASS}`)) {
    container.firstChild.appendChild(createSpeedControl());
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

chrome.runtime.onMessage.addListener(function(request) {
  console.log('request', request);
  if (request && request.type === 'navigate-detail') {
    addSpeedControl();
  }
});