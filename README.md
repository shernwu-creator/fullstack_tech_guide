# StackAtlas — 全端技術知識庫

以 React + Vite 打造的中英對照全端知識庫。把 50 個常見技術名詞放回脈絡，並針對四種網站型態提供可落地的技術選型、成本與維護評估。

## 功能

- **即時模糊搜尋**：支援中文、英文、縮寫與簡繁／兩岸用語；例如 `SSR`、`grapql`、`状态管理`、`数据库` 都能命中。
- **分類切換**：全部、前端、後端、資料庫、DevOps、架站選型指南。
- **50 個名詞卡片**：中英名稱、一句話定義、白話解釋、適用場景、實務提醒與官方文件連結。
- **4 套選型藍圖**：個人作品集、SEO 內容站、電商交易平台、高互動 SaaS 後台，各自包含推薦技術組合、選型理由、成本／維護評估、常見誤區與最小可上線組合。
- **深／淺色主題**：跟隨系統偏好，可手動切換並以 `localStorage` 記住選擇；首次載入前套用主題，避免閃爍。
- **響應式版面**：桌面三欄、平板兩欄、手機單欄；表格與分類列可水平捲動。
- **鍵盤與無障礙**：`/` 聚焦搜尋、`Esc` 清除，具備 skip link、`aria-live` 結果統計、可見焦點樣式與 reduced-motion 支援。
- **零 UI 框架依賴**：僅使用 React；圖示為 inline SVG，樣式全部是原生 CSS Variables。

## 開始使用

需求：Node.js ≥ 20.19、pnpm。

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # 產出 dist/
pnpm preview    # 預覽 production build
```

## 專案結構

```text
fullstack_tech_guide/
├── index.html                    # 入口、SEO meta、主題預先載入 script
├── vite.config.js                # Vite + React plugin（相對 base，利於靜態部署）
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
    │   ├── GuideLibrary.jsx      # 選型原則、速覽表與指南列表
    │   ├── StackGuideCard.jsx    # 單一網站型態的完整選型分析
    │   ├── GuideCTA.jsx          # 名詞頁導向指南的 CTA
    │   ├── EmptyState.jsx        # 無結果狀態與建議關鍵字
    │   ├── Footer.jsx
    │   ├── HighlightedText.jsx   # 安全地將搜尋命中反白
    │   └── Icons.jsx             # inline SVG 圖示
    ├── data/
    │   ├── glossaryData.js       # 50 個名詞、分類與計數
    │   └── stackMatrixData.js    # 4 種網站型態、選型原則與成本資料
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

## 搜尋設計

1. 先做 token 化的直接子字串比對，依「名稱 → 關鍵字 → 正文」加權排序。
2. 若無直接結果，再以字元子序列做拼字容錯（`grapql` → `GraphQL`）。
3. 搜尋前處理常見簡體字與兩岸用語（`数据库` → `資料庫`、`缓存` → `快取`、`服务器` → `伺服器`）。
4. 所有處理都在 client 端完成，不傳送查詢內容到任何伺服器。

## 內容維護原則

- 外部連結皆以官方文件或權威教學為優先。
- 技術迭代快速，實作前請以最新官方文件與實際版本為準。
- 選型建議是情境化的取捨，不是絕對答案；成本數字為相對量級，實際報價依雲端服務與流量而異。
