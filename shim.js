// 在頁面任何腳本載入前注入假 API
// 讓呼叫 grecaptcha/hcaptcha 的網頁不會因找不到函式而出錯
(function () {
  'use strict';

  var FAKE_TOKEN = 'captcha-skipped';

  function noop() {}

  function fakeRender(el, params) {
    if (params && typeof params.callback === 'function') {
      setTimeout(function () { params.callback(FAKE_TOKEN); }, 30);
    }
    return 0;
  }

  var recaptchaAPI = {
    ready:       function (cb) { cb && setTimeout(cb, 0); },
    execute:     function () { return Promise.resolve(FAKE_TOKEN); },
    render:      fakeRender,
    reset:       noop,
    getResponse: function () { return FAKE_TOKEN; }
  };

  // reCAPTCHA v2 / v3 (含 enterprise 變體)
  window.grecaptcha = Object.assign({}, recaptchaAPI, {
    enterprise: recaptchaAPI
  });

  // hCaptcha
  window.hcaptcha = {
    ready:       function (cb) { cb && setTimeout(cb, 0); },
    execute:     function () { return Promise.resolve({ response: FAKE_TOKEN }); },
    render:      fakeRender,
    reset:       noop,
    getResponse: function () { return FAKE_TOKEN; }
  };


})();
