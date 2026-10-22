/**
 * 全端技術名詞資料
 * ------------------------------------------------------------------
 * 每個名詞固定包含：
 *  - zh / en / abbr：中英文名稱
 *  - summary：一句話定義
 *  - plain：白話解釋
 *  - practice：實務提醒（選型或踩坑重點）
 *  - useCases：適用場景
 *  - keywords：搜尋用的中英關鍵字（含常見別名）
 *  - docs：官方文件或權威教學連結
 */

export const CATEGORIES = [
  { id: 'all', label: '全部', en: 'Everything' },
  { id: 'frontend', label: '前端', en: 'Frontend' },
  { id: 'backend', label: '後端', en: 'Backend & API' },
  { id: 'database', label: '資料庫', en: 'Database' },
  { id: 'devops', label: 'DevOps', en: 'DevOps & Delivery' },
  { id: 'tools', label: '開發工具', en: 'Dev Toolkit' },
  { id: 'guide', label: '架站選型指南', en: 'Tech Stack Guide' },
]

export const CATEGORY_META = {
  frontend: {
    index: '01',
    label: '前端',
    en: 'Frontend',
    description: '渲染策略、狀態管理與使用者互動的基礎建設。',
  },
  backend: {
    index: '02',
    label: '後端',
    en: 'Backend & API',
    description: 'API 設計、身分驗證與服務之間的協作方式。',
  },
  database: {
    index: '03',
    label: '資料庫',
    en: 'Database',
    description: '資料模型、交易、快取與規模化取捨。',
  },
  devops: {
    index: '04',
    label: '維運部署',
    en: 'DevOps',
    description: '從容器、CI/CD 到部署與可觀測性的交付流程。',
  },
}

