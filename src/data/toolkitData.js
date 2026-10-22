/**
 * 開發工具目錄資料
 * ------------------------------------------------------------------
 * 五個工具分類，共 15 個工具。每筆資料包含：
 *  - name / en：工具名稱與英文定位
 *  - summary：一句話定位
 *  - plain：繁體中文簡介
 *  - useCases：適合情境
 *  - practice：選用建議
 *  - url：官方網站
 *  - tone：沿用既有名詞分類色票（cat-frontend / backend / database / devops / guide）
 */

export const TOOL_CATEGORIES = [
  {
    id: 'ai-assistants',
    index: '01',
    label: 'AI 程式碼編輯器',
    en: 'AI Coding Assistants',
    description: '讀取整個專案上下文，協助補全、重構與代理式開發。',
    tone: 'database',
  },
  {
    id: 'baas-api',
    index: '02',
    label: '後端服務與 API',
    en: 'BaaS & API Tools',
    description: '把資料庫、驗證與 API 協作搬上雲端，加快產品從 0 到 1。',
    tone: 'backend',
  },
  {
    id: 'testing',
    index: '03',
    label: '前端測試框架',
    en: 'Testing Frameworks',
    description: '從單元測試到瀏覽器 E2E，替關鍵流程建立可重複的品質防線。',
    tone: 'frontend',
  },
  {
    id: 'diagramming',
    index: '04',
    label: '架構圖與視覺化',
    en: 'Diagramming',
    description: '用文字或白板把系統、流程與介面畫清楚，讓討論有共同語言。',
    tone: 'guide',
  },
  {
    id: 'deployment',
    index: '05',
    label: '雲端部署與 DevOps',
    en: 'Deployment & DevOps',
    description: '把建置、測試與上線自動化，讓每次交付都可重現。',
    tone: 'devops',
  },
]

export const TOOL_CATEGORY_META = Object.fromEntries(
  TOOL_CATEGORIES.map((category) => [category.id, category]),
)

