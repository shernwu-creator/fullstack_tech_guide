import { CATEGORY_META, GLOSSARY_COUNTS, GLOSSARY } from '../data/glossaryData'
import { STACK_GUIDES } from '../data/stackMatrixData'
import { TOOLS } from '../data/toolkitData'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from './Icons'

const MAP_CATEGORIES = ['frontend', 'backend', 'database', 'devops']

export function Hero({ activeCategory, onSelectCategory, onExplore, onExploreGuide }) {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Full-stack field guide · 2026
        </p>
        <h1 id="hero-title">
          把全端技術，
          <br />
          <em>讀成一張地圖。</em>
        </h1>
        <p className="hero-lead">
          從 SPA、GraphQL 到 Kubernetes，用 {GLOSSARY.length} 個中英對照名詞建立共同語言；
          再從 {TOOLS.length} 個開發工具與四種真實網站型態，把技術選擇放回成本、維護與團隊的脈絡裡。
        </p>
        <div className="hero-actions">
          <button type="button" className="button button-primary" onClick={onExplore}>
            開始探索
            <ArrowDownIcon size={15} />
          </button>
          <button type="button" className="button button-ghost" onClick={onExploreGuide}>
            看選型指南
            <ArrowRightIcon size={15} />
          </button>
        </div>
        <div className="hero-meta" aria-label="知識庫統計">
          <span>{GLOSSARY.length} terms</span>
          <span>{TOOLS.length} tools</span>
          <span>{STACK_GUIDES.length} blueprints</span>
          <span>中英對照</span>
        </div>
      </div>

      <aside className="hero-map" aria-label="知識庫分類索引">
        <div className="map-head">
          <span>Knowledge index</span>
          <span className="map-live">
            <i aria-hidden="true" />
            Live
          </span>
        </div>

        {MAP_CATEGORIES.map((category) => {
          const meta = CATEGORY_META[category]
          return (
            <button
              key={category}
              type="button"
              className={`map-row${activeCategory === category ? ' is-active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="map-index">{meta.index}</span>
              <span className="map-label">
                <strong>{meta.label}</strong>
                <small>{meta.en}</small>
              </span>
              <span className="map-count">
                {String(GLOSSARY_COUNTS[category]).padStart(2, '0')}
                <ArrowUpRightIcon size={13} />
              </span>
            </button>
          )
        })}

        <button
          type="button"
          className={`map-row map-tools${activeCategory === 'tools' ? ' is-active' : ''}`}
          onClick={() => onSelectCategory('tools')}
        >
          <span className="map-index">05</span>
          <span className="map-label">
            <strong>開發工具</strong>
            <small>Dev Toolkit</small>
          </span>
          <span className="map-count">
            {String(TOOLS.length).padStart(2, '0')}
            <ArrowUpRightIcon size={13} />
          </span>
        </button>

        <button
          type="button"
          className={`map-row map-guide${activeCategory === 'guide' ? ' is-active' : ''}`}
          onClick={() => onSelectCategory('guide')}
        >
          <span className="map-index">06</span>
          <span className="map-label">
            <strong>架站選型指南</strong>
            <small>Tech Stack Guide</small>
          </span>
          <span className="map-count">
            {String(STACK_GUIDES.length).padStart(2, '0')}
            <ArrowUpRightIcon size={13} />
          </span>
        </button>

        <p className="map-foot">從名詞理解原理，再挑選工具、做出選擇。</p>
      </aside>
    </section>
  )
}