export const GLOSSARY = [
  // ── 前端 Frontend ──────────────────────────────────────────────
  {
    id: 'spa',
    category: 'frontend',
    zh: '單頁應用程式',
    en: 'Single Page Application',
    abbr: 'SPA',
    summary: '首次載入後由前端路由接手，切換畫面不再整頁重新載入。',
    plain:
      'SPA 不是「只有一頁」的網站，而是把路由與畫面渲染交給瀏覽器。首次載入取得 HTML、CSS 與 JS 後，切換頁面只抓取資料並替換元件，因此互動流暢、前後端界線清楚；代價是首屏與 SEO 需要額外處理，JS bundle 也容易失控。',
    practice:
      '內容型網站別預設做成 SPA。需要 SEO 時優先考慮 SSR / SSG，或至少補上預渲染與 meta 管理。',
    useCases: ['登入後使用的產品介面', '需要即時互動的後台', 'PWA 與離線體驗'],
    keywords: ['前端路由', 'client-side routing', 'CSR', 'React Router', '單頁應用'],
    docs: [
      {
        label: 'MDN：SPA 詞彙解釋',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/SPA',
      },
    ],
  },
  {
    id: 'ssr',
    category: 'frontend',
    zh: '伺服器端渲染',
    en: 'Server-Side Rendering',
    abbr: 'SSR',
    summary: '每次請求由伺服器先輸出完整 HTML，再由瀏覽器接手互動。',
    plain:
      'SSR 讓使用者在 JS 下載完成前就看到內容，對首屏 LCP 與社群預覽有幫助；伺服器也能依登入狀態輸出個人化 HTML。但每次請求都牽涉伺服器運算與資料存取，需處理快取、延遲與 hydration 不一致，並不是效能萬靈丹。',
    practice:
      '只為了解決 SEO 而全站 SSR 通常不划算。先分辨哪些頁面需要即時資料、哪些可以靜態產生或增量更新。',
    useCases: ['個人化首頁', '即時庫存的商品頁', '兼顧 SEO 與首屏速度的內容網站'],
    keywords: ['server-side rendering', '伺服器渲染', 'Next.js', '首屏', '動態渲染'],
    docs: [
      {
        label: 'web.dev：Rendering on the Web',
        url: 'https://web.dev/articles/rendering-on-the-web#server-side-rendering',
      },
    ],
  },
  {
    id: 'ssg',
    category: 'frontend',
    zh: '靜態網站生成',
    en: 'Static Site Generation',
    abbr: 'SSG',
    summary: '在建置期先把頁面產生為靜態 HTML，部署後由 CDN 直接送出。',
    plain:
      'SSG 將渲染成本移到 build time，請求時幾乎只做檔案傳輸，因此速度、穩定性與成本都很優秀。內容更新需要重新建置，或用 ISR / on-demand revalidation 補足；適合變動頻率低、但讀者很多的頁面。',
    practice:
      '頁面數量破萬後要留意建置時間與增量產生策略。把「內容」與「版面」分離，才能安全且快速地重複建置。',
    useCases: ['部落格與技術文件', '行銷活動頁', '作品集與產品介紹'],
    keywords: ['static site generation', '靜態網站生成', 'pre-render', 'SSG', 'ISR'],
    docs: [
      {
        label: 'web.dev：靜態渲染指南',
        url: 'https://web.dev/articles/rendering-on-the-web#static-rendering',
      },
    ],
  },
  {
    id: 'csr',
    category: 'frontend',
    zh: '客戶端渲染',
    en: 'Client-Side Rendering',
    abbr: 'CSR',
    summary: '瀏覽器下載 JS 後才取得資料並生成畫面。',
    plain:
      'CSR 把渲染責任幾乎都放在瀏覽器，伺服器只提供空殼與 API。開發模式單純、部署容易，也適合高度互動的應用；但首屏容易出現空白，SEO 與低階裝置體驗較弱，資料請求瀑布也會拖慢感受。',
    practice:
      'CSR 不是錯，重點是別讓登陸頁依賴它。用路由層級的 code splitting、骨架畫面與關鍵資料預取降低空白期。',
    useCases: ['內部管理系統', '登入後的 SaaS 工作區', '不需搜尋引擎索引的工具'],
    keywords: ['client-side rendering', '客戶端渲染', '前後端分離', 'SPA', '前端渲染'],
    docs: [
      {
        label: 'web.dev：客戶端渲染指南',
        url: 'https://web.dev/articles/rendering-on-the-web#client-side-rendering',
      },
    ],
  },
  {
    id: 'virtual-dom',
    category: 'frontend',
    zh: '虛擬 DOM',
    en: 'Virtual DOM',
    abbr: 'VDOM',
    summary: '用 JavaScript 物件描述 UI，比對差異後批次更新真實 DOM。',
    plain:
      '直接操作 DOM 很貴，Virtual DOM 先建立輕量的樹狀描述，狀態改變時算出最小差異，再一次性套用到瀏覽器。它讓開發者用宣告式方式描述畫面，但「有 Virtual DOM 一定比較快」是誤解；編譯期優化與正確的資料流往往更關鍵。',
    practice:
      '效能問題通常來自不必要的重渲染與過大的元件樹，而非 Virtual DOM 本身。先用 Profiler 定位，再談 memo 化。',
    useCases: ['React / Vue 等宣告式 UI', '需要頻繁局部更新的介面'],
    keywords: ['virtual dom', 'VDOM', 'diffing', 'reconciliation', 'React', '虛擬 DOM'],
    docs: [
      {
        label: 'React：Virtual DOM 與內部實作',
        url: 'https://legacy.reactjs.org/docs/faq-internals.html',
      },
    ],
  },
  {
    id: 'state-management',
    category: 'frontend',
    zh: '狀態管理',
    en: 'State Management',
    summary: '管理畫面會隨時間改變的資料，以及這些資料如何被讀取與更新。',
    plain:
      'State 是應用的「當下事實」，可分為伺服器狀態、表單狀態、UI 狀態與 URL 狀態。最常見的錯誤是把所有東西塞進同一個 global store，導致耦合與無效重渲染；先判斷資料來源與生命週期，再選擇 local state、context 或專用函式庫。',
    practice:
      '伺服器資料交給 TanStack Query / SWR 快取，URL 狀態交給 router；只有跨頁共享且高頻互動的 client state 才需要 Zustand / Redux。',
    useCases: ['購物車與工作區', '跨頁共享的篩選條件', '複雜表單與協作編輯'],
    keywords: ['state', '狀態', 'Redux', 'Zustand', 'TanStack Query', '狀態管理'],
    docs: [
      {
        label: 'React：Managing State',
        url: 'https://react.dev/learn/managing-state',
      },
    ],
  },
  {
    id: 'component-architecture',
    category: 'frontend',
    zh: '元件化架構',
    en: 'Component-Based Architecture',
    summary: '把 UI 拆成可組合、可重用的獨立單元，各自封裝結構、樣式與行為。',
    plain:
      '元件化讓大型介面能被拆分與測試，但拆分單位應該跟著「職責」而不是檔案行數。好的元件有清楚輸入（props）、輸出（事件）與邊界；過度抽象會讓一個小改動跨越十幾個檔案。',
    practice:
      '先用頁面層級的元件把流程跑通，重複出現第三次再抽象。避免讓展示型元件直接依賴 API 或 global store。',
    useCases: ['設計系統與元件庫', '多頁共享的版型', '大型團隊平行開發'],
    keywords: ['component', '元件', 'component-based', 'props', 'composition', 'React'],
    docs: [
      {
        label: 'React：Your First Component',
        url: 'https://react.dev/learn/your-first-component',
      },
    ],
  },
  {
    id: 'hydration',
    category: 'frontend',
    zh: '水合',
    en: 'Hydration',
    summary: '瀏覽器接手伺服器輸出的 HTML，綁定事件並讓它變成可互動的過程。',
    plain:
      'SSR / SSG 送出的 HTML 只是「看起來對」，還要等 JS 執行、框架比對並補上事件監聽才算真正可用。Hydration 期間若伺服器與客戶端結果不一致，就會出現 mismatch 警告或畫面閃動，也會拉高可互動時間。',
    practice:
      '避免在首次 render 讀取 window、時間或隨機值。把非關鍵互動元件延後 hydration（lazy / islands），能明顯改善 TTI。',
    useCases: ['SSR / SSG 網站', '兼顧 SEO 與 React 互動的頁面', '部分 hydration 的內容網站'],
    keywords: ['hydration', '水合', 'hydrateRoot', '可互動時間', 'TTI', 'SSR'],
    docs: [
      {
        label: 'React：hydrateRoot',
        url: 'https://react.dev/reference/react-dom/client/hydrateRoot',
      },
    ],
  },
  {
    id: 'responsive-design',
    category: 'frontend',
    zh: '響應式設計',
    en: 'Responsive Design',
    summary: '用彈性版面、媒體查詢與相對單位，讓同一份介面適配各種螢幕。',
    plain:
      '響應式不是「加幾個 media query」而已，而是先定義內容在不同寬度下的優先順序。行動優先的 CSS、流動式網格、clamp() 字級與容器查詢，能減少為每個裝置硬寫版型；同時要考慮觸控目標、鍵盤操作與縮放。',
    practice:
      '在 320px、768px、1280px 實際走過一次流程。避免固定高度與橫向溢出，表格在手機上應改變呈現而不是硬縮。',
    useCases: ['所有公開網站', '需要支援手機與平板的產品', '電子商務與內容平台'],
    keywords: ['responsive', 'RWD', '響應式', '自適應', 'media query', 'mobile first'],
    docs: [
      {
        label: 'MDN：Responsive Design',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design',
      },
    ],
  },
  {
    id: 'code-splitting',
    category: 'frontend',
    zh: '程式碼分割',
    en: 'Code Splitting',
    summary: '把 JS 切成多個 chunk，只在需要時載入，而不是一次送出整個應用。',
    plain:
      '打包工具預設把模組合成大檔，Code Splitting 則利用動態 import 在路由或功能層級拆包。它能降低首屏下載量，但切得太細會造成大量請求與載入延遲；關鍵是依「使用者何時需要」分組。',
    practice:
      '先從路由層與大型第三方套件下手，用 build 分析確認 chunk 大小；別把首屏必需的元件也延後載入。',
    useCases: ['大型 SPA', '含圖表或編輯器的後台', '多角色但功能差異大的產品'],
    keywords: ['code splitting', '程式碼分割', 'lazy loading', 'dynamic import', 'bundle'],
    docs: [
      {
        label: 'React：lazy 與 Suspense',
        url: 'https://react.dev/reference/react/lazy',
      },
    ],
  },
  {
    id: 'core-web-vitals',
    category: 'frontend',
    zh: '網站體驗核心指標',
    en: 'Core Web Vitals',
    summary: 'Google 用來衡量真實使用者體驗的三個指標：LCP、INP 與 CLS。',
    plain:
      'LCP 衡量主要內容出現的速度，INP 反映互動延遲，CLS 則是版面跳動程度。它們把「效能」從實驗室數字拉回真實裝置與網路；但 lab 數據與 field 數據要一起看，實驗室方便重現，field 才代表使用者。',
    practice:
      '圖片尺寸與延遲載入先解 LCP，長任務與第三方 script 是 INP 常見兇手；為圖片與廣告預留空間可避免 CLS。',
    useCases: ['內容與電商網站的 SEO', '需要轉換率的公開產品', '行動裝置為主的服務'],
    keywords: ['Core Web Vitals', 'LCP', 'INP', 'CLS', '效能', '網站體驗'],
    docs: [
      {
        label: 'web.dev：Web Vitals',
        url: 'https://web.dev/articles/vitals',
      },
    ],
  },
  {
    id: 'bundler',
    category: 'frontend',
    zh: '打包工具',
    en: 'Bundler',
    summary: '把模組、樣式與資產整理成瀏覽器可高效載入的檔案。',
    plain:
      'Bundler 負責解析 import、轉譯語法、合併與壓縮資源，現代工具還會處理 tree shaking、HMR 與 code splitting。Vite 在開發時用原生 ESM 提供即時熱更新，生產環境再交給 Rollup 打包；Webpack 則以成熟生態與高度客製見長。',
    practice:
      '不要把 bundler 當成萬能優化器。先檢查是否載入了整包 lodash、圖示庫或未使用的 CSS，再談設定微調。',
    useCases: ['所有現代前端專案', '元件庫與設計系統', '需相容舊瀏覽器的產品'],
    keywords: ['bundler', '打包工具', 'Vite', 'Webpack', 'Rollup', 'esbuild', '建置'],
    docs: [
      {
        label: 'Vite：Why Vite',
        url: 'https://vite.dev/guide/why-vite',
      },
    ],
  },

  // ── 後端 Backend & API ─────────────────────────────────────────
  {
    id: 'rest',
    category: 'backend',
    zh: '表徵狀態轉移',
    en: 'Representational State Transfer',
    abbr: 'REST',
    summary: '以資源為中心、用 HTTP 動詞與狀態碼操作的 API 風格。',
    plain:
      'REST 把每個名詞視為資源（例如 /orders/42），用 GET、POST、PATCH、DELETE 表達動作，並善用 HTTP 快取與狀態碼。它簡單、通用、好除錯；但遇到複雜關聯查詢或一次要拿多種資源時，容易出現 over-fetching 與多輪請求。',
    practice:
      '一致的命名與錯誤格式比「純 REST 警察」更重要。列表 API 先設計好分頁、排序與篩選，避免日後破壞相容性。',
    useCases: ['公開 API', '行動 App 後端', '以 CRUD 為主的企業系統'],
    keywords: ['REST', 'RESTful', 'HTTP API', '資源導向', '狀態碼', 'API 設計'],
    docs: [
      {
        label: 'MDN：REST 詞彙解釋',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
      },
    ],
  },
  {
    id: 'graphql',
    category: 'backend',
    zh: '圖形查詢語言',
    en: 'GraphQL',
    summary: '由客戶端宣告需要的欄位，伺服器以單一端點回傳對應資料。',
    plain:
      'GraphQL 用 schema 定義型別與關聯，解決 REST 的 over / under-fetching，也讓前端能一次取得跨資源資料。代價是查詢複雜度難以預估、需要處理 N+1、快取策略與查詢深度限制；小型 CRUD 專案導入往往得不償失。',
    practice:
      '一定要設查詢深度或成本上限，並用 DataLoader 或批次查詢解 N+1。對外公開前先思考是否真的需要讓客戶端自由組合欄位。',
    useCases: ['多前端共享的產品 API', '資料關聯複雜的後台', 'BFF 層'],
    keywords: ['GraphQL', 'schema', 'query', 'resolver', 'BFF', 'Apollo', 'API'],
    docs: [
      {
        label: 'GraphQL 官方教學',
        url: 'https://graphql.org/learn/',
      },
    ],
  },
  {
    id: 'grpc',
    category: 'backend',
    zh: '遠端程序呼叫框架',
    en: 'gRPC Remote Procedure Calls',
    abbr: 'gRPC',
    summary: '基於 HTTP/2 與 Protocol Buffers 的高效能 RPC 框架，適合服務間通訊。',
    plain:
      'gRPC 用 .proto 定義介面並產生型別安全的 client / server 程式碼，二進位傳輸比 JSON 緊湊，支援雙向串流。它不適合直接暴露給瀏覽器，也不如 REST 好用手動除錯；跨語言、內部微服務或低延遲場景才是主場。',
    practice:
      '對外 API 用 REST / GraphQL，內部高頻服務再考慮 gRPC。proto 欄位一旦發布就要遵守相容性規則，別隨意改編號。',
    useCases: ['微服務之間的通訊', '即時串流', '跨語言內部平台'],
    keywords: ['gRPC', 'RPC', 'Protocol Buffers', 'protobuf', 'HTTP/2', '服務間通訊'],
    docs: [
      {
        label: 'gRPC 官方簡介',
        url: 'https://grpc.io/docs/what-is-grpc/introduction/',
      },
    ],
  },
  {
    id: 'microservices',
    category: 'backend',
    zh: '微服務',
    en: 'Microservices',
    summary: '將系統拆成多個可獨立部署的小服務，各自負責明確的業務能力。',
    plain:
      '微服務的交換條件是獨立部署與團隊自治，卻也帶來網路失敗、資料一致性、分散式追蹤與部署治理。它不是「比較先進的單體」；如果團隊沒有觀測性、CI/CD 與清楚領域邊界，拆完只會得到分散式單體。',
    practice:
      '先從單體開始，等某個領域的部署頻率或擴充需求真的不同，再沿著業務邊界拆。別按技術層（前端服務、日誌服務）拆。',
    useCases: ['多團隊協作的大型產品', '需要獨立擴充的業務域', '高頻部署的組織'],
    keywords: ['microservices', '微服務', '分散式系統', 'service boundary', 'DDD'],
    docs: [
      {
        label: 'microservices.io：Microservice Pattern',
        url: 'https://microservices.io/patterns/microservices.html',
      },
    ],
  },
  {
    id: 'monolith',
    category: 'backend',
    zh: '單體架構',
    en: 'Monolithic Architecture',
    summary: '將 UI、商業邏輯與資料存取放在同一個部署單元中。',
    plain:
      '單體不是原罪，而是預設選項。它讓交易、除錯、部署與重構都在同一個程式庫內完成，對早期團隊特別有效率。真正的問題是「缺乏模組邊界」的義大利麵式單體，而不是部署單元本身。',
    practice:
      '在單體內維持清楚的模組與依賴方向，並用自動化測試守住邊界。等拆分收益大於網路與維運成本，再考慮微服務。',
    useCases: ['MVP 與新創產品', '小型團隊', '交易一致性要求高的系統'],
    keywords: ['monolith', '單體架構', 'modular monolith', '模組化單體', '架構'],
    docs: [
      {
        label: 'Martin Fowler：MonolithFirst',
        url: 'https://martinfowler.com/bliki/MonolithFirst.html',
      },
    ],
  },
  {
    id: 'jwt',
    category: 'backend',
    zh: 'JSON 網路權杖',
    en: 'JSON Web Token',
    abbr: 'JWT',
    summary: '一種可自我攜帶聲明（claims）的簽章權杖，常用於 API 身分驗證。',
    plain:
      'JWT 由 header、payload、signature 組成，伺服器驗簽後即可信任內容，不必每次查 session。但 payload 只是 Base64URL 編碼，任何人都能讀，絕不能放密碼或敏感資料；撤銷、短效期與 refresh token 輪替才是實務重點。',
    practice:
      'access token 放記憶體或 HttpOnly cookie，別長期塞 localStorage。設定短效期、驗證 iss / aud / exp，並設計登出與撤銷機制。',
    useCases: ['前後端分離 API', '行動 App 驗證', '跨服務傳遞身分'],
    keywords: ['JWT', 'JSON Web Token', 'token', '驗證', '授權', 'claims', '身分驗證'],
    docs: [
      {
        label: 'JWT 官方介紹',
        url: 'https://jwt.io/introduction',
      },
    ],
  },
  {
    id: 'oauth2',
    category: 'backend',
    zh: 'OAuth 2.0 授權框架',
    en: 'Open Authorization 2.0',
    abbr: 'OAuth 2.0',
    summary: '讓使用者授權第三方應用存取資源，而不必把密碼交給對方。',
    plain:
      'OAuth 2.0 是授權框架，不是認證協定本身；常見的 Authorization Code + PKCE 流程會讓 App 取得 access token。實務上要分清「你是誰」（OpenID Connect）與「你能做什麼」（scope），並避免把 token 放在 URL 或日誌中。',
    practice:
      '單頁與行動 App 一律用 Authorization Code + PKCE，別用已淘汰的 implicit flow。redirect URI 要白名單驗證，scope 採最小權限。',
    useCases: ['第三方登入', 'Google / GitHub 授權', 'SaaS 整合與委派存取'],
    keywords: ['OAuth', 'OAuth 2.0', 'OpenID Connect', 'OIDC', 'PKCE', '授權', 'SSO'],
    docs: [
      {
        label: 'oauth.net：OAuth 2.0',
        url: 'https://oauth.net/2/',
      },
    ],
  },
  {
    id: 'api-gateway',
    category: 'backend',
    zh: 'API 閘道',
    en: 'API Gateway',
    summary: '所有外部請求的統一入口，負責路由、驗證、限流與觀測。',
    plain:
      'API Gateway 把認證、rate limit、請求轉換、版本管理與日誌集中處理，讓後方服務專注業務邏輯。它也是風險集中點：設定錯誤會讓全部 API 癱瘓，額外跳轉會增加延遲，因此要保持設定即程式碼並持續監控。',
    practice:
      '別讓 gateway 變成藏業務邏輯的地方。用它處理跨切面關注點，並確保每個路由都有逾時、重試上限與可追蹤的 trace id。',
    useCases: ['微服務對外入口', '多版本 API', '需要統一認證的 BFF'],
    keywords: ['API Gateway', '閘道', 'BFF', '路由', '限流', '統一入口'],
    docs: [
      {
        label: 'microservices.io：API Gateway',
        url: 'https://microservices.io/patterns/apigateway.html',
      },
    ],
  },
  {
    id: 'websocket',
    category: 'backend',
    zh: '全雙工通訊協定',
    en: 'WebSocket',
    summary: '在單一 TCP 連線上建立全雙工通道，伺服器可主動推送訊息。',
    plain:
      'WebSocket 適合聊天、協作與即時通知，延遲低且雙向。但它讓連線變成有狀態資源：需要處理重連、心跳、訊息順序與水平擴充時的跨節點廣播；若只是單向更新，SSE 往往更簡單。',
    practice:
      '伺服器端用 Redis pub/sub 或專門的 realtime 服務廣播。設計斷線重連與冪等訊息處理，別假設連線永遠存在。',
    useCases: ['即時聊天', '協作編輯', '線上遊戲與交易看板'],
    keywords: ['WebSocket', '即時通訊', '全雙工', '推送', 'realtime', 'SSE'],
    docs: [
      {
        label: 'MDN：WebSockets API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
      },
    ],
  },
  {
    id: 'serverless',
    category: 'backend',
    zh: '無伺服器架構',
    en: 'Serverless',
    summary: '由雲端平台按請求自動執行函式與擴充，開發者不直接管理伺服器。',
    plain:
      'Serverless（FaaS）把維運外包給平台，依用量計費、可瞬間擴充，適合事件驅動與流量不穩定的工作負載。限制是冷啟動、執行時間、狀態與供應商綁定；長交易或持續高流量未必比容器便宜。',
    practice:
      '先確認平台的冷啟動與併發上限，為函式設計冪等與重試。別把共享資料庫連線池開在每個 instance 裡，必要時用 proxy。',
    useCases: ['Webhook 處理', '圖片轉檔', '排程工作與低流量 API'],
    keywords: ['serverless', '無伺服器', 'FaaS', 'Lambda', '冷啟動', '事件驅動'],
    docs: [
      {
        label: 'AWS：What is Serverless?',
        url: 'https://aws.amazon.com/serverless/',
      },
    ],
  },
  {
    id: 'message-queue',
    category: 'backend',
    zh: '訊息佇列',
    en: 'Message Queue',
    summary: '用非同步佇列解耦生產者與消費者，削峰並保證工作最終被處理。',
    plain:
      '訊息佇列把「現在要做的事」排進可靠緩衝，讓 API 不必同步等待寄信、轉檔或金流 callback。它帶來最終一致性、重複投遞與順序問題；消費者必須冪等，並有死信佇列與監控，否則失敗工作會默默消失。',
    practice:
      '交易寫入與發送訊息最好用 outbox pattern 保證一致。為每種事件設計清楚的 schema 與版本，並監控堆積深度與延遲。',
    useCases: ['訂單通知', '圖片與影片處理', '金流 webhook、跨服務事件'],
    keywords: ['message queue', '訊息佇列', 'RabbitMQ', 'Kafka', 'SQS', '非同步', '事件驅動'],
    docs: [
      {
        label: 'Apache Kafka：Introduction',
        url: 'https://kafka.apache.org/intro',
      },
    ],
  },
  {
    id: 'cors',
    category: 'backend',
    zh: '跨來源資源共用',
    en: 'Cross-Origin Resource Sharing',
    abbr: 'CORS',
    summary: '瀏覽器的跨來源安全機制，由伺服器用 HTTP 標頭決定誰能讀取回應。',
    plain:
      'Same-Origin Policy 阻止不同來源的頁面讀取彼此資源，CORS 則是伺服器明確允許的例外。它保護的是瀏覽器使用者，不是 API 本身；Access-Control-Allow-Origin: * 不等於認證，帶憑證的請求也不能搭配萬用字元。',
    practice:
      '精確列出允許的 origin 與 method，處理 preflight（OPTIONS）。不要用寬鬆 CORS 當成資安解法，真正的授權仍要在後端檢查。',
    useCases: ['前後端分離網域', '第三方嵌入', '跨網域 API 呼叫'],
    keywords: ['CORS', '跨來源資源共用', 'preflight', 'same-origin', '瀏覽器安全'],
    docs: [
      {
        label: 'MDN：CORS 完整指南',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
      },
    ],
  },
  {
    id: 'idempotency',
    category: 'backend',
    zh: '冪等性',
    en: 'Idempotency',
    summary: '同一個操作被重複執行多次，結果仍與執行一次相同。',
    plain:
      '網路逾時不代表請求失敗，客戶端重試很常見；若「扣款」或「建立訂單」不具冪等性，就會重複交易。做法包含 idempotency key、唯一約束、狀態機與去重表，重點是讓重送安全，而不是假設不會重送。',
    practice:
      '金流與訂單 API 必須接受 idempotency key 並保存結果。把「已處理」的判斷放在資料庫交易內，避免競態條件。',
    useCases: ['付款與退款', '訂單建立', 'Webhook 重送與訊息消費'],
    keywords: ['idempotency', '冪等', '重試', 'retry', 'idempotency key', '金流'],
    docs: [
      {
        label: 'MDN：Idempotent 詞彙解釋',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Idempotent',
      },
    ],
  },
  {
    id: 'rate-limiting',
    category: 'backend',
    zh: '速率限制',
    en: 'Rate Limiting',
    summary: '限制單位時間內某個來源可發出的請求量，保護系統與公平使用資源。',
    plain:
      'Rate limiting 可防止暴力破解、爬蟲與突發流量壓垮服務。演算法有固定窗口、滑動窗口、token bucket 與 leaky bucket，各有突發流量與精確度取捨；分散式環境要共享計數（如 Redis），否則每個節點各自放行。',
    practice:
      '回傳 429 與 Retry-After，依 API key / 使用者 / IP 分層限制。登入與簡訊等高風險端點要更嚴格，且別把限流當成唯一防護。',
    useCases: ['公開 API', '登入與驗證端點', '防止爬蟲與成本濫用'],
    keywords: ['rate limiting', '速率限制', '限流', 'throttle', '429', 'token bucket'],
    docs: [
      {
        label: 'Cloudflare：What is Rate Limiting?',
        url: 'https://www.cloudflare.com/learning/bots/what-is-rate-limiting/',
      },
    ],
  },

  // ── 資料庫 Database ───────────────────────────────────────────
  {
    id: 'sql',
    category: 'database',
    zh: '關聯式資料庫',
    en: 'Relational Database / SQL',
    abbr: 'SQL',
    summary: '以資料表、關聯與 SQL 查詢為核心的資料庫。',
    plain:
      'SQL 資料庫用 schema 約束資料形狀，支援交易、JOIN 與成熟索引，適合需要一致性的商業資料。它不等於「不能 scale」；透過正確索引、連線池、複寫與分區，PostgreSQL 能支撐絕大多數產品。選擇時先看資料關聯與一致性需求，而非潮流。',
    practice:
      '從 PostgreSQL 開始通常不會錯。所有查詢都要有 EXPLAIN 意識，並用 migration 管理 schema 變更，別手動改正式資料庫。',
    useCases: ['訂單與金流', '會員與權限', '需要報表與關聯查詢的系統'],
    keywords: ['SQL', 'RDBMS', '關聯式資料庫', 'PostgreSQL', 'MySQL', '交易'],
    docs: [
      {
        label: 'PostgreSQL 官方教學',
        url: 'https://www.postgresql.org/docs/current/tutorial.html',
      },
    ],
  },
  {
    id: 'nosql',
    category: 'database',
    zh: '非關聯式資料庫',
    en: 'NoSQL Database',
    abbr: 'NoSQL',
    summary: '不強制固定關聯式 schema 的資料庫家族，涵蓋文件、鍵值、寬列與圖形模型。',
    plain:
      'NoSQL 是統稱，不是單一技術。文件資料庫適合彈性結構，鍵值資料庫適合快取與 session，圖形資料庫適合關係網路。它換來彈性與水平擴充，但通常要自己處理一致性、關聯與查詢模式，資料模型一旦選錯很難回頭。',
    practice:
      '「資料長得像 JSON」不是選 NoSQL 的理由。先列出查詢模式與一致性需求，再決定模型；交易型資料別只因開發方便就放棄關聯式約束。',
    useCases: ['內容與商品目錄', '感測器與日誌', '快取與社交圖譜'],
    keywords: ['NoSQL', '非關聯式', 'MongoDB', 'DynamoDB', 'document database', 'key-value'],
    docs: [
      {
        label: 'MongoDB：What is NoSQL?',
        url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained',
      },
    ],
  },
  {
    id: 'acid',
    category: 'database',
    zh: '交易 ACID 特性',
    en: 'Atomicity, Consistency, Isolation, Durability',
    abbr: 'ACID',
    summary: '交易的四個保證：原子性、一致性、隔離性與持久性。',
    plain:
      'ACID 讓一組操作要嘛全部成功、要嘛全部失敗，並在併發下維持可預期的隔離與持久結果。它不是「有就好」的開關：隔離級別會影響併發效能與異象（如幻讀），分散式系統還需面對跨服務一致性。',
    practice:
      '把一個業務動作包在同一交易中，例如扣庫存與建立訂單。釐清隔離級別與唯一約束能處理的範圍，別用應用層 check-then-act 取代資料庫約束。',
    useCases: ['金融交易', '庫存與訂單', '任何不可部分完成的商業操作'],
    keywords: ['ACID', '原子性', '一致性', '隔離性', '持久性', 'transaction', '交易'],
    docs: [
      {
        label: 'IBM：What is ACID?',
        url: 'https://www.ibm.com/think/topics/acid-transactions',
      },
    ],
  },
  {
    id: 'database-index',
    category: 'database',
    zh: '資料庫索引',
    en: 'Database Index',
    summary: '讓資料庫不必掃全表就能快速找到資料的輔助結構。',
    plain:
      '索引通常以 B-tree 等結構儲存排序後的位置，能加速 WHERE、JOIN 與 ORDER BY，但每次寫入都要維護，也佔用空間。複合索引的欄位順序、選擇性與查詢模式密切相關；索引不是越多越好，沒被用到的索引只是拖慢寫入。',
    practice:
      '用 EXPLAIN ANALYZE 驗證查詢是否真的用到索引。依實際 WHERE / ORDER BY 設計複合索引，並定期檢查未使用與重複索引。',
    useCases: ['高頻查詢條件', '外鍵關聯', '排序與分頁'],
    keywords: ['index', '索引', 'B-tree', 'query plan', 'EXPLAIN', '資料庫效能'],
    docs: [
      {
        label: 'Use The Index, Luke!',
        url: 'https://use-the-index-luke.com/',
      },
    ],
  },
  {
    id: 'normalization',
    category: 'database',
    zh: '資料庫正規化',
    en: 'Database Normalization',
    summary: '透過拆分資料表、消除重複與更新異常，讓資料維持單一來源。',
    plain:
      '正規化（尤其 3NF）讓每份事實只存在一處，降低更新不一致的風險，代價是查詢時需要更多 JOIN。實務上會視讀取模式適度反正規化，例如報表或快取欄位，但那是經過評估的取捨，不該成為預設。',
    practice:
      '交易型核心資料先正規化，再用 view、materialized view 或快取處理讀取效能。若反正規化，需設計同步機制與一致性檢查。',
    useCases: ['交易系統', '後台資料模型', '需要長期維護的企業應用'],
    keywords: ['normalization', '正規化', '3NF', '反正規化', 'denormalization', 'schema'],
    docs: [
      {
        label: 'Wikipedia：Database Normalization',
        url: 'https://en.wikipedia.org/wiki/Database_normalization',
      },
    ],
  },
  {
    id: 'redis',
    category: 'database',
    zh: 'Redis 記憶體資料庫',
    en: 'Redis',
    summary: '以記憶體為主的鍵值資料庫，常用於快取、session、計數與輕量佇列。',
    plain:
      'Redis 速度快、資料結構豐富（string、hash、list、set、sorted set），並支援 TTL 與原子操作。但記憶體成本高、持久化不是萬無一失，也不該當成唯一真相來源；快取失效策略與熱 key 才是實務難題。',
    practice:
      '每個 key 都設計 TTL 與命名空間，避免無界成長。快取要處理穿透、雪崩與一致性，關鍵資料仍以資料庫為準。',
    useCases: ['頁面與 API 快取', 'session 與 rate limit 計數', '排行榜與任務佇列'],
    keywords: ['Redis', '快取', 'cache', 'in-memory', 'TTL', 'key-value', 'session'],
    docs: [
      {
        label: 'Redis 官方文件',
        url: 'https://redis.io/docs/latest/',
      },
    ],
  },
  {
    id: 'orm',
    category: 'database',
    zh: '物件關聯對映',
    en: 'Object-Relational Mapping',
    abbr: 'ORM',
    summary: '用程式語言物件操作資料庫，取代手寫 SQL 的一層抽象。',
    plain:
      'ORM 提供模型定義、關聯、遷移與型別安全，能提升開發速度並降低注入風險；但抽象會隱藏實際查詢，容易產生 N+1 或載入過多欄位。成熟團隊通常混用 ORM 與 raw SQL，讓複雜報表回到資料庫擅長的領域。',
    practice:
      '開啟查詢日誌檢查 N+1，對複雜查詢使用 eager loading 或 raw SQL。不要讓 ORM 自動同步 schema 到正式環境，改用可審核的 migration。',
    useCases: ['CRUD 為主的應用', '需要型別安全的 TypeScript 後端', '快速迭代的產品'],
    keywords: ['ORM', 'Prisma', 'TypeORM', 'Drizzle', 'SQL', 'N+1', 'migration'],
    docs: [
      {
        label: 'Prisma：What is Prisma ORM?',
        url: 'https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma',
      },
    ],
  },
  {
    id: 'sharding',
    category: 'database',
    zh: '資料分片',
    en: 'Database Sharding',
    summary: '將資料水平拆分到多個資料庫節點，以突破單機容量與寫入瓶頸。',
    plain:
      '分片需要選一個好的 shard key，讓查詢能定位到單一或少數分片，同時避免熱點。它會讓跨分片 JOIN、交易與維運變得複雜，通常是最後手段；先試索引、讀寫分離、分區表與快取，往往能延後分片的必要性。',
    practice:
      '選高基數且查詢必帶的 shard key，預留重新分片的能力。應用層要能處理跨分片查詢，並建立完整的監控與備份策略。',
    useCases: ['超大資料量', '寫入熱點明顯的 SaaS', '多租戶平台'],
    keywords: ['sharding', '分片', 'horizontal scaling', 'shard key', '水平擴充'],
    docs: [
      {
        label: 'MongoDB：Sharding',
        url: 'https://www.mongodb.com/resources/products/capabilities/sharding',
      },
    ],
  },
  {
    id: 'replication',
    category: 'database',
    zh: '資料複寫',
    en: 'Database Replication',
    summary: '將資料複製到多個節點，提升讀取吞吐與容錯能力。',
    plain:
      '主從複寫讓寫入發生在 primary、讀取分散到 replica，並在主節點故障時接手。代價是複寫延遲：剛寫入的資料可能讀不到，非同步複寫也可能在故障時遺失最後幾筆交易。讀寫分離不是免費的效能。',
    practice:
      '需要「讀到自己剛寫的資料」時走 primary 或使用 session consistency。監控 replica lag，並定期演練 failover，不要只看節點存活。',
    useCases: ['讀多寫少的網站', '跨區讀取', '高可用與災難復原'],
    keywords: ['replication', '複寫', 'primary', 'replica', '讀寫分離', 'failover'],
    docs: [
      {
        label: 'PostgreSQL：Warm Standby',
        url: 'https://www.postgresql.org/docs/current/warm-standby.html',
      },
    ],
  },
  {
    id: 'cap-theorem',
    category: 'database',
    zh: 'CAP 定理',
    en: 'CAP Theorem',
    abbr: 'CAP',
    summary: '分散式系統在網路分區時，只能在一致性與可用性之間取捨。',
    plain:
      'CAP 常被誤解成「永遠三選二」；實際上 P（分區）是網路系統的現實，設計重點是分區發生時要選 C 還是 A。多數系統追求分區耐受下的最終一致性，並依業務區分：付款寧可暫停也不能重複扣款，動態牆則可以短暫不一致。',
    practice:
      '別把 CAP 當成資料庫選型口號。更實用的是 PACELC：即使沒有分區，也要在延遲與一致性間取捨；依業務操作定義一致性需求。',
    useCases: ['跨區架構', '分散式資料庫選型', '多副本系統設計'],
    keywords: ['CAP theorem', '分散式系統', 'consistency', 'availability', 'PACELC'],
    docs: [
      {
        label: 'IBM：CAP Theorem',
        url: 'https://www.ibm.com/think/topics/cap-theorem',
      },
    ],
  },
  {
    id: 'connection-pool',
    category: 'database',
    zh: '資料庫連線池',
    en: 'Connection Pool',
    summary: '預先建立並重複使用資料庫連線，避免每次請求都付出連線成本。',
    plain:
      '建立資料庫連線需要 TCP、TLS 與認證，成本不低；連線池維持固定數量的可用連線，讓請求排隊借用。池太小會塞車，太大則可能壓垮資料庫；Serverless 與多 instance 環境尤其容易把連線數放大。',
    practice:
      '依資料庫 max connections 與 instance 數反推池大小，設定合理的 acquire timeout 與 idle 回收。Serverless 可考慮外部 pooler（如 PgBouncer）。',
    useCases: ['Web API', '微服務', 'Serverless 與多租戶後端'],
    keywords: ['connection pool', '連線池', 'PgBouncer', 'pool size', 'timeout', '資料庫連線'],
    docs: [
      {
        label: 'node-postgres：Pooling',
        url: 'https://node-postgres.com/features/pooling',
      },
    ],
  },
  {
    id: 'transaction-isolation',
    category: 'database',
    zh: '交易隔離級別',
    en: 'Transaction Isolation Level',
    summary: '定義併發交易之間能看見彼此多少未完成變更，以及可能出現哪些異象。',
    plain:
      '從 Read Committed 到 Serializable，隔離越強越能避免髒讀、不可重複讀與幻讀，但併發與重試成本也越高。多數資料庫預設不是最嚴格等級；開發者必須知道自己的查詢在該等級下是否安全。',
    practice:
      '先依業務定義可接受的異象，再選隔離級別。使用 Serializable 時要處理序列化失敗重試，並用唯一約束與行鎖補強關鍵流程。',
    useCases: ['庫存扣減', '帳務結算', '報表與批次作業同時運行的系統'],
    keywords: ['isolation level', '隔離級別', 'Read Committed', 'Serializable', '幻讀', '併發'],
    docs: [
      {
        label: 'PostgreSQL：Transaction Isolation',
        url: 'https://www.postgresql.org/docs/current/transaction-iso.html',
      },
    ],
  },

  // ── 維運部署 DevOps ───────────────────────────────────────────
  {
    id: 'docker',
    category: 'devops',
    zh: 'Docker 容器化',
    en: 'Docker / Containerization',
    summary: '用容器把應用與依賴打包成一致、可移植的執行單元。',
    plain:
      'Docker image 是唯讀的應用快照，container 則是它的執行實例。共享作業系統核心讓它比虛擬機輕量。容器解決了「我電腦上可以」，但不自動解決資料持久化、網路、安全與 orchestration；映像檔仍可能肥大或藏有漏洞。',
    practice:
      '使用多階段建置縮小 image、以非 root 使用者執行、固定 base image 版本。設定 .dockerignore，並掃描映像漏洞。',
    useCases: ['統一開發與正式環境', 'CI 建置', '微服務部署'],
    keywords: ['Docker', 'container', '容器', 'image', 'Dockerfile', '容器化'],
    docs: [
      {
        label: 'Docker：Get Started',
        url: 'https://docs.docker.com/get-started/',
      },
    ],
  },
  {
    id: 'kubernetes',
    category: 'devops',
    zh: 'Kubernetes 容器編排',
    en: 'Kubernetes',
    abbr: 'K8s',
    summary: '管理容器化應用的部署、擴充、服務發現與自我修復的編排平台。',
    plain:
      'Kubernetes 用宣告式配置讓叢集持續朝期望狀態前進，能自動重啟、滾動更新與水平擴充。它的學習曲線與維運成本都很高，小型團隊常低估網路、儲存、RBAC 與升級的複雜度；託管服務能降低部分負擔，但不會消除概念門檻。',
    practice:
      '先問「單一容器服務是否足夠」。需要 K8s 時，從託管叢集與最小元件開始，設好 resource request / limit、健康檢查與 PodDisruptionBudget。',
    useCases: ['多服務容器平台', '需要自動擴充的產品', '已有平台團隊的組織'],
    keywords: ['Kubernetes', 'K8s', 'orchestration', '容器編排', 'pod', 'cluster'],
    docs: [
      {
        label: 'Kubernetes 官方總覽',
        url: 'https://kubernetes.io/docs/concepts/overview/',
      },
    ],
  },
  {
    id: 'ci-cd',
    category: 'devops',
    zh: '持續整合與持續交付',
    en: 'Continuous Integration / Continuous Delivery',
    abbr: 'CI/CD',
    summary: '自動化從程式提交、測試、建置到部署的流程。',
    plain:
      'CI 持續整合程式碼並執行測試，CD 則把通過驗證的版本自動交付到環境。好的 pipeline 快速、可重現、失敗會阻止部署；只把部署腳本搬上雲端、卻沒有測試與回滾，只是自動化錯誤。',
    practice:
      '主分支保持可部署，pipeline 分階段（lint / test / build / deploy），用環境保護與審核控制正式部署。部署後要有 smoke test 與回滾策略。',
    useCases: ['持續交付的團隊', '多環境部署', '需要合規紀錄的組織'],
    keywords: ['CI/CD', 'continuous integration', 'pipeline', 'GitHub Actions', '自動化部署'],
    docs: [
      {
        label: 'GitHub Actions 官方文件',
        url: 'https://docs.github.com/en/actions/get-started/understand-github-actions',
      },
    ],
  },
  {
    id: 'reverse-proxy',
    category: 'devops',
    zh: '反向代理',
    en: 'Reverse Proxy',
    summary: '位於使用者與後端伺服器之間，代為轉發請求並處理 TLS、快取與路由。',
    plain:
      '反向代理隱藏後端拓撲，統一處理 HTTPS、壓縮、靜態檔案、負載平衡與安全標頭。Nginx、Caddy、Traefik 都是常見選擇；設定錯誤可能造成路徑洩漏、快取污染或 WebSocket 中斷。',
    practice:
      '只轉發必要路徑，正確設定 forwarded headers 與 timeout。把 TLS 與快取設定列入版控，並用健康檢查避免把流量送到壞節點。',
    useCases: ['多服務統一入口', 'TLS 終結', '靜態資源與 API 同網域部署'],
    keywords: ['reverse proxy', '反向代理', 'Nginx', 'Caddy', 'Traefik', 'TLS', '轉發'],
    docs: [
      {
        label: 'MDN：Proxy Servers',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling',
      },
    ],
  },
  {
    id: 'load-balancer',
    category: 'devops',
    zh: '負載平衡器',
    en: 'Load Balancer',
    summary: '將流量分散到多個後端實例，提升吞吐與可用性。',
    plain:
      '負載平衡器依 round robin、least connections 或一致性雜湊等策略分配請求，並可偵測不健康節點。它解決的是流量分配與容錯，不是效能本身；如果後端共用同一個資料庫瓶頸，再多實例也救不了。',
    practice:
      '選擇與工作負載匹配的演算法，有狀態服務可考慮一致性雜湊。設好健康檢查與連線排空，並確保 session 不依賴單一節點。',
    useCases: ['水平擴充的 API', '多區部署', '藍綠與金絲雀發布'],
    keywords: ['load balancer', '負載平衡', 'LB', 'round robin', 'health check', '高可用'],
    docs: [
      {
        label: 'NGINX：Load Balancing',
        url: 'https://www.nginx.com/resources/glossary/load-balancing/',
      },
    ],
  },
  {
    id: 'iac',
    category: 'devops',
    zh: '基礎設施即程式碼',
    en: 'Infrastructure as Code',
    abbr: 'IaC',
    summary: '用程式碼描述與管理基礎設施，讓環境可重現、可審核。',
    plain:
      'IaC 把雲端資源（網路、資料庫、權限）寫成設定檔，透過 plan / apply 流程變更。Terraform 跨雲、Pulumi 用程式語言、雲端原生工具各有生態；重點是 state 管理、漂移偵測與 code review，而不是把點擊操作換成另一種點擊。',
    practice:
      'state 放遠端並鎖定，所有變更先 plan 再 apply。把環境參數化，避免正式與測試資源共享同一組憑證或網路。',
    useCases: ['多環境一致性', '雲端資源治理', '可審計的基礎設施變更'],
    keywords: ['IaC', 'infrastructure as code', 'Terraform', 'Pulumi', '基礎設施即程式碼'],
    docs: [
      {
        label: 'Terraform：Introduction to IaC',
        url: 'https://developer.hashicorp.com/terraform/intro',
      },
    ],
  },
  {
    id: 'cdn',
    category: 'devops',
    zh: '內容傳遞網路',
    en: 'Content Delivery Network',
    abbr: 'CDN',
    summary: '把靜態與可快取內容複製到靠近使用者的邊緣節點，降低延遲與源站負載。',
    plain:
      'CDN 透過全球 PoP 快取 HTML、圖片、JS 與影片，並可處理 TLS、壓縮與邊緣邏輯。快取規則決定成敗：錯誤的 Cache-Control 會讓使用者看到舊資料，過短則失去效益；動態內容也能用邊緣快取，但要設計失效機制。',
    practice:
      '為資產使用內容雜湊檔名並設長快取，HTML 用短快取或 revalidate。部署後主動 purge 關鍵路徑，監控 hit ratio 與地區延遲。',
    useCases: ['全球使用者', '影音與圖片', '靜態網站與流量尖峰活動頁'],
    keywords: ['CDN', 'content delivery network', '內容傳遞網路', '邊緣節點', 'cache'],
    docs: [
      {
        label: 'Cloudflare：What is a CDN?',
        url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/',
      },
    ],
  },
  {
    id: 'observability',
    category: 'devops',
    zh: '可觀測性',
    en: 'Observability',
    summary: '透過 logs、metrics 與 traces 了解系統內部狀態，並回答「為什麼壞了」。',
    plain:
      '可觀測性不是「有 log 就好」，而是能從外部訊號推斷內部行為。結構化日誌提供事件細節，指標揭示趨勢與告警，分散式追蹤串起跨服務請求；三者需要共同的 trace / request id 才能互相對照。',
    practice:
      '先定義關鍵使用者流程與 SLO，再決定要收集什麼。避免高基數標籤拖垮監控成本，並為告警設行動手冊，而不是把所有異常都當成 P1。',
    useCases: ['微服務除錯', 'SLO 與告警', '效能瓶頸分析與事故復盤'],
    keywords: ['observability', '可觀測性', 'logging', 'metrics', 'tracing', 'OpenTelemetry', 'SLO'],
    docs: [
      {
        label: 'OpenTelemetry：What is OpenTelemetry?',
        url: 'https://opentelemetry.io/docs/what-is-opentelemetry/',
      },
    ],
  },
  {
    id: 'blue-green',
    category: 'devops',
    zh: '藍綠部署',
    en: 'Blue-Green Deployment',
    summary: '同時準備兩套相同環境，切換流量來完成零停機部署與快速回滾。',
    plain:
      '藍綠部署讓新版本先在綠環境完整驗證，再將流量從藍切到綠；若出問題可快速切回。代價是資源加倍，資料庫 schema 變更仍需向前相容，否則兩版無法同時運作。',
    practice:
      '確保資料庫變更可向後相容（expand / contract），切換前跑 smoke test。把 DNS TTL 與連線排空納入切換腳本。',
    useCases: ['不能停機的正式服務', '需要快速回滾的高風險版本', '受控的資料庫 migration'],
    keywords: ['blue-green deployment', '藍綠部署', 'zero downtime', '零停機', 'rollback'],
    docs: [
      {
        label: 'Martin Fowler：Blue-Green Deployment',
        url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html',
      },
    ],
  },
  {
    id: 'canary-release',
    category: 'devops',
    zh: '金絲雀發布',
    en: 'Canary Release',
    summary: '先讓一小部分流量使用新版本，觀察指標後再逐步放大。',
    plain:
      '金絲雀發布用真實流量驗證新版本，能及早發現只有特定地區或使用者才會觸發的問題。它需要可靠的指標、流量切分與自動回滾；若沒有觀測能力，金絲雀只會變成更複雜的部署流程。',
    practice:
      '定義成功指標（錯誤率、延遲、業務轉換）與自動回滾門檻。先內部使用者、再 1% / 5% / 25% 分批，並注意快取與資料庫相容性。',
    useCases: ['高流量服務', '推薦或搜尋等易受影響的功能', '需要降低發布風險的產品'],
    keywords: ['canary release', '金絲雀發布', '灰度發布', 'feature flag', '漸進式部署'],
    docs: [
      {
        label: 'Martin Fowler：Canary Release',
        url: 'https://martinfowler.com/bliki/CanaryRelease.html',
      },
    ],
  },
  {
    id: 'environment-variables',
    category: 'devops',
    zh: '環境變數',
    en: 'Environment Variables',
    summary: '將環境相關設定（如資料庫位址、金鑰）由程式碼外部注入。',
    plain:
      '12-Factor App 主張把設定存在環境變數中，讓同一份 build 能部署到不同環境。但環境變數不是密鑰保險箱：它們可能出現在日誌、process list 或錯誤回報中；正式環境應搭配 secrets manager 與最小權限。',
    practice:
      '提供 .env.example 說明必要變數，但永不提交 .env。啟動時驗證必要變數，並用平台 secrets 管理正式金鑰與輪替。',
    useCases: ['多環境部署', 'CI/CD 設定', '開源專案與容器化應用'],
    keywords: ['environment variables', '環境變數', 'env', '12-factor', 'secrets', '設定管理'],
    docs: [
      {
        label: 'The Twelve-Factor App：Config',
        url: 'https://12factor.net/config',
      },
    ],
  },
  {
    id: 'tls',
    category: 'devops',
    zh: '傳輸層安全性',
    en: 'Transport Layer Security',
    abbr: 'TLS',
    summary: '為網路通訊提供加密、身分驗證與完整性保護的協定。',
    plain:
      'TLS 是 HTTPS 的底層，透過憑證確認伺服器身分、協商金鑰並加密傳輸。它保護資料在傳輸中不被竊聽或篡改，但不代表應用安全；憑證過期、混合內容與不安全的 TLS 設定仍會造成風險。',
    practice:
      '用自動續期（ACME）、停用老舊 TLS 版本與弱加密套件、開啟 HSTS。內部服務也應加密，別假設內網安全。',
    useCases: ['所有網站與 API', '金流與登入流程', '服務間通訊'],
    keywords: ['TLS', 'SSL', 'HTTPS', 'certificate', 'ACME', '憑證', '加密'],
    docs: [
      {
        label: 'MDN：Transport Layer Security',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security',
      },
    ],
  },
]

/** 供 UI 快速取得各分類數量，避免在元件內重複篩選。 */
export const GLOSSARY_COUNTS = GLOSSARY.reduce(
  (counts, term) => {
    counts.all += 1
    counts[term.category] = (counts[term.category] ?? 0) + 1
    return counts
  },
  { all: 0, frontend: 0, backend: 0, database: 0, devops: 0 },
)
