var toggle = document.getElementById('toggle');
var status = document.getElementById('status');

chrome.storage.local.get({ enabled: true }, function (data) {
  toggle.checked = data.enabled;
  render(data.enabled);
});

toggle.addEventListener('change', function () {
  var enabled = toggle.checked;
  chrome.storage.local.set({ enabled: enabled });
  chrome.runtime.sendMessage({ type: 'set_enabled', enabled: enabled });
  render(enabled);
});

function render(enabled) {
  if (enabled) {
    status.innerHTML =
      '<span class="badge">封鎖中</span>reCAPTCHA、hCaptcha、Turnstile<br>腳本已於網路層封鎖';
  } else {
    status.innerHTML =
      '<span class="badge off">已停用</span>CAPTCHA 正常顯示';
  }
}
