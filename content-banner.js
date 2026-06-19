(function () {
  'use strict';

  var BANNER_ID = 'captcha-skipper-banner';

  window.addEventListener('captcha-skipper-triggered', function () {
    if (document.getElementById(BANNER_ID)) return;

    var banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'right:0',
      'z-index:2147483647',
      'background:#1e293b',
      'color:#f1f5f9',
      'font:14px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      'padding:12px 16px',
      'display:flex',
      'align-items:center',
      'gap:12px',
      'box-shadow:0 2px 12px rgba(0,0,0,.4)',
      'border-bottom:2px solid #f97316'
    ].join(';');

    banner.innerHTML = [
      '<span style="font-size:18px">⚠️</span>',
      '<span style="flex:1">這個網站啟用了 CAPTCHA 驗證，若表單送不出去，請關閉插件並重新整理。</span>',
      '<button id="cs-btn-disable" style="',
        'background:#f97316;color:#fff;border:none;border-radius:6px;',
        'padding:7px 14px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap',
      '">關閉插件並重新整理</button>',
      '<button id="cs-btn-close" style="',
        'background:none;border:none;color:#94a3b8;cursor:pointer;font-size:20px;line-height:1;padding:0 4px',
      '">✕</button>'
    ].join('');

    document.documentElement.appendChild(banner);

    document.getElementById('cs-btn-disable').addEventListener('click', function () {
      chrome.runtime.sendMessage({ type: 'set_enabled', enabled: false }, function () {
        window.location.reload();
      });
    });

    document.getElementById('cs-btn-close').addEventListener('click', function () {
      banner.remove();
    });
  });
})();
