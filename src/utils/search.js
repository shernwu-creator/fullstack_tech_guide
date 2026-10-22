/**
 * 中英文模糊搜尋
 * ------------------------------------------------------------------
 * 策略：
 *  1. 先做「每個 token 都必須命中」的精確 / 子字串比對，依欄位權重排序。
 *  2. 若沒有直接命中，才啟用字元子序列（subsequence）模糊比對，
 *     例如 gql → graphql、状态管 → 狀態管理。
 *  3. 搜尋前將常見簡體字正規化為繁體，讓兩岸用語都能找到資料。
 */

// 只收錄在技術語境中不會誤傷其他詞的簡繁對照。
const SIMPLIFIED_TO_TRADITIONAL = {
  数: '數', 据: '據', 库: '庫', 网: '網', 络: '絡', 务: '務', 页: '頁',
  动: '動', 态: '態', 组: '組', 虚: '虛', 拟: '擬', 缓: '緩', 队: '隊',
  维: '維', 运: '運', 监: '監', 测: '測', 优: '優', 响: '響', 应: '應',
  单: '單', 线: '線', 图: '圖', 间: '間', 载: '載', 镜: '鏡', 编: '編',
  础: '礎', 设: '設', 观: '觀', 标: '標', 踪: '蹤', 链: '鏈', 请: '請',
  权: '權', 状: '狀', 节: '節', 丛: '叢', 资: '資', 规: '規', 离: '離',
  级: '級', 乐: '樂', 锁: '鎖', 齐: '齊', 体: '體', 这: '這', 个: '個',
  们: '們', 为: '為', 与: '與', 从: '從', 会: '會', 后: '後', 发: '發',
  进: '進', 过: '過', 对: '對', 开: '開', 关: '關', 门: '門', 问: '問',
  题: '題', 览: '覽', 读: '讀', 写: '寫', 时: '時', 团: '團', 员: '員',
  简: '簡', 云: '雲', 环: '環', 稳: '穩', 扩: '擴', 缩: '縮', 调: '調',
  试: '試', 错: '錯', 误: '誤', 删: '刪', 块: '塊', 键: '鍵', 认: '認',
  证: '證', 销: '銷', 帐: '帳', 账: '帳', 户: '戶', 额: '額', 转: '轉',
  术: '術', 济: '濟', 历: '歷', 仅: '僅', 变: '變', 迁: '遷', 适: '適',
  场: '場', 风: '風', 险: '險', 种: '種', 类: '類', 准: '準', 质: '質',
}

// 兩岸常見技術用語對照；在逐字簡繁轉換前先處理整詞，避免「数据库」變成「數據庫」。
const PHRASE_EQUIVALENTS = [
  ['数据库', '資料庫'],
  ['数据结构', '資料結構'],
  ['数据', '資料'],
  ['服务器', '伺服器'],
  ['服务端', '伺服器端'],
  ['客户端', '客戶端'],
  ['网络', '網路'],
  ['软体', '軟體'],
  ['软件', '軟體'],
  ['硬件', '硬體'],
  ['信息', '資訊'],
  ['用户', '使用者'],
  ['内存', '記憶體'],
  ['缓存', '快取'],
  ['集群', '叢集'],
  ['并发', '併發'],
  ['事务', '交易'],
  ['代码', '程式碼'],
  ['源码', '原始碼'],
  ['项目', '專案'],
  ['运行', '執行'],
  ['调用', '呼叫'],
  ['接口', '介面'],
  ['负载均衡', '負載平衡'],
  ['负载', '負載'],
  ['日志', '日誌'],
  ['扩展', '擴充'],
  ['运维', '維運'],
  ['质量', '品質'],
  ['视频', '影片'],
]

const normalizeChars = (value) => {
  let normalized = String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[，。、；：！？「」『』（）【】《》〈〉“”‘’·—…]/g, ' ')

  for (const [from, to] of PHRASE_EQUIVALENTS) {
    normalized = normalized.replaceAll(from, to)
  }

  return normalized
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .replace(/[\u4e00-\u9fff]/g, (char) => SIMPLIFIED_TO_TRADITIONAL[char] ?? char)
}

export { normalizeChars as normalizeText }

