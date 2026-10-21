import { CATEGORIES, GLOSSARY_COUNTS } from '../data/glossaryData'
import { STACK_GUIDES } from '../data/stackMatrixData'

export function FilterBar({ activeCategory, onSelectCategory }) {
  const counts = {
    ...GLOSSARY_COUNTS,
    guide: STACK_GUIDES.length,
  }

  return (
    <div className="filter-wrap">
      <div className="filter-inner shell">
        <div className="filter-label" aria-hidden="true">
          <span className="filter-eyebrow">Browse</span>
          <span className="filter-caption">依領域篩選</span>
        </div>
        <div className="filter-chips" role="group" aria-label="內容分類切換">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category.id
            return (
              <button
                key={category.id}
                type="button"
                className={`filter-chip${active ? ' is-active' : ''}${category.id === 'guide' ? ' is-guide' : ''}`}
                aria-pressed={active}
                onClick={() => onSelectCategory(category.id)}
              >
                <span className={`chip-dot chip-${category.id}`} aria-hidden="true" />
                <span>{category.label}</span>
                <span className="chip-count">{String(counts[category.id] ?? 0).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
