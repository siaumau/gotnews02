# 🔍 AI 新聞資料抓取與呈現系統 (Vue 3 版本)

基於 Vue 3 + TypeScript 的 AI 新聞聚合與英語學習系統，提供 Flipboard 風格的卡片式介面。

## ✨ 功能特色

- 📱 **現代化 Vue 3 架構** - 使用 Composition API + TypeScript
- 🔄 **智能新聞抓取** - 透過 NewsAPI 獲取最新 AI 相關新聞
- ⭐ **文章管理** - 收藏、刪除、篩選功能
- 📚 **AI 英語學習** - 智能翻譯、對話練習、生字管理
- 💬 **對話練習模式** - 將新聞轉換為雙人對話
- 📖 **生字簿系統** - 個人化單字學習管理
- 🗂️ **狀態管理** - 使用 Pinia 進行狀態管理
- 📱 **響應式設計** - 支援桌面與行動裝置
- 🔊 **語音朗讀** - 支援文字轉語音功能

## 🛠️ 技術棧

### 前端
- **Vue 3** - 漸進式 JavaScript 框架
- **TypeScript** - 型別安全的 JavaScript
- **Vite** - 快速的建構工具
- **Pinia** - Vue 的狀態管理庫
- **Vue Router** - 路由管理
- **Axios** - HTTP 客戶端

### 後端 (需要 gotnews 後端服務)
- **Flask** - Python Web 框架
- **SQLite** - 輕量級資料庫
- **NewsAPI** - 新聞資料來源
- **OpenRouter API** - AI 翻譯服務

## 📦 安裝與設定

### 前置需求
- Node.js 18+ 
- Python 3.8+ (後端服務)
- NewsAPI 金鑰
- OpenRouter API 金鑰 (選填，用於翻譯功能)

### 安裝步驟

1. **安裝前端依賴**
   ```bash
   cd gotnews02
   npm install
   ```

2. **啟動後端服務** (在 gotnews 資料夾)
   ```bash
   cd ../gotnews
   python app.py
   ```

3. **啟動前端開發服務器**
   ```bash
   cd ../gotnews02
   npm run dev
   ```

4. **訪問應用**
   - 前端：http://localhost:5173
   - 後端 API：http://localhost:5000

## 🚀 使用方式

### 首次設定
1. 首次開啟會顯示 API 金鑰設定畫面
2. 輸入 NewsAPI 金鑰 (必填)
3. 輸入 OpenRouter API 金鑰 (選填，用於翻譯功能)

### 主要功能

#### 📰 新聞管理
- **更新新聞** - 點擊「🔄 更新新聞」抓取最新文章
- **篩選顯示** - 切換「所有新聞」或「我的收藏」
- **文章操作** - 收藏 ⭐、學習 📚、刪除 🗑️

#### 📚 英語學習
- **智能翻譯** - 點擊文章上的「📚」按鈕開始學習
- **內容包含**：
  - 中英文對照翻譯
  - 雙人對話練習
  - A1-C1 等級重點單字
  - 簡化英文版本
- **語音朗讀** - 點擊 🔊 圖示聽發音

#### 📖 生字簿管理
- **個人生字簿** - 點擊「📚 生字簿」管理學習單字
- **單字操作**：
  - 搜尋過濾
  - 按等級篩選
  - 語音發音
  - 學習統計

### 🔧 設定管理
- **API 金鑰** - 點擊「⚙️ 設定」管理 API 金鑰
- **翻譯快取** - 點擊「🗑️ 清除翻譯」清理快取
- **安全性** - 所有金鑰儲存在瀏覽器本地

## 📁 專案結構

```
gotnews02/
├── src/
│   ├── components/          # Vue 組件
│   │   ├── AppHeader.vue
│   │   ├── NavControls.vue
│   │   ├── ArticlesGrid.vue
│   │   ├── ArticleCard.vue
│   │   ├── LearningModal.vue
│   │   ├── SettingsModal.vue
│   │   ├── FirstSetupModal.vue
│   │   ├── VocabularyGrid.vue
│   │   └── VocabularyCard.vue
│   ├── stores/              # Pinia 狀態管理
│   │   ├── api.ts          # API 金鑰管理
│   │   ├── news.ts         # 新聞與翻譯
│   │   ├── ui.ts           # UI 狀態
│   │   └── vocabulary.ts   # 生字簿管理
│   ├── views/              # 頁面視圖
│   │   ├── HomeView.vue    # 主頁
│   │   └── VocabularyView.vue # 生字簿頁面
│   ├── router/             # 路由配置
│   └── App.vue            # 根組件
├── package.json
├── vite.config.ts         # Vite 配置
└── README.md
```

## 🔗 API 端點

所有 API 請求會代理到後端服務 (http://localhost:5000)：

- `GET /api/articles` - 獲取文章列表
- `POST /api/update` - 更新新聞
- `POST /api/articles/:id/favorite` - 切換收藏狀態
- `DELETE /api/articles/:id` - 刪除文章
- `GET /api/articles/:id/translation-check` - 檢查翻譯快取
- `POST /api/articles/:id/translate` - 翻譯文章
- `GET /api/vocabulary` - 獲取生字簿
- `POST /api/vocabulary` - 新增單字
- `DELETE /api/vocabulary/:id` - 刪除單字

## 🚀 構建與部署

### 開發環境
```bash
npm run dev
```

### 生產構建
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

### 程式碼檢查
```bash
npm run lint
```

### 型別檢查
```bash
npm run type-check
```

## 🌟 主要改進 (相比原版)

### 技術架構
- ✅ **Vue 3 Composition API** - 更好的邏輯復用和型別推導
- ✅ **TypeScript 支援** - 型別安全，減少運行時錯誤
- ✅ **Pinia 狀態管理** - 模組化的狀態管理
- ✅ **組件化架構** - 更好的代碼組織和復用

### 用戶體驗
- ✅ **現代化 UI** - 更流暢的動畫和交互
- ✅ **響應式設計** - 完美適配各種設備
- ✅ **性能優化** - 按需載入和快取機制
- ✅ **錯誤處理** - 更好的錯誤提示和恢復

### 開發體驗
- ✅ **熱重載** - 快速開發迭代
- ✅ **型別檢查** - 編譯時錯誤檢測
- ✅ **代碼分割** - 優化載入性能
- ✅ **現代化工具鏈** - Vite + ESLint + TypeScript

## 📝 API 金鑰申請

### NewsAPI
1. 訪問 [NewsAPI](https://newsapi.org)
2. 註冊免費帳號
3. 獲取 API 金鑰 (免費版每日 1,000 次請求)

### OpenRouter
1. 訪問 [OpenRouter](https://openrouter.ai)
2. 註冊帳號
3. 獲取 API 金鑰 (按使用量付費)

## 🤝 貢獻

歡迎提出問題和建議！

## 📄 授權

此專案使用 MIT 授權條款。
