import { STACK_PRINCIPLES, STACK_GUIDES } from '../data/stackMatrixData'
import { levelLabel } from '../utils/format'
import { StackGuideCard } from './StackGuideCard'

export function GuideLibrary({ guides }) {
  return (
    <>
      <div className="principles" aria-label="選型三原則">
        {STACK_PRINCIPLES.map((principle) => (
          <article className="principle" key={principle.index}>
            <span className="principle-index" aria-hidden="true">
              {principle.index}
            </span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="compare" aria-labelledby="compare-title">
        <div className="compare-head">
          <h3 id="compare-title">四種型態速覽</h3>
          <span>點擊網站型態，跳到完整分析</span>
        </div>
        <div className="compare-scroll">
          <table>
            <caption className="sr-only">
              依建置成本、維護複雜度、擴充彈性、每月成本與首版工期比較四種網站型態
            </caption>
            <thead>
              <tr>
                <th scope="col">網站型態</th>
                <th scope="col">建置成本</th>
                <th scope="col">維護複雜度</th>
                <th scope="col">擴充彈性</th>
                <th scope="col">每月成本（USD）</th>
                <th scope="col">首版工期</th>
              </tr>
            </thead>
            <tbody>
              {STACK_GUIDES.map((guide) => (
                <tr key={guide.id}>
                  <th scope="row">
                    <a href={`#guide-${guide.id}`}>
                      {guide.zh}
                      <small>{guide.en}</small>
                    </a>
                  </th>
                  <td>
                    {levelLabel(guide.assessment.build.score)}
                    <small>{guide.assessment.build.score}/5</small>
                  </td>
                  <td>
                    {levelLabel(guide.assessment.maintenance.score)}
                    <small>{guide.assessment.maintenance.score}/5</small>
                  </td>
                  <td>
                    {levelLabel(guide.assessment.scalability.score)}
                    <small>{guide.assessment.scalability.score}/5</small>
                  </td>
                  <td>{guide.assessment.monthly}</td>
                  <td>{guide.assessment.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="guide-list">
        {guides.map((guide) => (
          <StackGuideCard guide={guide} key={guide.id} />
        ))}
      </div>
    </>
  )
}
