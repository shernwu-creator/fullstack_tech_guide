# StackAtlas — 全端技術知識庫

以 React + Vite 打造的中英對照全端知識庫。收錄 50 個技術名詞、15 個開發工具與 4 套網站型態的選型藍圖，把技術選擇放回成本、維護與團隊的脈絡。

## 功能

- **即時模糊搜尋**：支援中文、英文、縮寫與簡繁／兩岸用語；例如 `SSR`、`grapql`、`状态管理`、`数据库` 都能命中。
- **分類切換**：全部、前端、後端、資料庫、DevOps、開發工具、架站選型指南。
- **50 個名詞卡片**：中英名稱、一句話定義、白話解釋、適用場景、實務提醒與官方文件連結。
- **15 個開發工具目錄**：AI 程式碼編輯器、後端服務與 API、前端測試框架、架構圖與視覺化、雲端部署與 DevOps 五類；桌面版提供 sticky 分類側邊欄，手機版改為雙欄分類按鈕。工具卡沿用名詞卡的版面、Hover 與分類色票。
- **4 套選型藍圖**：個人作品集、SEO 內容站、電商交易平台、高互動 SaaS 後台，各自包含推薦技術組合、選型理由、成本／維護評估、常見誤區與最小可上線組合。
- **深／淺色主題**：跟隨系統偏好，可手動切換並以 `localStorage` 記住選擇；首次載入前套用主題，避免閃爍。
- **響應式版面**：桌面三欄／工具目錄兩欄、平板兩欄、手機單欄；工具側邊欄在較小螢幕自動改為分類按鈕，表格與分類列可水平捲動。
- **鍵盤與無障礙**：`/` 聚焦搜尋、`Esc` 清除，具備 skip link、`aria-live` 結果統計、可見焦點樣式與 reduced-motion 支援。
- **零 UI 框架依賴**：僅使用 React；圖示為 inline SVG，樣式全部是原生 CSS Variables。

## 開始使用

需求：Node.js ≥ 20.19、pnpm。

```bash
pnpm install
pnpm dev        # http://localhost:5173/fullstack_tech_guide/
pnpm build      # 產出 dist/
pnpm preview    # 預覽 production build
```

## 部署

推送到 `main` 分支會觸發 GitHub Actions（`.github/workflows/deploy.yml`），完成建置後自動部署到 GitHub Pages：

<https://shernwu-creator.github.io/fullstack_tech_guide/>

## 專案結構

```text
fullstack_tech_guide/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages 自動部署
├── index.html                    # 入口、SEO meta、主題預先載入 script
├── vite.config.js                # Vite + React plugin（/fullstack_tech_guide/ base）
├── package.json
├── pnpm-lock.yaml
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  # React 入口
    ├── App.jsx                   # 篩選、搜尋、檢視切換與版面組合
    ├── components/
    │   ├── Header.jsx            # 品牌、全域搜尋、主題切換
    │   ├── Hero.jsx              # 首屏與知識索引
    │   ├── FilterBar.jsx         # 分類切換
    │   ├── GlossaryCard.jsx      # 名詞卡片
    │   ├── ToolCard.jsx          # 開發工具卡片（沿用名詞卡樣式）
    │   ├── ToolkitLibrary.jsx    # 工具分類分組與卡片網格
    │   ├── ToolkitSidebar.jsx    # sticky 工具分類側邊欄
    │   ├── GuideLibrary.jsx      # 選型原則、速覽表與指南列表
    │   ├── StackGuideCard.jsx    # 單一網站型態的完整選型分析
    │   ├── GuideCTA.jsx          # 名詞頁導向指南的 CTA
    │   ├── EmptyState.jsx        # 無結果狀態與建議關鍵字
    │   ├── Footer.jsx
    │   ├── HighlightedText.jsx   # 安全地將搜尋命中反白
    │   └── Icons.jsx             # inline SVG 圖示
    ├── data/
    │   ├── glossaryData.js       # 50 個名詞、分類與計數
    │   ├── stackMatrixData.js    # 4 種網站型態、選型原則與成本資料
    │   └── toolkitData.js        # 5 類、15 個開發工具與官方連結
    ├── hooks/
    │   └── useTheme.js           # 主題狀態與持久化
    ├── styles/
    │   ├── tokens.css            # 色彩、字體、間距與主題變數
    │   ├── base.css              # reset、共用元素與動畫
    │   └── app.css               # 各區塊版面與響應式規則
    └── utils/
        ├── search.js             # 中英文模糊搜尋、簡繁正規化、反白
        └── format.js             # 編號與等級文字
```

## 資料格式

名詞資料位於 [`src/data/glossaryData.js`](src/data/glossaryData.js)，新增一筆資料的格式：

```js
{
  id: 'example',
  category: 'frontend', // frontend | backend | database | devops
  zh: '中文名稱',
  en: 'English Name',
  abbr: 'EN',           // 可省略
  summary: '一句話定義',
  plain: '白話解釋',
  practice: '實務提醒或常見誤區',
  useCases: ['適用場景一', '適用場景二'],
  keywords: ['搜尋用別名', 'English alias'],
  docs: [{ label: '官方文件', url: 'https://…' }],
}
```

選型指南位於 [`src/data/stackMatrixData.js`](src/data/stackMatrixData.js)，成本分數為 1–5；分數越高代表建置／維護成本或擴充能力越高。

開發工具資料位於 [`src/data/toolkitData.js`](src/data/toolkitData.js)，分類與工具皆為獨立資料：

```js
// 工具分類
{
  id: 'ai-assistants',
  index: '01',
  label: 'AI 程式碼編輯器',
  en: 'AI Coding Assistants',
  description: '分類說明',
  tone: 'database', // 沿用既有 cat-database 色票
}

// 工具
{
  id: 'cursor',
  category: 'ai-assistants',
  name: 'Cursor',
  en: 'AI Code Editor',
  summary: '一句話定位',
  plain: '繁體中文簡介',
  useCases: ['適合情境一', '適合情境二'],
  practice: '選用建議',
  keywords: ['AI IDE', '程式碼編輯器'],
  url: 'https://cursor.sh/',
}
```

## 搜尋設計

1. 先做 token 化的直接子字串比對，依「名稱 → 關鍵字 → 正文」加權排序；名詞與工具目錄各自使用同一套搜尋策略。
2. 若無直接結果，再以字元子序列做拼字容錯（`grapql` → `GraphQL`）。
3. 搜尋前處理常見簡體字與兩岸用語（`数据库` → `資料庫`、`缓存` → `快取`、`服务器` → `伺服器`）。
4. 開發工具目錄支援以工具名稱、分類與簡介搜尋；側邊欄可再依五個分類縮小範圍。
5. 所有處理都在 client 端完成，不傳送查詢內容到任何伺服器。

## 內容維護原則

- 名詞外部連結以官方文件或權威教學為優先；工具連結以各專案官方網站為準。
- 技術迭代快速，實作前請以最新官方文件與實際版本為準。
- 選型建議是情境化的取捨，不是絕對答案；成本數字為相對量級，實際報價依雲端服務與流量而異。