const makeSearchEntry = (term) => {
  const title = normalizeChars([term.zh, term.en, term.abbr].filter(Boolean).join(' '))
  const aliases = normalizeChars([...(term.keywords ?? []), term.zh, term.en, term.abbr].join(' '))
  const body = normalizeChars(
    [term.summary, term.plain, term.practice, ...(term.useCases ?? [])].join(' '),
  )
  return {
    term,
    title,
    aliases,
    body,
    // 子序列比對只涵蓋名稱，避免正文與無關關鍵字造成大量噪音。
    fuzzy: title,
  }
}

const directScore = (entry, tokens) => {
  let total = 0
  for (const token of tokens) {
    let score = 0
    if (entry.title === token) score = 130
    else if (entry.title.startsWith(token)) score = 100
    else if (entry.title.includes(token)) score = 80
    else if (entry.aliases.includes(token)) score = 48
    else if (entry.body.includes(token)) score = 18
    if (!score) return -1
    total += score + Math.min(token.length, 12) * 2
  }
  return total
}

const isSubsequence = (haystack, needle) => {
  if (!needle) return true
  let cursor = 0
  for (const char of haystack) {
    if (char === needle[cursor]) cursor += 1
    if (cursor === needle.length) return true
  }
  return false
}

const fuzzyScore = (entry, tokens) => {
  let total = 0
  for (const token of tokens) {
    // 英文至少 3 字元、中文至少 2 字元才做子序列，避免太短的查詢產生雜訊。
    const isCjk = /[\u4e00-\u9fff]/.test(token)
    if ((isCjk && token.length < 2) || (!isCjk && token.length < 3)) return -1
    if (!isSubsequence(entry.fuzzy, token)) return -1
    total += 10 + token.length
  }
  return total
}

/**
 * @param {Array} terms 名詞資料
 * @param {string} query 使用者輸入
 * @returns {Array} 依相關度排序的名詞
 */
