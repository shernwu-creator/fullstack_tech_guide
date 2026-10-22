import { TOOL_CATEGORY_META } from '../data/toolkitData'
import { padNumber } from '../utils/format'
import { ArrowUpRightIcon, GlobeIcon } from './Icons'
import { HighlightedText } from './HighlightedText'

export function ToolCard({ tool, index, query }) {
  const category = TOOL_CATEGORY_META[tool.category]

  return (
    <article
      className={`gloss-card tool-card cat-${category.tone}`}
      style={{ '--i': Math.min(index, 8) }}
      aria-labelledby={`tool-${tool.id}`}
    >
      <div className="card-top">
        <span className="cat-pill">
          <i aria-hidden="true" />
          {category.label}
        </span>
        <span className="card-index" aria-hidden="true">
          {padNumber(index + 1)}
        </span>
      </div>

      <header className="card-head">
        <h3 id={`tool-${tool.id}`}>
          <HighlightedText text={tool.name} query={query} />
        </h3>
        <p className="card-en">
          <span>
            <HighlightedText text={tool.en} query={query} />
          </span>
        </p>
      </header>

      <p className="card-summary">
        <HighlightedText text={tool.summary} query={query} />
      </p>

      <p className="card-plain">
        <HighlightedText text={tool.plain} query={query} />
      </p>

      <div className="use-cases">
        <span className="meta-label">適合情境</span>
        <ul className="use-case-list">
          {tool.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </div>

      {tool.practice && (
        <div className="card-practice">
          <span className="practice-label">選用建議</span>
          <p>
            <HighlightedText text={tool.practice} query={query} />
          </p>
        </div>
      )}

      <footer className="card-footer">
        <span className="card-topics">
          {tool.keywords.slice(0, 2).map((keyword) => (
            <span key={keyword}>#{keyword}</span>
          ))}
        </span>
        <a
          className="card-link"
          href={tool.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <GlobeIcon size={13} />
          <span>官方網站</span>
          <ArrowUpRightIcon size={13} />
          <span className="sr-only">（另開新視窗）</span>
        </a>
      </footer>
    </article>
  )
}
