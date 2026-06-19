chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ enabled: true });
});

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.type !== 'set_enabled') return;

  if (msg.enabled) {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ['captcha_block']
    });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ['captcha_block']
    });
  }
});
