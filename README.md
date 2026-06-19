# CAPTCHA 封鎖器

Chrome 擴充插件，在網路層封鎖 reCAPTCHA 和 hCaptcha 腳本，讓驗證框完全不出現。

## 支援範圍

| CAPTCHA 類型 | 狀態 |
|---|---|
| Google reCAPTCHA v2／v3 | ✅ 封鎖 |
| hCaptcha | ✅ 封鎖 |
| Cloudflare Turnstile | ➡️ 放行（本身即為隱形模式，封鎖反而壞事） |

## 運作原理

一般攔截 CAPTCHA 的做法是「等它出現再自動點擊」，這個插件不一樣：

```
瀏覽器準備下載 reCAPTCHA JS
        ↓
declarativeNetRequest 在網路層直接 BLOCK（腳本永不下載）
        ↓
shim.js 注入假的 grecaptcha / hcaptcha API
        ↓
驗證框完全不出現，網頁呼叫驗證 API 時自動拿到 fake token
```

因此在 DevTools → Network 搜尋 `recaptcha` 會查不到任何紀錄，代表封鎖成功。

## 安裝

> 需要 Chrome 瀏覽器

**步驟一：下載**

點右上角綠色 `Code` 按鈕 → `Download ZIP`，解壓縮到任意位置。

**步驟二：開啟開發人員模式**

Chrome 網址列輸入：
```
chrome://extensions
```
右上角將「**開發人員模式**」切換為開啟。

**步驟三：載入插件**

點「**載入未封裝項目**」→ 選擇剛才解壓縮的 `captcha-skipper` 資料夾。

插件出現在列表中即安裝完成。

## 測試

開啟 Google 官方 reCAPTCHA 測試頁：

```
https://www.google.com/recaptcha/api2/demo
```

「我不是機器人」的框不出現 → 插件正常運作。

## 開關

點 Chrome 右上角的插件圖示可以即時開啟或關閉封鎖。

遇到特定網站表單送不出去時，關掉插件、重新整理即可恢復正常。

## 注意事項

- 若網站後端會向 Google 驗證 CAPTCHA token（大多數嚴格的表單），fake token 會被拒絕，表單送出失敗。關掉插件可解決。
- 不會導致帳號被封鎖，插件沒有對任何服務發出攻擊行為。
- 進入 Cloudflare 保護的網站不受影響（Turnstile 放行）。
