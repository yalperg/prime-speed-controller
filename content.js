(function() {
  const speedOptions = [
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '1.5x', value: 1.5 },
    { label: '2x', value: 2 }
  ];

  const originalPlaybackRate = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'playbackRate');

  Object.defineProperty(HTMLMediaElement.prototype, 'playbackRate', {
    set: function(speed) {
      originalPlaybackRate.set.call(this, speed);
      const event = new Event('ratechange');
      this.dispatchEvent(event);
    },
    get: function() {
      return originalPlaybackRate.get.call(this);
    }
  });

  function setPlaybackRate(speed) {
    const videos = document.querySelectorAll('video');
    if (videos) {
      videos.forEach((video, index) => {
        video.playbackRate = speed;
      });
    } else {
    }
  }

  function createSpeedControl() {
    const speedControl = document.createElement('div');
    speedControl.className = 'fewcsle fcmecz0';
    speedControl.innerHTML = `
      <div class="f1qd5172 f7mv6lt">
        <span>
          <div class="fewcsle fcmecz0">
            <div class="fqye4e3 f1ly7q5u fk9c3ap fz9ydgy f1xrlb00 f1hy0e6n fgbpje3 f1uteees f1h2a8xb f760yrh f1mic5r1 f13ipev8 atvwebplayersdk-speedcontrol-button f1a9wsg7 f15v4vpu frcngjs f12ossvl f45h" aria-label="Playback Speed" style="padding: 0px; min-width: 0px;">
              <div class="f45h">
                <img class="fuorrko" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIxMyAxNyAxOCAxMiAxMyA3Ij48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9IjYgMTcgMTEgMTIgNiA3Ij48L3BvbHlsaW5lPjwvc3ZnPg==" alt="Hız">
              </div>
            </div>
            <div class="f1wp6x33">
              <div class="fhjv49j f1svrrcm f1tep9b4 fqlubke">Playback Speed</div>
            </div>
          </div>
        </span>
      </div>
    `;

    const speedMenu = document.createElement('div');
    speedMenu.className = 'f1mgyl9u f1kgbam0';
    speedMenu.innerHTML = `
      <div>
        <div class="fq40py8" style="margin-left: 50%; margin-right: auto; display: none; top: 0px;">
          <div class="f1h19n93 fl0ztaa f12c980i tooltip">
            <div class="f28nw8n fscgtd2 fsc5qjh f12c980i f1jmqpjd f1jtm5hu fv0eje7" style="left: 50%; transform: translateX(-50%);"></div>
            <div class="f1hoalfx f1na3q09">
              <div class="f1f1ygnm">
                <div class="f179par0 fsp955f f1ani1ax ftmvva6 atvwebplayersdk-speedcontrol-container">
                  <h2 class="fhpnewt f1ly7q5u" tabindex="0">Playback Speed</h2>
                  <div class="f1mgyl9u f17kbju9 fcmecz0 f1gt7bxi">
                    <div class="f1dqudmj">
                      ${speedOptions.map(option => `
                        <div class="f15n26ui f1yahgwu fk7dnjf atvwebplayersdk-speedoption-container f11d1lkh">
                          <input type="checkbox" aria-label="${option.label}" style="opacity: 0; position: absolute; bottom: 8px;">
                          <div class="f1i37wl0 f6aowa3 f1txmk7m f12afzei f1wzj1ki f1y75yoj fb62a6i"></div>
                          <label class="f1l62hc4 f1ly7q5u f1o6anob f1v99b2e f1m37uyw f1hxvvt7 f164wq86 fiqc9rt atvwebplayersdk-speedoption-text">${option.label}</label>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    speedControl.appendChild(speedMenu);

    speedControl.querySelector('.atvwebplayersdk-speedcontrol-button').addEventListener('click', function() {
      const menuContent = speedMenu.querySelector('.fq40py8');
      menuContent.style.display = menuContent.style.display === 'none' ? 'block' : 'none';
    });

    speedMenu.querySelectorAll('.atvwebplayersdk-speedoption-container').forEach((option, index) => {
      option.addEventListener('click', function() {
        const speed = speedOptions[index].value;
        setPlaybackRate(speed);
        
        speedMenu.querySelectorAll('.atvwebplayersdk-speedoption-container').forEach(opt => {
          opt.querySelector('div').classList.remove('f1bhki25');
          opt.querySelector('label').classList.remove('f1f4ffwn');
        });
        this.querySelector('div').classList.add('f1bhki25');
        this.querySelector('label').classList.add('f1f4ffwn');
      });
    });

    return speedControl;
  }

  function addSpeedControl(container) {
    if (container && container.firstChild && !container.querySelector('.atvwebplayersdk-speedcontrol-button')) {
      container.firstChild.appendChild(createSpeedControl());
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.type === 'childList') {
        const container = document.querySelector('.atvwebplayersdk-hideabletopbuttons-container');
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
    subtree: true
  });
})();