export const TOOLS = [
  // ── AI 程式碼編輯器 ───────────────────────────────────────────
  {
    id: 'cursor',
    category: 'ai-assistants',
    name: 'Cursor',
    en: 'AI Code Editor',
    summary: '目前最強大的 AI 驅動程式碼編輯器，可讀取整個專案上下文進行精準重構。',
    plain:
      'Cursor 以 VS Code 的操作習慣為基礎，把聊天、行內補全與跨檔案編輯整合在同一個工作區。它能索引整個 codebase，理解型別、檔案依賴與既有慣例，特別適合在成熟專案中重構、補測試或快速理解陌生模組；接受變更前仍應逐段檢視 diff，避免一次套用過大的修改。',
    useCases: ['跨檔案重構與搬移邏輯', '快速理解陌生專案', '補測試、註解與型別'],
    practice:
      '把需求拆成小批次，要求顯示 diff 並搭配 Git 版控；處理機密程式碼前先確認團隊的隱私與資料政策。',
    keywords: ['AI IDE', '程式碼編輯器', 'codebase context'],
    url: 'https://cursor.sh/',
  },
  {
    id: 'windsurf',
    category: 'ai-assistants',
    name: 'Windsurf',
    en: 'Agentic AI IDE',
    summary: '新世代 AI IDE，具備強大的 Agent 模式，能自主分析並執行程式碼編寫。',
    plain:
      'Windsurf 將 AI 從「補完一行」推進到「執行一段任務」：Agent 可以讀取專案、規劃步驟、修改多個檔案，甚至執行終端指令驗證結果。它適合拿來推進有明確驗收條件的功能與重構，但自動化程度越高，越需要清楚的任務邊界、測試與人工覆核。',
    useCases: ['多步驟功能實作', '遷移與批次重構', '原型快速驗證'],
    practice:
      '先寫清楚驗收條件與禁止修改的範圍；執行指令與安裝套件時保持人工確認，完成後一定跑測試與型別檢查。',
    keywords: ['Agent', 'AI IDE', 'Windsurf'],
    url: 'https://codeium.com/windsurf',
  },
  {
    id: 'github-copilot',
    category: 'ai-assistants',
    name: 'GitHub Copilot',
    en: 'AI Pair Programmer',
    summary: '成熟的 AI 輔助套件，提供即時的程式碼自動補全功能。',
    plain:
      'GitHub Copilot 以 IDE 擴充套件的形式提供行內補全、聊天與程式碼審查輔助，支援 VS Code、JetBrains、Neovim 等主流編輯器，並與 GitHub 流程緊密整合。它不像 AI IDE 那樣以整個專案代理為核心，但在日常補全、寫測試與解釋程式碼上非常順手，企業版也提供更完整的管理與政策控制。',
    useCases: ['日常行內補全', '撰寫測試與樣板程式', '團隊既有 IDE 無痛導入'],
    practice:
      '建立團隊的內容排除與使用規範；把建議當成起點而非答案，尤其要檢查授權、錯誤處理與邊界條件。',
    keywords: ['Copilot', '程式碼補全', 'GitHub'],
    url: 'https://github.com/features/copilot',
  },

  // ── 後端服務與 API ───────────────────────────────────────────
  {
    id: 'supabase',
    category: 'baas-api',
    name: 'Supabase',
    en: 'Open Source Firebase Alternative',
    summary: '開源的 Firebase 替代方案，提供 PostgreSQL 資料庫與身分驗證服務。',
    plain:
      'Supabase 以 PostgreSQL 為核心，整合 Auth、Storage、Realtime、Edge Functions 與自動產生的 API，並用 Row Level Security 把權限規則放回資料庫層。它很適合小團隊快速做出可上線的 SaaS；但別把 RLS 當成裝飾，資料表、政策與 migration 都應納入版控與測試。',
    useCases: ['SaaS MVP 與會員系統', '即時同步應用', '需要 SQL 的快速後端'],
    practice:
      '從第一天就設計 tenant_id 與 RLS 政策，使用 migration 管理 schema；留意免費方案的用量與閒置休眠限制。',
    keywords: ['Supabase', 'BaaS', 'PostgreSQL', 'RLS'],
    url: 'https://supabase.com/',
  },
  {
    id: 'firebase',
    category: 'baas-api',
    name: 'Firebase',
    en: 'Google Backend Platform',
    summary: 'Google 提供的全方位後端服務，極度適合快速開發網頁與行動應用程式。',
    plain:
      'Firebase 把 Authentication、Firestore、Storage、Cloud Functions、Hosting 與 Analytics 打包成一套託管服務，讓團隊幾乎不必維運伺服器。它的即時同步與行動端 SDK 尤其成熟，適合驗證產品與需要快速上線的專案；代價是 NoSQL 資料模型需要事先設計查詢模式，成本與供應商綁定也要納入評估。',
    useCases: ['行動與 Web MVP', '即時資料同步', '推播與使用者分析'],
    practice:
      '先設計 Firestore 的查詢與索引，再決定資料結構；用安全規則與 App Check 保護資料，並設定預算告警。',
    keywords: ['Firebase', 'BaaS', 'Firestore', 'Google'],
    url: 'https://firebase.google.com/',
  },
  {
    id: 'bruno',
    category: 'baas-api',
    name: 'Bruno',
    en: 'Open Source API Client',
    summary: '輕量級且重視隱私的開源 API 測試工具，Postman 的強大替代品。',
    plain:
      'Bruno 是離線優先的 API 客戶端，把每個請求存成純文字檔案，能直接跟著專案進 Git，讓 API collection 像程式碼一樣被審查與版本控管。它支援環境變數、測試腳本與 CLI，適合在意隱私、想避免雲端同步依賴的團隊；生態與整合數量相對精簡，但核心 API 除錯需求相當完整。',
    useCases: ['API collection 版控', '離線與隱私優先團隊', 'CI 中的 API smoke test'],
    practice:
      '把 collection 與環境檔一起提交，但用未提交的 secrets 檔保存敏感變數；保持請求命名與資料夾結構一致。',
    keywords: ['Bruno', 'API Client', 'Open Source'],
    url: 'https://www.usebruno.com/',
  },
  {
    id: 'postman',
    category: 'baas-api',
    name: 'Postman',
    en: 'API Development Platform',
    summary: '業界標準的 API 開發與測試平台，方便發送與驗證 API 請求。',
    plain:
      'Postman 提供 collection、環境變數、Mock Server、自動化測試、監控與團隊協作，是許多企業 API 流程的共同語言。它幾乎支援所有協定與認證方式，生態完整；但也容易因為 collection 過度膨脹、金鑰同步到雲端或權限控管不足而變成新的技術債。',
    useCases: ['API 設計與手動驗證', '團隊共享請求集合', '自動化 API 監控'],
    practice:
      '不要把正式環境金鑰存進共享 workspace；用資料夾、環境與測試腳本維持 collection 可讀性。',
    keywords: ['Postman', 'API testing', 'collection'],
    url: 'https://www.postman.com/',
  },

  // ── 前端測試框架 ─────────────────────────────────────────────
  {
    id: 'vitest',
    category: 'testing',
    name: 'Vitest',
    en: 'Vite-Native Test Runner',
    summary: '由 Vite 驅動的極速單元測試框架，設定簡單且效能卓越。',
    plain:
      'Vitest 直接沿用 Vite 的設定與轉譯管線，原生支援 ESM、TypeScript 與 JSX，提供 watch mode、UI、覆蓋率與 mock API。它的 API 與 Jest 高度相容，從 Jest 遷移通常不需要大改；但要記得單元測試只驗證邏輯與元件邊界，真正的跨頁流程仍需交給 E2E。',
    useCases: ['工具函式與商業邏輯測試', 'React 元件測試', 'Vite 專案的 CI 測試'],
    practice:
      '優先測行為與公開介面，不要過度 mock 實作；覆蓋率是輔助指標，關鍵分支與錯誤處理更值得寫測試。',
    keywords: ['Vitest', '單元測試', 'Vite'],
    url: 'https://vitest.dev/',
  },
  {
    id: 'playwright',
    category: 'testing',
    name: 'Playwright',
    en: 'End-to-End Testing',
    summary: '微軟開發的端到端 (E2E) 測試工具，支援所有現代瀏覽器的自動化測試。',
    plain:
      'Playwright 可用同一套 API 驅動 Chromium、Firefox 與 WebKit，內建自動等待、網路攔截、多分頁、錄影與 Trace Viewer。它特別適合驗證登入、結帳、權限與跨頁流程，也能在 CI 中平行分片執行；撰寫時應使用使用者看得到的角色與文字定位，降低對實作細節的依賴。',
    useCases: ['跨瀏覽器 E2E 測試', '關鍵交易流程驗證', 'CI 中的視覺與煙霧測試'],
    practice:
      '為失敗案例保留 trace 與錄影；測試之間保持資料隔離，避免順序依賴與任意 sleep。',
    keywords: ['Playwright', 'E2E', '瀏覽器測試'],
    url: 'https://playwright.dev/',
  },
  {
    id: 'cypress',
    category: 'testing',
    name: 'Cypress',
    en: 'Front-End Testing Tool',
    summary: '專為現代網頁設計的 E2E 測試工具，提供極佳的開發者體驗與時光機除錯功能。',
    plain:
      'Cypress 在瀏覽器內執行測試，提供即時 reload、互動式 runner 與時光機快照，讓前端工程師能快速定位失敗步驟。它同時支援 E2E 與元件測試，對單一頁面與前端狀態的除錯體驗很好；跨網域、多分頁與多瀏覽器覆蓋則需先確認版本與團隊需求。',
    useCases: ['前端 E2E 與元件測試', '互動流程除錯', '需要即時回饋的開發流程'],
    practice:
      '使用 data-testid 或穩定語意定位，不要依賴 CSS 樣式；用網路攔截建立可重現的測試資料。',
    keywords: ['Cypress', 'E2E', '時光機'],
    url: 'https://www.cypress.io/',
  },

  // ── 架構圖與視覺化 ───────────────────────────────────────────
  {
    id: 'mermaid',
    category: 'diagramming',
    name: 'Mermaid.js',
    en: 'Diagramming as Code',
    summary: '透過 Markdown 語法快速生成流程圖、循序圖與甘特圖的工具。',
    plain:
      'Mermaid 用文字描述流程圖、循序圖、類別圖、狀態圖與甘特圖，能直接嵌進 Markdown、GitHub README 與文件站，讓圖表和程式碼一起進版控。它的強項是可維護、可 diff、可自動產生；遇到高度客製的版面或大型複雜圖時，仍可能需要 GUI 工具輔助。',
    useCases: ['README 與文件的流程圖', 'API 呼叫循序圖', '架構決策紀錄'],
    practice:
      '把圖拆小、保持節點命名一致；複雜架構可分成多張圖，並在文件中補上文字決策脈絡。',
    keywords: ['Mermaid', '流程圖', 'Diagram as Code'],
    url: 'https://mermaid.js.org/',
  },
  {
    id: 'excalidraw',
    category: 'diagramming',
    name: 'Excalidraw',
    en: 'Virtual Whiteboard',
    summary: '手繪風格的虛擬白板，非常適合用來快速繪製系統架構草圖或 UI 線框圖。',
    plain:
      'Excalidraw 以手繪感降低「畫得太正式」的心理門檻，適合腦力激盪、系統架構草圖、使用者流程與 UI 線框。它支援即時協作、匯出圖片或連結，也常被用在技術面試與設計討論；但它不是嚴謹的 UML 或流程模擬工具，正式規格仍應整理成文字或結構化圖。',
    useCases: ['系統架構草圖', 'UI 線框與流程討論', '遠距白板協作'],
    practice:
      '草圖階段先求溝通清楚，再整理成正式文件；匯出時保留可編輯連結，方便後續共同修正。',
    keywords: ['Excalidraw', '白板', '架構草圖'],
    url: 'https://excalidraw.com/',
  },

  // ── 雲端部署與 DevOps ────────────────────────────────────────
  {
    id: 'vercel',
    category: 'deployment',
    name: 'Vercel',
    en: 'Frontend Cloud',
    summary: '前端開發者的首選部署平台，完美支援 Next.js 專案的零設定上線。',
    plain:
      'Vercel 以 Git 整合、Preview Deployment、邊緣網路與 Serverless Functions 為核心，讓前端與 Next.js 專案幾乎零設定就能上線。每個 pull request 都能產生獨立預覽網址，非常適合協作與驗收；但長時任務、關聯式資料庫與大量頻寬會快速累積成本，方案限制也需要事先確認。',
    useCases: ['Next.js 與靜態網站', 'PR 預覽與快速驗收', 'Jamstack 前端部署'],
    practice:
      '設定用量與預算告警，環境變數依環境分開管理；需要長時間工作的服務不要硬塞進 Serverless Function。',
    keywords: ['Vercel', '部署', 'Next.js', 'Frontend Cloud'],
    url: 'https://vercel.com/',
  },
  {
    id: 'github-actions',
    category: 'deployment',
    name: 'GitHub Actions',
    en: 'CI/CD Automation',
    summary: '強大的 CI/CD 自動化工作流程工具，輕鬆實現自動測試與部署。',
    plain:
      'GitHub Actions 把 CI/CD 直接放進 GitHub：用 YAML 定義 workflow，就能在 push、PR、排程或手動觸發時執行測試、建置、掃描與部署。它與 repo、issue、package 和 OIDC 權限緊密整合，生態市集也很豐富；workflow 變複雜後，權限、快取與 action 版本管理就成為維護重點。',
    useCases: ['自動測試與建置', 'Pages／雲端部署', '排程與 release 自動化'],
    practice:
      '為 action 固定版本或 commit SHA，套用最小權限；雲端部署優先使用 OIDC，不要把長期金鑰放進 secrets。',
    keywords: ['GitHub Actions', 'CI/CD', 'workflow'],
    url: 'https://github.com/features/actions',
  },
  {
    id: 'docker',
    category: 'deployment',
    name: 'Docker',
    en: 'Containerization',
    summary: '業界標準的容器化技術，確保開發、測試與生產環境的高度一致性。',
    plain:
      'Docker 把應用程式與執行依賴打包成 image，再用 container 在任何支援的環境中重現，減少「我電腦上可以」的落差。它適合標準化開發環境、CI 建置與微服務部署；但容器不是虛擬機，資料持久化、網路、資源限制與映像安全仍需正確設計。',
    useCases: ['統一開發與 CI 環境', '服務容器化與部署', '重現問題與依賴隔離'],
    practice:
      '使用多階段建置、非 root 使用者與 .dockerignore；固定 base image、掃描漏洞，金鑰不要烘焙進 image。',
    keywords: ['Docker', 'Container', '容器化'],
    url: 'https://www.docker.com/',
  },
]

export const TOOL_COUNTS = TOOLS.reduce(
  (counts, tool) => {
    counts.all += 1
    counts[tool.category] = (counts[tool.category] ?? 0) + 1
    return counts
  },
  {
    all: 0,
    'ai-assistants': 0,
    'baas-api': 0,
    testing: 0,
    diagramming: 0,
    deployment: 0,
  },
)
