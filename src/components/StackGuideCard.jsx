import { levelLabel } from '../utils/format'
import { ArrowUpRightIcon, GaugeIcon, LayersIcon, SparkIcon } from './Icons'

const METRICS = [
  { key: 'build', label: '建置成本' },
  { key: 'maintenance', label: '維護複雜度' },
  { key: 'scalability', label: '擴充彈性' },
]

export function StackGuideCard({ guide }) {
  return (
    <article id={`guide-${guide.id}`} className={`guide-card guide-${guide.id}`}>
      <header className="guide-top">
        <span className="guide-number" aria-hidden="true">
          {guide.index}
        </span>
        <div className="guide-title-group">
          <span className="guide-kicker">{guide.kicker}</span>
          <h3>
            {guide.zh}
            <span>{guide.en}</span>
          </h3>
          <p className="guide-summary">{guide.summary}</p>
          <ul className="fit-list" aria-label="適合情境">
            {guide.fitFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="guide-body">
        <section className="guide-stack" aria-labelledby={`${guide.id}-stack`}>
          <h4 className="block-title" id={`${guide.id}-stack`}>
            <LayersIcon />
            推薦技術組合
            <span className="block-title-en">Stack</span>
          </h4>
          <div className="stack-groups">
            {guide.stackGroups.map((group) => (
              <div className="stack-group" key={group.label}>
                <h5>{group.label}</h5>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong>
                      <span>{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="guide-side">
          <section aria-labelledby={`${guide.id}-reasons`}>
            <h4 className="block-title" id={`${guide.id}-reasons`}>
              <SparkIcon />
              選型理由
              <span className="block-title-en">Why</span>
            </h4>
            <ol className="reason-list">
              {guide.reasons.map((reason, index) => (
                <li key={reason.title}>
                  <span className="reason-num" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="reason-copy">
                    <strong>{reason.title}</strong>
                    <p>{reason.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="assessment" aria-labelledby={`${guide.id}-cost`}>
            <h4 className="block-title" id={`${guide.id}-cost`}>
              <GaugeIcon />
              成本與維護評估
              <span className="block-title-en">Cost</span>
            </h4>
            <div className="metrics">
              {METRICS.map(({ key, label }) => {
                const metric = guide.assessment[key]
                return (
                  <div className={`metric level-${metric.score}`} key={key}>
                    <div className="metric-head">
                      <span className="metric-label">{label}</span>
                      <span className="metric-score">
                        {levelLabel(metric.score)} · {metric.score}/5
                      </span>
                    </div>
                    <div
                      className="meter"
                      role="img"
                      aria-label={`${label}：${levelLabel(metric.score)}，5 分中的 ${metric.score} 分`}
                    >
                      <span className="meter-fill" style={{ '--score': metric.score }} />
                    </div>
                    <p className="metric-note">{metric.note}</p>
                  </div>
                )
              })}
            </div>
            <dl className="assessment-meta">
              <div>
                <dt>每月成本（USD）</dt>
                <dd>{guide.assessment.monthly}</dd>
              </div>
              <div>
                <dt>首版工期</dt>
                <dd>{guide.assessment.timeline}</dd>
              </div>
              <div>
                <dt>建議團隊</dt>
                <dd>{guide.assessment.team}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <div className="guide-lower">
        <section className="pitfalls" aria-labelledby={`${guide.id}-pitfalls`}>
          <h4 className="block-title" id={`${guide.id}-pitfalls`}>
            <span className="block-warning" aria-hidden="true">
              !
            </span>
            別踩這些坑
            <span className="block-title-en">Watch out</span>
          </h4>
          <ul>
            {guide.pitfalls.map((pitfall) => (
              <li key={pitfall}>{pitfall}</li>
            ))}
          </ul>
        </section>

        <aside className="minimal" aria-label="最小可上線組合">
          <span className="minimal-label">Minimum viable stack</span>
          <p>{guide.minimal}</p>
          <div className="guide-links">
            {guide.links.map((link) => (
              <a href={link.url} target="_blank" rel="noreferrer noopener" key={link.url}>
                {link.label}
                <ArrowUpRightIcon size={12} />
                <span className="sr-only">（另開新視窗）</span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </article>
  )
}
