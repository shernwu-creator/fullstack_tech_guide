import { TOOL_CATEGORIES, TOOL_COUNTS, TOOLS } from '../data/toolkitData'
import { padNumber } from '../utils/format'

export function ToolkitSidebar({ activeCategory, onSelectToolCategory }) {
  return (
    <aside className="toolkit-sidebar">
      <nav className="tool-directory" aria-label="開發工具分類目錄">
        <div className="tool-directory-head">
          <div>
            <span className="tool-directory-kicker">Tool directory</span>
            <strong className="tool-directory-title">工具分類</strong>
          </div>
          <span className="tool-directory-total">{padNumber(TOOLS.length)} tools</span>
        </div>

        <div className="tool-nav" aria-label="工具分類">
          <button
            type="button"
            className={`tool-nav-item tool-nav-all${activeCategory === 'all' ? ' is-active' : ''}`}
            aria-pressed={activeCategory === 'all'}
            aria-controls="toolkit-content"
            onClick={() => onSelectToolCategory('all')}
          >
            <span className="tool-nav-dot" aria-hidden="true" />
            <span className="tool-nav-copy">
              <span className="tool-nav-label">全部工具</span>
              <span className="tool-nav-en">All tools</span>
            </span>
            <span className="tool-nav-count">{padNumber(TOOL_COUNTS.all)}</span>
          </button>

          {TOOL_CATEGORIES.map((category) => {
            const active = activeCategory === category.id
            return (
              <button
                key={category.id}
                type="button"
                className={`tool-nav-item cat-${category.tone}${active ? ' is-active' : ''}`}
                aria-pressed={active}
                aria-controls="toolkit-content"
                onClick={() => onSelectToolCategory(category.id)}
              >
                <span className="tool-nav-dot" aria-hidden="true" />
                <span className="tool-nav-copy">
                  <span className="tool-nav-label">{category.label}</span>
                  <span className="tool-nav-en">{category.en}</span>
                </span>
                <span className="tool-nav-count">
                  {padNumber(TOOL_COUNTS[category.id] ?? 0)}
                </span>
              </button>
            )
          })}
        </div>

        <p className="tool-directory-note">
          {TOOL_CATEGORIES.length} 類 · {TOOLS.length} 個工具
          <span>所有連結均開新視窗</span>
        </p>
      </nav>
    </aside>
  )
}
