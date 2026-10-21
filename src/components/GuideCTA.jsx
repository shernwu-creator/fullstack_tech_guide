import { STACK_GUIDES } from '../data/stackMatrixData'
import { ArrowRightIcon } from './Icons'

export function GuideCTA({ onExploreGuides }) {
  return (
    <div className="cta-wrap shell">
      <section className="guide-cta" aria-labelledby="guide-cta-title">
        <div className="cta-content">
          <p className="section-kicker">Decision, not dogma</p>
          <h2 id="guide-cta-title">技術沒有最好，只有最適合。</h2>
          <p>
            四種網站型態、四套推薦組合，加上選型理由、成本評估與常見誤區。
            先理解情境，再決定要不要導入那個新工具。
          </p>
          <button type="button" className="button button-primary" onClick={onExploreGuides}>
            前往選型指南
            <ArrowRightIcon size={15} />
          </button>
        </div>
        <div className="cta-index" aria-hidden="true">
          {STACK_GUIDES.map((guide) => (
            <span key={guide.id}>
              <i>{guide.index}</i>
              {guide.zh}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
