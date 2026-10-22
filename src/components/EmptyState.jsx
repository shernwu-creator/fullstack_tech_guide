import { CompassIcon } from './Icons'

export function EmptyState({ query, variant, suggestions, onSelectSuggestion, onClear, onReset }) {
  const isGuide = variant === 'guide'
  const isTool = variant === 'tool'

  return (
    <div className="empty">
      <span className="empty-icon" aria-hidden="true">
        <CompassIcon size={24} />
      </span>
      <p className="empty-kicker">No results / 0</p>
      <h3>
        {isGuide
          ? '這組條件下沒有對應的選型指南'
          : isTool
            ? `找不到「${query}」相關的工具`
            : `找不到「${query}」相關的名詞`}
      </h3>
      <p className="empty-desc">
        {isGuide
          ? '試試技術名稱、資料庫或部署平台，例如 PostgreSQL、Supabase 或 Astro。'
          : isTool
            ? '試試工具名稱或分類關鍵字，例如 Cursor、Supabase、Playwright 或測試。'
            : '試試英文全名、縮寫或更短的關鍵字；中文與簡體輸入也能模糊比對。'}
      </p>

      <div className="suggestion-list" aria-label="搜尋建議">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            className="suggestion-chip"
            key={suggestion}
            onClick={() => onSelectSuggestion(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="empty-actions">
        <button type="button" className="button button-primary" onClick={onClear}>
          清除搜尋
        </button>
        <button type="button" className="text-button" onClick={onReset}>
          回到全部內容
        </button>
      </div>
    </div>
  )
}
