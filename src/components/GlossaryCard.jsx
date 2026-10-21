import { CATEGORY_META } from '../data/glossaryData'
import { padNumber } from '../utils/format'
import { ArrowUpRightIcon, BookIcon } from './Icons'
import { HighlightedText } from './HighlightedText'

export function GlossaryCard({ term, index, query }) {
  const meta = CATEGORY_META[term.category]
  const primaryDoc = term.docs?.[0]

  return (
    <article
      className={`gloss-card cat-${term.category}`}
      style={{ '--i': Math.min(index, 8) }}
      aria-labelledby={`term-${term.id}`}
    >
      <div className="card-top">
        <span className="cat-pill">
          <i aria-hidden="true" />
          {meta.label}
        </span>
        <span className="card-index" aria-hidden="true">
          {padNumber(index + 1)}
        </span>
      </div>

      <header className="card-head">
        <h3 id={`term-${term.id}`}>
          <HighlightedText text={term.zh} query={query} />
        </h3>
        <p className="card-en">
          <span>
            <HighlightedText text={term.en} query={query} />
          </span>
          {term.abbr && (
            <span className="abbr-tag">
              <HighlightedText text={term.abbr} query={query} />
            </span>
          )}
        </p>
      </header>

      <p className="card-summary">
        <HighlightedText text={term.summary} query={query} />
      </p>

      <p className="card-plain">
        <HighlightedText text={term.plain} query={query} />
      </p>

      <div className="use-cases">
        <span className="meta-label">適用場景</span>
        <ul className="use-case-list">
          {term.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </div>

      {term.practice && (
        <div className="card-practice">
          <span className="practice-label">實務提醒</span>
          <p>
            <HighlightedText text={term.practice} query={query} />
          </p>
        </div>
      )}

      <footer className="card-footer">
        <span className="card-topics">
          {term.keywords.slice(0, 2).map((keyword) => (
            <span key={keyword}>#{keyword}</span>
          ))}
        </span>
        {primaryDoc && (
          <a
            className="card-link"
            href={primaryDoc.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <BookIcon size={13} />
            <span>官方文件</span>
            <ArrowUpRightIcon size={13} />
            <span className="sr-only">（另開新視窗）</span>
          </a>
        )}
      </footer>
    </article>
  )
}