export function searchGlossary(terms, query) {
  const trimmed = query.trim()
  if (!trimmed) return terms

  const tokens = trimmed
    .split(/\s+/)
    .map(normalizeChars)
    .filter(Boolean)

  if (!tokens.length) return terms

  const entries = terms.map(makeSearchEntry)
  const directMatches = entries
    .map((entry) => ({ entry, score: directScore(entry, tokens) }))
    .filter((item) => item.score >= 0)

  if (directMatches.length) {
    return directMatches
      .sort((a, b) => b.score - a.score)
      .map((item) => item.entry.term)
  }

  return entries
    .map((entry) => ({ entry, score: fuzzyScore(entry, tokens) }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry.term)
}

/** 將選型指南攤平成可搜尋字串，支援在指南分類中即時過濾。 */
function guideToText(guide) {
  return normalizeChars(
    [
      guide.zh,
      guide.en,
      guide.kicker,
      guide.summary,
      ...(guide.fitFor ?? []),
      ...(guide.stackGroups ?? []).flatMap((group) => [
        group.label,
        ...group.items.flatMap((item) => [item.name, item.note]),
      ]),
      ...(guide.reasons ?? []).flatMap((reason) => [reason.title, reason.detail]),
      ...(guide.pitfalls ?? []),
      guide.minimal,
    ].join(' '),
  )
}

function guideToCoreText(guide) {
  return normalizeChars(
    [
      guide.zh,
      guide.en,
      guide.kicker,
      ...(guide.stackGroups ?? []).flatMap((group) =>
        group.items.map((item) => item.name),
      ),
    ].join(' '),
  )
}

export function searchGuides(guides, query) {
  const trimmed = query.trim()
  if (!trimmed) return guides

  const tokens = trimmed
    .split(/\s+/)
    .map(normalizeChars)
    .filter(Boolean)

  const entries = guides.map((guide) => ({
    guide,
    haystack: guideToText(guide),
    core: guideToCoreText(guide),
  }))

  const directMatches = entries.filter(({ haystack }) =>
    tokens.every((token) => haystack.includes(token)),
  )

  if (directMatches.length) return directMatches.map(({ guide }) => guide)

  // 沒有直接命中時，才在名稱與技術清單中做保守的拼字容錯。
  return entries
    .filter(({ core }) =>
      tokens.every((token) => {
        const isCjk = /[\u4e00-\u9fff]/.test(token)
        if ((isCjk && token.length < 2) || (!isCjk && token.length < 3)) return false
        return isSubsequence(core, token)
      }),
    )
    .map(({ guide }) => guide)
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** 保留原文的簡轉繁，用於把「数据库」的查詢結果一併反白。 */
const toTraditionalForDisplay = (value) => {
  let output = String(value ?? '')
  for (const [from, to] of PHRASE_EQUIVALENTS) {
    output = output.replaceAll(from, to)
  }
  return output.replace(/[\u4e00-\u9fff]/g, (char) => SIMPLIFIED_TO_TRADITIONAL[char] ?? char)
}

/**
 * 將命中的查詢字串切成可反白片段；回傳 [{ text, match }]。
 * 僅處理直接子字串命中；子序列模糊命中不會硬標，避免斷字。
 */
export function getHighlightParts(text, query) {
  if (!text || !query?.trim()) return [{ text: text ?? '', match: false }]

  const rawTokens = [...new Set(query.trim().split(/\s+/).filter(Boolean))]
    .filter((token) => token.length > 0)
  const tokens = [
    ...new Set([...rawTokens, ...rawTokens.map(toTraditionalForDisplay)]),
  ].sort((a, b) => b.length - a.length)

  if (!tokens.length) return [{ text, match: false }]

  const pattern = tokens.map(escapeRegExp).join('|')
  const regex = new RegExp(pattern, 'gi')
  const source = String(text)
  const parts = []
  let cursor = 0
  let match = regex.exec(source)

  while (match) {
    if (match.index > cursor) {
      parts.push({ text: source.slice(cursor, match.index), match: false })
    }
    parts.push({ text: match[0], match: true })
    cursor = match.index + match[0].length
    if (match[0].length === 0) regex.lastIndex += 1
    match = regex.exec(source)
  }

  if (cursor < source.length) {
    parts.push({ text: source.slice(cursor), match: false })
  }

  return parts.length ? parts : [{ text: source, match: false }]
}

/**
 * 開發工具搜尋：名稱、分類、關鍵字與簡介皆可命中。
 * @param {Array} tools 工具資料
 * @param {string} query 使用者輸入
 * @param {Array} categories 工具分類 meta（用於把分類名稱納入搜尋）
 */
export function searchTools(tools, query, categories = []) {
  const trimmed = query.trim()
  if (!trimmed) return tools

  const tokens = trimmed
    .split(/\s+/)
    .map(normalizeChars)
    .filter(Boolean)

  if (!tokens.length) return tools

  const categoryLookup = new Map(categories.map((category) => [category.id, category]))
  const entries = tools.map((tool) => {
    const category = categoryLookup.get(tool.category)
    const title = normalizeChars([tool.name, tool.en].join(' '))
    return {
      tool,
      title,
      aliases: normalizeChars(
        [...(tool.keywords ?? []), category?.label, category?.en].join(' '),
      ),
      body: normalizeChars(
        [tool.summary, tool.plain, tool.practice, ...(tool.useCases ?? [])].join(' '),
      ),
    }
  })

  const score = (entry) => {
    let total = 0
    for (const token of tokens) {
      let value = 0
      if (entry.title === token) value = 130
      else if (entry.title.startsWith(token)) value = 100
      else if (entry.title.includes(token)) value = 80
      else if (entry.aliases.includes(token)) value = 48
      else if (entry.body.includes(token)) value = 18
      if (!value) return -1
      total += value + Math.min(token.length, 12) * 2
    }
    return total
  }

  const directMatches = entries
    .map((entry) => ({ entry, score: score(entry) }))
    .filter((item) => item.score >= 0)

  if (directMatches.length) {
    return directMatches
      .sort((a, b) => b.score - a.score)
      .map((item) => item.entry.tool)
  }

  return entries
    .filter((entry) =>
      tokens.every((token) => {
        const isCjk = /[\u4e00-\u9fff]/.test(token)
        if ((isCjk && token.length < 2) || (!isCjk && token.length < 3)) return false
        return isSubsequence(entry.title, token)
      }),
    )
    .map((entry) => entry.tool)
}
