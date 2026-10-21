/**
 * 架站選型指南資料
 * ------------------------------------------------------------------
 * 依四種常見網站型態整理：
 *  - 推薦技術組合（stackGroups）
 *  - 選型理由（reasons）
 *  - 成本 / 維護複雜度評估（assessment，分數 1–5，5 代表最高）
 *  - 常見誤區與最小可上線組合
 */

export const STACK_PRINCIPLES = [
  {
    index: '01',
    title: '先看約束，再看技術',
    detail: '流量規模、資料一致性、團隊人數與上線期限，通常比框架潮流更能決定選型。',
  },
  {
    index: '02',
    title: '選擇可維護的最小組合',
    detail: '每個服務都要有人能除錯、付費與升級；能少一個元件，就少一個半夜的告警。',
  },
  {
    index: '03',
    title: '為 12 個月後保留出口',
    detail: '資料模型、API 邊界與部署方式要留有替換空間，別讓早期的方便變成永久鎖定。',
  },
]

export const STACK_GUIDES = [
  {
    id: 'portfolio',
    index: '01',
    zh: '個人作品集',
    en: 'Personal Portfolio',
    kicker: '展示型 · 低流量 · 個人品牌',
    summary: '用最少的 JavaScript 與最快的載入速度，讓作品、文章與履歷被看見。',
    fitFor: ['需要作品集與履歷的開發者、設計師', '以內容與個人品牌為主的網站', '想保留 React 生態但不犧牲效能'],
    stackGroups: [
      {
        label: '框架與內容',
        items: [
          { name: 'Astro', note: '內容優先，預設輸出零 JS 的靜態頁' },
          { name: 'React Islands', note: '只有需要互動的區塊才載入 React' },
          { name: 'MDX / Markdown', note: '內容進 Git，版本與備份都單純' },
        ],
      },
      {
        label: '樣式與互動',
        items: [
          { name: 'CSS Modules 或 Tailwind', note: '小專案不需龐大設計系統' },
          { name: 'View Transitions API', note: '用原生 API 做低成本轉場' },
          { name: '可選：Motion', note: '只在關鍵互動加入動畫，控制 bundle' },
        ],
      },
      {
        label: '部署與服務',
        items: [
          { name: 'Cloudflare Pages / Vercel', note: '免費 SSL、CDN 與原子部署' },
          { name: 'Plausible / Umami', note: '隱私友善的輕量流量分析' },
          { name: '表單服務或 Function', note: '聯絡表單不必自架後端' },
        ],
      },
      {
        label: '成長後再加',
        items: [
          { name: 'Sanity 等 Headless CMS', note: '需要非工程人員編輯時再導入' },
          { name: 'OG image 自動產生', note: '讓分享連結有清楚的預覽圖' },
        ],
      },
    ],
    reasons: [
      {
        title: '靜態輸出讓速度與成本一次到位',
        detail: '作品集沒有即時資料需求，預先產生 HTML 後由 CDN 直接送出，LCP 與 SEO 都容易做好。',
      },
      {
        title: '用檔案管理內容，少一套資料庫',
        detail: 'MDX 跟著程式碼進 Git，不需要資料庫、後台或 migration；改內容就是一次 commit 與部署。',
      },
      {
        title: '需要互動時才引入 React',
        detail: 'Islands 架構保留 React 生態，又能避免整站 hydration 的成本，效能與開發體驗兼顧。',
      },
    ],
    assessment: {
      build: { score: 1, note: '1–3 天可完成首版，熟悉 Astro 約半天上手' },
      maintenance: { score: 1, note: '改內容即部署，沒有伺服器與資料庫要維護' },
      scalability: { score: 2, note: 'CDN 足以承受流量；功能擴充仍以內容為主' },
      monthly: '$0–10',
      timeline: '1–3 天',
      team: '1 人',
    },
    pitfalls: [
      '為了「以後可能做會員」先接資料庫與後端，結果多養一套服務。',
      '整站做成 SPA，首屏必須等 JS 下載與執行，作品還沒看到就先空白。',
      '字型、動畫與高解析圖片沒有節制，抵銷靜態網站的速度優勢。',
    ],
    minimal: 'Astro + MDX + Cloudflare Pages。聯絡表單用現成服務，先不架資料庫與 CMS。',
    links: [
      { label: 'Astro 官方文件', url: 'https://docs.astro.build/' },
      { label: 'Cloudflare Pages', url: 'https://developers.cloudflare.com/pages/' },
    ],
  },
  {
    id: 'content',
    index: '02',
    zh: 'SEO 內容站',
    en: 'Content & SEO Site',
    kicker: '內容型 · 中高流量 · 搜尋優先',
    summary: '以搜尋流量為核心，讓編輯能快速發布，頁面能被穩定索引並保持快速。',
    fitFor: ['媒體、部落格、知識庫與產品文件', '需要編輯後台、預覽與排程發布', '內容會持續累積，需要分類與站內搜尋'],
    stackGroups: [
      {
        label: '框架與渲染',
        items: [
          { name: 'Next.js App Router', note: 'RSC 減少 client bundle，支援 SSG / ISR / SSR' },
          { name: 'TypeScript', note: '內容型別與 API 契約明確，重構更安全' },
          { name: 'MDX 或 CMS renderer', note: '兼顧 Markdown 撰寫與元件嵌入' },
        ],
      },
      {
        label: '內容管理',
        items: [
          { name: 'Sanity / Contentful', note: '編輯流程、角色與預覽由 CMS 處理' },
          { name: 'Git-based MDX', note: '工程團隊主導、版本控管最單純' },
          { name: 'Preview 環境', note: '草稿先在預覽網址確認再發布' },
        ],
      },
      {
        label: '資料與搜尋',
        items: [
          { name: 'PostgreSQL', note: '文章 metadata、作者與分類，託管服務優先' },
          { name: 'Meilisearch / Algolia', note: '錯字容忍、同義詞與中文分詞' },
          { name: '邊緣快取', note: 'HTML 與 API 依內容生命週期設定快取' },
        ],
      },
      {
        label: 'SEO 與觀測',
        items: [
          { name: 'Metadata API + JSON-LD', note: 'title、canonical、Open Graph 與結構化資料' },
          { name: 'Sitemap / RSS / redirects', note: '讓搜尋引擎看懂網站結構與歷史網址' },
          { name: 'Search Console + RUM', note: '索引狀態與真實 Core Web Vitals' },
        ],
      },
      {
        label: '部署',
        items: [
          { name: 'Vercel / Cloudflare', note: '預覽部署、CDN 與 on-demand revalidation' },
          { name: 'Image Optimization', note: '依裝置輸出尺寸，避免 LCP 被大圖拖垮' },
        ],
      },
    ],
    reasons: [
      {
        title: '渲染策略跟著內容生命週期走',
        detail: '文章可靜態產生或增量更新，即時榜單與個人化區塊才用 SSR，不必全站套同一種模式。',
      },
      {
        title: '把編輯流程從部署流程拆開',
        detail: 'Headless CMS 提供預覽、排程與角色權限，修錯字不必再開 PR、等 CI，內容團隊能自行運作。',
      },
      {
        title: '搜尋與效能本身就是產品功能',
        detail: '站內搜尋影響停留與回訪，Core Web Vitals 影響搜尋表現；兩者都要當成需求，而不是上線後再說。',
      },
    ],
    assessment: {
      build: {
        score: 3,
        note: '2–4 週；內容模型、搜尋與 SEO 細節比版面更花時間',
      },
      maintenance: {
        score: 3,
        note: '需持續處理內容、索引、快取失效與依賴升級',
      },
      scalability: {
        score: 4,
        note: '靜態與邊緣快取可承受高流量，動態區塊才是成本來源',
      },
      monthly: '$20–150',
      timeline: '2–4 週',
      team: '1–2 人',
    },
    pitfalls: [
      '全站 CSR 或把正文包進 client component，搜尋引擎與社群預覽只拿到空殼。',
      '只顧 title 與 description，忽略 canonical、轉址、sitemap 與結構化資料。',
      '圖片與第三方 script 沒有治理，LCP 與 INP 直接超出預算。',
      '沒把 CMS 免費方案、API 限流與圖片流量算進長期成本。',
    ],
    minimal: 'Next.js + MDX + Vercel，先用檔案發布。需要非工程編輯時再接 Sanity，搜尋先用簡單索引。',
    links: [
      { label: 'Next.js 官方文件', url: 'https://nextjs.org/docs' },
      { label: 'Sanity 官方文件', url: 'https://www.sanity.io/docs' },
      { label: 'Google Search Central', url: 'https://developers.google.com/search/docs' },
    ],
  },
  {
    id: 'ecommerce',
    index: '03',
    zh: '電商交易平台',
    en: 'E-commerce Platform',
    kicker: '交易型 · 高風險 · 尖峰流量',
    summary: '金流、庫存與訂單都要求正確性；效能與轉換率只是入場券。',
    fitFor: ['有實際金流、庫存與售後流程的品牌電商', '需要促銷、會員、多渠道與對帳', '團隊有能力處理資安、壓測與營運監控'],
    stackGroups: [
      {
        label: '店面與體驗',
        items: [
          { name: 'Next.js + TypeScript', note: '商品頁 SSR / ISR，兼顧 SEO 與個人化' },
          { name: 'Tailwind + shadcn/ui', note: '快速建立一致、可存取的介面' },
          { name: '邊緣圖片與 CDN', note: '商品圖是最大的頻寬與 LCP 來源' },
        ],
      },
      {
        label: '商務核心',
        items: [
          { name: 'Medusa / Shopify Headless', note: '購物車、訂單狀態機與促銷先買再改' },
          { name: 'NestJS 自建服務', note: '流程特殊且團隊有長期維運能力時才考慮' },
          { name: 'Stripe / Adyen / TapPay', note: '金流交由專業供應商，縮小 PCI 範圍' },
        ],
      },
      {
        label: '資料與搜尋',
        items: [
          { name: 'PostgreSQL', note: '訂單、付款、庫存需交易與唯一約束' },
          { name: 'Redis', note: '購物車、熱門商品快取與限流計數' },
          { name: 'Meilisearch / Algolia', note: '商品搜尋、篩選與同義詞' },
        ],
      },
      {
        label: '非同步與整合',
        items: [
          { name: 'BullMQ / SQS', note: '寄信、開票、Webhook 重試與對帳' },
          { name: 'Idempotency key + outbox', note: '避免重複扣款與訊息遺失' },
          { name: 'ERP / 物流 API', note: '庫存與出貨狀態要有補償流程' },
        ],
      },
      {
        label: '部署與安全',
        items: [
          { name: 'AWS ECS / RDS / ElastiCache', note: '需要掌控網路、擴充與備份時' },
          { name: 'Cloudflare WAF + Rate Limit', note: '擋機器人與促銷期間的異常流量' },
          { name: 'Sentry + OpenTelemetry', note: '跨越店面、API 與金流 webhook 的追蹤' },
        ],
      },
    ],
    reasons: [
      {
        title: '交易正確性優先於架構潮流',
        detail: '訂單、付款與庫存需要 ACID、唯一約束與冪等設計；PostgreSQL 這類關聯式資料庫仍是預設核心。',
      },
      {
        title: '讀與寫分開優化',
        detail: '商品瀏覽可快取、搜尋可外掛引擎；結帳流程則走強一致資料庫，避免同一套策略套用到所有路徑。',
      },
      {
        title: '金流與稅務不要自建',
        detail: '專業供應商處理授權、3D Secure 與合規；自家系統專注在訂單狀態、對帳與客戶體驗。',
      },
      {
        title: '尖峰流量是可預期的風險',
        detail: '促銷前做壓測、預留庫存與排隊機制，比事後擴機器更能保護營收與品牌信任。',
      },
    ],
    assessment: {
      build: {
        score: 5,
        note: '8–12 週起跳，含金流、庫存、對帳與資安需求',
      },
      maintenance: {
        score: 4,
        note: '金流規則、庫存同步、對帳與漏洞修補需專人負責',
      },
      scalability: {
        score: 5,
        note: '需容量規劃、壓測、快取策略與跨區備援',
      },
      monthly: '$200–1,500+',
      timeline: '8–12 週',
      team: '2–5 人',
    },
    pitfalls: [
      '用 NoSQL 當訂單主庫，缺乏交易與唯一約束，促銷時重複下單。',
      '庫存只在加入購物車時檢查，結帳競態造成超賣與客訴。',
      '金流 Webhook 沒有冪等與重送機制，付款狀態錯亂、對帳對不起來。',
      '自建信用卡表單或儲存卡號，讓 PCI DSS 合規範圍失控。',
      '促銷前沒壓測，CDN 快取、資料庫連線與金流 API 同時成為瓶頸。',
    ],
    minimal: '先用 Shopify 或 Medusa Cloud 處理商務核心，Next.js 只做客製店面。不要自建金流與購物車狀態機。',
    links: [
      { label: 'Medusa 官方文件', url: 'https://docs.medusajs.com/' },
      { label: 'Stripe：Idempotent Requests', url: 'https://docs.stripe.com/api/idempotent_requests' },
      { label: 'PostgreSQL 交易文件', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html' },
    ],
  },
  {
    id: 'saas',
    index: '04',
    zh: '高互動 SaaS 後台',
    en: 'Interactive SaaS Dashboard',
    kicker: '產品型 · 登入後使用 · 快速迭代',
    summary: '重點不是 SEO，而是互動流暢、權限正確，並且能持續快速交付新功能。',
    fitFor: ['B2B 工具、內部平台與多租戶產品', '大量表格、表單、篩選與即時協作', '需要角色權限、審計紀錄與背景任務'],
    stackGroups: [
      {
        label: '前端框架',
        items: [
          { name: 'React + Vite', note: '純登入後產品，SPA 開發與部署最單純' },
          { name: 'Next.js（公開頁 + App）', note: '行銷頁要 SEO、產品區要互動時' },
          { name: 'TypeScript', note: '複雜領域模型與 API 契約的保險' },
        ],
      },
      {
        label: '狀態與資料',
        items: [
          { name: 'TanStack Query', note: '伺服器狀態的快取、重取與樂觀更新' },
          { name: 'TanStack Table', note: '排序、篩選、虛擬化與分頁' },
          { name: 'Zustand', note: '只放跨元件的 UI 狀態，不塞伺服器資料' },
        ],
      },
      {
        label: '表單與 UI',
        items: [
          { name: 'React Hook Form + Zod', note: '效能與 schema 驗證兼顧' },
          { name: 'shadcn/ui + Radix', note: '可存取、可客製的元件基礎' },
          { name: 'Storybook', note: '設計系統與元件狀態的活文件' },
        ],
      },
      {
        label: '後端與資料',
        items: [
          { name: 'Supabase', note: '小團隊快速取得 Auth、Postgres、RLS 與 Storage' },
          { name: 'NestJS + PostgreSQL', note: '領域複雜、需自訂流程與長期維護時' },
          { name: 'Redis + S3 + 任務佇列', note: '快取、檔案與非同步工作的標準配置' },
        ],
      },
      {
        label: '權限與即時',
        items: [
          { name: 'tenant_id + RLS + RBAC', note: '多租戶隔離與角色權限從第一天設計' },
          { name: 'WebSocket / SSE', note: '通知、協作與長任務進度' },
          { name: 'Audit log', note: '誰在什麼時候改了什麼，必須可追溯' },
        ],
      },
      {
        label: '交付與觀測',
        items: [
          { name: 'Vercel / Fly.io / Render', note: '依團隊維運能力選擇託管平台' },
          { name: 'Sentry + PostHog', note: '錯誤追蹤與產品行為分析' },
          { name: 'Feature flags', note: '讓部署與發布解耦，降低上線風險' },
        ],
      },
    ],
    reasons: [
      {
        title: '先分清楚 server state 與 client state',
        detail: '把 API 資料交給 TanStack Query 管理快取與重取，全域 store 只放 UI 狀態，能避免同步邏輯失控。',
      },
      {
        title: '租戶與權限是第一級設計',
        detail: 'tenant_id、資料庫層 RLS、角色與審計紀錄一旦上線就很難補；應在資料模型階段就定義清楚。',
      },
      {
        title: '先買後建，換取迭代速度',
        detail: 'Auth、寄信、金流、檔案與錯誤追蹤用成熟服務，把工程時間留給真正差異化的商業邏輯。',
      },
      {
        title: '表格與表單就是主戰場',
        detail: '後台體驗取決於大量資料的載入、篩選與編輯；虛擬化、分頁與 schema 驗證比炫技動畫更重要。',
      },
    ],
    assessment: {
      build: {
        score: 4,
        note: 'MVP 約 4–8 週；權限、審計與多租戶會拉長時程',
      },
      maintenance: {
        score: 4,
        note: '需持續維護權限模型、背景任務、依賴升級與資料隔離',
      },
      scalability: {
        score: 4,
        note: '多數產品先垂直擴充，再依熱點拆服務與讀寫分離',
      },
      monthly: '$20–300',
      timeline: '4–8 週',
      team: '2–4 人',
    },
    pitfalls: [
      '把 server state 全塞進 Redux / Zustand，造成快取、重取與同步邏輯重複。',
      '沒有 tenant_id 與資料庫層 RLS，只靠前端隱藏按鈕來做權限。',
      '太早拆微服務，團隊把時間花在 infra 而不是產品驗證。',
      '缺少 audit log 與背景任務重試，出事時無法追溯也無法補償。',
      '表格沒有分頁或虛擬化，資料一多就卡死；表單驗證散落各處。',
    ],
    minimal: 'React + Vite（或 Next.js）+ Supabase + TanStack Query + shadcn/ui。先做單體與 RLS，不要拆微服務。',
    links: [
      { label: 'TanStack Query 官方文件', url: 'https://tanstack.com/query/latest/docs/framework/react/overview' },
      { label: 'Supabase：Row Level Security', url: 'https://supabase.com/docs/guides/database/postgres/row-level-security' },
      { label: 'shadcn/ui 官方文件', url: 'https://ui.shadcn.com/docs' },
    ],
  },
]
